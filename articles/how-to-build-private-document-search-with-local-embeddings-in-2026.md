---
layout: content
title: "How to Build Private Document Search With Local Embeddings in 2026"
description: "Build a small semantic document search in Python with local embeddings from OGAD. Keep source text and vector matching on your computer."
date: "2026-09-29"
permalink: /articles/how-to-build-private-document-search-with-local-embeddings-in-2026/
published_at: "2026-09-29T10:40:02.593Z"
article_topic: "Privacy & control"
article_platform: "Any device"
devto_article: true
devto_id: 4770726
devto_url: "https://dev.to/alichherawalla/how-to-build-private-document-search-with-local-embeddings-in-2026-1mlg"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fpvfksopc2z9z0ej7hnn1.png"
---
A keyword search can miss a useful note when the question uses different words. “When can I stop the subscription?” may need to find a passage about cancellation.

OGAD (Off Grid AI Desktop) exposes local text embeddings through its gateway. You can turn short document passages and a question into vectors, compare them in your own script and return the source passages that are most relevant. This builds a useful first layer of private document search without an online embedding API.

[Download OGAD for Mac or Windows](https://getoffgridai.co/desktop/)

![Off Grid AI](https://getoffgridai.co/assets/cover.png)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@offgridmobileai.co](mailto:support@offgridmobileai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-3swt3s84k-R0CHRwISaUpExV2~3qUUdQ), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## What does an embedding give you?

An embedding is a numeric representation of text. Similarity between two vectors can help rank relevant passages, but a high score is not proof that a passage answers the question correctly.

OGAD's built-in embeddings endpoint uses **all-MiniLM-L6-v2**. It is a dedicated embedding model, separate from the model you select for chat. Supplying a different name in the request does not turn this endpoint into an arbitrary embedding-model selector.

The first use can download the required embedding files. Complete that setup while connected, then check a new request with internet disabled before relying on offline use. The endpoint is a core feature; Pro captured memory is not required for this small search app.

## Build a first search in Python

Start OGAD and check the address in **Gateway**. Use its actual port if it differs from `7878`. The following Python 3 example uses three synthetic passages so you can inspect the result easily:

```python
import json
import math
from urllib.request import Request, urlopen

BASE = "http://127.0.0.1:7878"
passages = [
    ("billing.md", "You can cancel the subscription from account settings."),
    ("shipping.md", "Orders are dispatched after payment is confirmed."),
    ("support.md", "Contact support with the invoice number for billing queries."),
]
question = "How do I stop my subscription?"
texts = [text for _, text in passages] + [question]

request = Request(
    BASE + "/v1/embeddings",
    data=json.dumps({"input": texts}).encode("utf-8"),
    headers={"Content-Type": "application/json"},
)
with urlopen(request, timeout=180) as response:
    result = json.load(response)

vectors = [item["embedding"] for item in sorted(
    result["data"], key=lambda item: item["index"]
)]

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    norm = math.sqrt(sum(x * x for x in a) * sum(y * y for y in b))
    return dot / norm if norm else 0.0

ranked = sorted(
    ((cosine(vector, vectors[-1]), source, text)
     for (source, text), vector in zip(passages, vectors[:-1])),
    reverse=True,
)
for score, source, text in ranked[:2]:
    print(f"{score:.3f}  {source}\n{text}\n")
```

This script ranks passages; it does not generate an answer or prove that the first result is correct. Read the returned text to check whether it resolves the question.

## Replace the sample with useful source material

Split your own documents into short, coherent passages and keep a source identifier with each one. Store the document name and section so a reader can open the original.

For a small collection, you can save vectors and metadata locally, then embed only the new question. Rebuild an affected passage's vector when its text changes. Use the same embedding model for documents and questions; vectors from different models are not interchangeable.

Keep chunks focused. A long document that is cut off by the model's input limit can lose the paragraph you actually needed. Start with paragraphs or short sections and inspect retrieval results on questions whose answers you know.

## Add generated answers only after retrieval works

Once search returns the right passages, you can send selected excerpts to a local chat model. Ask it to answer from those excerpts and identify the source names. Keep the source text visible so the reader can check the answer.

That second step needs a separate chat model. Embeddings alone provide retrieval, not a written explanation.

The gateway listens on network interfaces and its inference endpoints do not require an API key. These examples use `127.0.0.1` on the same computer. Keep the host on a trusted network and do not expose this port to the public internet.

These API routes are present in [OGAD 0.0.51](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.51). The running gateway also serves its API reference at `/docs`.


## Test retrieval before increasing the collection

Try three kinds of questions against the sample passages. First ask a direct question about cancellation. Then use different wording, such as “Where do I end the plan?” Finally ask something the passages do not answer, such as “What refund will I receive?”

The first two tests check whether semantic matching helps with changed wording. The third is just as useful: the script will still rank something even when the collection lacks an answer. A highest-ranked passage is only the best match among the supplied passages, not proof that the information exists.

Keep the source text visible. For a later generated-answer step, tell the chat model to say when the selected excerpts do not contain the answer. Also check that behavior yourself on known missing-answer questions.

## Keep the index tied to its source

For your own notes, store a stable source identifier, section name, passage text and vector together. If a paragraph changes, replace its old vector. If a document is removed, remove its indexed passages so a search does not keep returning obsolete text.

Use small coherent passages rather than cutting a sentence at an arbitrary point. Keep a heading with a paragraph when the heading explains what the paragraph refers to. The aim is to return a passage a reader can understand and verify.

Do not reuse vectors from another embedding model in this index. Equal-looking lists of numbers do not imply a shared meaning. If you change the embedding method, rebuild the document vectors and use that same method for new questions.

Start with a few questions whose answers you know. A small checked collection gives you more useful evidence than a large untested index that always returns confident-looking scores.

## Search one small collection first

[Download OGAD](https://getoffgridai.co/desktop/), run the sample and replace the three passages with a few notes you know well. Get reliable retrieval first, then expand the collection.
