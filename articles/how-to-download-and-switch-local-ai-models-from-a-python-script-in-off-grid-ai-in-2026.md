---
layout: content
title: "How to Download and Switch Local AI Models From a Python Script in Off Grid AI in 2026"
description: "List the model catalog, download a chosen model, wait for a terminal state, and activate it through the local API."
date: "2026-09-29"
permalink: /articles/how-to-download-and-switch-local-ai-models-from-a-python-script-in-off-grid-ai-in-2026/
published_at: "2026-09-29T12:00:55.386Z"
article_topic: "Automation & tools"
article_platform: "Any device"
devto_article: true
devto_id: 4771248
devto_url: "https://dev.to/alichherawalla/how-to-download-and-switch-local-ai-models-from-a-python-script-in-off-grid-ai-in-2026-34ph"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fs1zrfinpkge8e5p43jgv.png"
---
A repeatable local-AI setup should not depend on clicking the same download buttons each time. OGAD (Off Grid AI Desktop) exposes model-management routes so a Python script can list models, download your chosen one and activate it.

[Download OGAD](https://getoffgridai.co/desktop/)

![Off Grid AI Gateway: local API endpoints for chat, images, and audio.](/assets/img/home/app/gateway-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

This uses the free desktop gateway. Downloads need internet and disk space. Activating a model changes the app's active model, so finish ongoing work first.

## Choose before you download

Keep OGAD running. Save the following Python 3 script as `prepare_model.py`. Run it without an argument to print catalog IDs. Choose a supported local text model that fits your computer, then run it again with that exact ID.

This script does not pick the largest model for you or delete an existing download. Review the model and download size in OGAD before starting.

```python
import json
import sys
import time
from urllib.parse import quote
from urllib.request import Request, urlopen

BASE = "http://127.0.0.1:7878"

def call(path, body=None):
    data = None if body is None else json.dumps(body).encode()
    req = Request(BASE + path, data=data,
                  headers={"Content-Type": "application/json"})
    with urlopen(req, timeout=60) as response:
        return json.load(response)

catalog = call("/v1/models/catalog")["models"]
if len(sys.argv) != 2:
    for model in catalog:
        print(model.get("id"), model.get("name"), model.get("kind"))
    raise SystemExit("Run again with the exact ID of a local text model.")

model_id = sys.argv[1]
if not any(m.get("id") == model_id for m in catalog):
    raise SystemExit("That ID is not in this gateway's catalog.")

call("/v1/models/pull", {"id": model_id})
status_path = "/v1/models/pull/status?id=" + quote(model_id, safe="")
deadline = time.monotonic() + 7200
previous = None
while time.monotonic() < deadline:
    progress = call(status_path)
    state = progress.get("status", "idle")
    marker = (state, progress.get("percent"))
    if marker != previous:
        print(state, progress.get("percent", ""))
        previous = marker
    if state == "completed":
        break
    if state in ("failed", "cancelled"):
        raise SystemExit(str(progress.get("error", state)))
    time.sleep(2)
else:
    raise SystemExit("Wait limit reached; check the download in OGAD.")

result = call("/v1/models/activate", {"id": model_id})
if not result.get("success"):
    raise SystemExit(str(result))
print("Activation accepted:", model_id)
print(json.dumps(call("/v1/models/active"), indent=2))
```

Use `python3 prepare_model.py` to list models, then `python3 prepare_model.py YOUR_MODEL_ID` to prepare one. Replace the placeholder with a real ID from that list. Change the port if your gateway uses another one.

## Check the first answer

Activation being accepted does not prove that a large model has finished loading or will fit in RAM. Return to OGAD and ask one short question. If loading fails, choose a smaller compatible model and check available memory.

The download loop stops on failure or cancellation. It does not keep starting the same transfer repeatedly. If its two-hour waiting limit expires, the download may still be running; inspect its status before starting another job. You can cancel the active download in the app when needed.

Already-present model files can make preparation shorter, but the script does not assume a successful download from a filename alone. It waits for the gateway's completed state.


## Separate download completion from model readiness

The script follows three stages: find an ID in the catalog, wait for its download, then request activation. Keep those stages separate in a setup tool. A progress response is not an answer from the model, and an accepted activation is not a completed quality check.

For a practical use, prepare a small text model on a computer that will draft internal status notes. First list the catalog and inspect the choice in OGAD. Check its model type and memory guidance before supplying its ID to the script. The catalog contains different kinds of models; choosing an arbitrary listed ID does not make it suitable for text chat.

After activation, send a short note with one confirmed fact and one unknown date. Check that the reply preserves both. If the model cannot load, use a smaller compatible choice instead of treating another download attempt as a memory fix.

## Keep the setup easy to recover

Record the chosen catalog ID and the machine's gateway address with your setup notes. Use the same ID when checking download progress. The URL-encoding step matters because an ID may contain characters that have a special meaning in a URL.

If the script stops because the network failed, inspect the model's current state in OGAD before rerunning. If the waiting deadline expires, the process may still be downloading. Starting repeated copies of the setup script is not a useful way to make that download finish faster.

Do not switch the active model while someone is using it for another request. This script manages the application's selection rather than creating a private model instance for one Python process. Coordinate the switch on a shared host and run the first-answer check before telling other clients that the new choice is ready.

Keep model cleanup separate from preparation. The sample does not delete an older model automatically, which gives you a straightforward fallback if the new one does not serve the task.

## Keep management access private

The model-management gateway has no API-key authentication. Keep it on a trusted local network and do not forward its port to the public internet. This script uses the same computer's loopback address.

These routes are documented in the [OGAD API reference](https://github.com/off-grid-ai/OGAD/blob/main/docs/API.md). [Try OGAD](https://getoffgridai.co/desktop/) with one small text model before building a larger setup script.
