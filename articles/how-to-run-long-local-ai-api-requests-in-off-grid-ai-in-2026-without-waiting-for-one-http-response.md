---
layout: content
title: "How to Run Long Local AI API Requests in Off Grid AI in 2026 Without Waiting for One HTTP Response"
description: "Submit a local API request, keep its request ID, and poll for completion without holding the original connection open."
date: "2026-09-29"
permalink: /articles/how-to-run-long-local-ai-api-requests-in-off-grid-ai-in-2026-without-waiting-for-one-http-response/
published_at: "2026-09-29T12:04:26.072Z"
article_topic: "Automation & tools"
article_platform: "Any device"
devto_article: true
devto_id: 4771279
devto_url: "https://dev.to/alichherawalla/how-to-run-long-local-ai-api-requests-in-off-grid-ai-in-2026-without-waiting-for-one-http-response-34f7"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2F9qhu2far75e40746li9n.png"
---
A long model request should not force your app to keep the first HTTP connection open. OGAD (Off Grid AI Desktop) supports asynchronous API requests: submit the job, keep its request ID, then read the result through a separate request.

[Download OGAD](https://getoffgridai.co/desktop/)

![OGAD](https://getoffgridai.co/assets/img/desktop-chat.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

The core local API is free. Asynchronous here means separate submission and polling. It is not a durable queue that survives an app restart.

## Submit a small request first

Keep OGAD running with a local text model loaded. The following Python 3 example uses only the standard library. It chooses a local chat model from the gateway inventory, submits a request, and polls for up to five minutes.

```python
import json
import time
from urllib.request import Request, urlopen

BASE = "http://127.0.0.1:7878"

def request(path, body=None):
    data = None if body is None else json.dumps(body).encode()
    req = Request(BASE + path, data=data,
                  headers={"Content-Type": "application/json"})
    with urlopen(req, timeout=30) as response:
        return json.load(response)

models = request("/v1/models")["data"]
model = next((m["id"] for m in models
              if m.get("kind") in ("chat", "vision")
              and not m.get("remote")), None)
if model is None:
    raise SystemExit("Load a local text model in OGAD first.")

job = request("/v1/chat/completions?async=true", {
    "model": model,
    "messages": [{"role": "user", "content":
                  "Write a short checklist for reviewing a project brief."}],
    "max_tokens": 180,
    "stream": False
})
print("Request:", job["request_id"])
poll_path = "/v1/requests/" + job["request_id"]
deadline = time.monotonic() + 300
while time.monotonic() < deadline:
    state = request(poll_path)
    if state["status"] == "completed":
        print(json.dumps(state["result"], indent=2))
        break
    if state["status"] == "failed":
        raise SystemExit(str(state.get("error", "Request failed")))
    time.sleep(2)
else:
    raise SystemExit("Polling timed out. The server job may still be running.")
```

Use the actual gateway port if it differs. Save this as `local_async.py` and run it with `python3 local_async.py`. The inventory can contain more than one model; for a specific task, replace the selected ID with the local model you intend to use.

## Know which state you received

The initial submission returns HTTP 202 and a request resource. **Queued** and **running** mean the result is not ready. **Completed** carries the result. **Failed** carries error information.

Do not resubmit the same task every time a poll says running. Keep the original ID and poll that resource. A client-side timeout also does not prove the server stopped working.


## Read submission and completion as separate events

The first successful response accepts the work. It does not contain the finished answer. Keep the returned `request_id` with the input your app submitted so you can show which job is still running.

A simplified submission response includes an ID and a polling location. Treat the actual returned values as authoritative; do not invent an ID or use a fixed example ID from documentation. The loop above constructs the canonical `/v1/requests/{id}` route from that returned ID.

While the status is queued or running, show a pending state in your app. When it becomes completed, inspect `result` using the response shape for that original endpoint. For a chat job, the generated answer is inside the chat result's `choices`; an image result has a different payload. A shared polling route does not make every completed result the same data type.

## Decide what your app does when waiting ends

The example has a five-minute client waiting limit. That limit stops this script's polling; it does not cancel the server's task. Keep the request ID if you want to check the same task later while the gateway remains running.

| Situation | Useful response |
|---|---|
| Still running | Wait and poll the same ID at a reasonable interval |
| Failed | Show the saved error and inspect the model or input |
| Poll request cannot connect | Check whether OGAD is still running before submitting again |
| Old ID is unavailable after restart | Treat the request record as lost; check any result you already saved |

Do not hide failures by creating a fresh request on every poll error. That can run duplicate work while the original request is still active. If your app needs restart recovery, store its own input and completed output, and design a deliberate retry action. The gateway's in-memory request record alone does not provide durable job storage.

## Keep the lifetime limit in your design

Request records live in the running gateway's memory. Restarting the app loses them, and the store is bounded to 500 records. Save the completed result in your own app when you need to retain it. Do not use the request ID as a permanent document link.

Prepare the local model before offline use. Async submission changes how you wait; it does not remove network needs from a remote model or a web-dependent task.

The [API reference](https://github.com/off-grid-ai/OGAD/blob/main/docs/API.md) describes this request-resource flow. [Try OGAD](https://getoffgridai.co/desktop/) with one short job, then use the same lifecycle for work that takes longer.
