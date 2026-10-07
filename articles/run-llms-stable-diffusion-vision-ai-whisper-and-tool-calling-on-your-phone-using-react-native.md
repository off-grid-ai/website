---
layout: content
title: "Run LLMs, Stable Diffusion, Vision AI, Whisper, and Tool Calling on Your Phone using React Native"
description: "The complete technical reference for on-device AI in React Native -- architecture,..."
date: "2026-02-25"
permalink: /articles/run-llms-stable-diffusion-vision-ai-whisper-and-tool-calling-on-your-phone-using-react-native/
published_at: "2026-02-25T19:15:38.025Z"
article_topic: "Images & vision"
article_platform: "Phone"
devto_article: true
devto_id: 3285579
devto_url: "https://dev.to/alichherawalla/run-llms-stable-diffusion-vision-ai-whisper-and-tool-calling-on-your-phone-44dd"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F198t8u0jsh1h7esrk4pb.png"
---
## The complete technical reference for on-device AI in React Native -- architecture, acceleration, and patterns you can extract for your own apps. Free and open source. No Cloud. No API Key. No Data Leaves Your Device.

---
Think about what you type into AI. Not the casual stuff. The real stuff.

Health symptoms you haven't told anyone about. The relationship question you'd never say out loud. Business ideas you haven't shared with your co-founder yet. Legal questions you're afraid to Google. Journal entries where you're trying to make sense of something you don't fully understand yet.

Every major AI company logs those conversations, feeds them into training pipelines, processes them through content moderation systems, and retains them under privacy policies you've never read. The most intimate form of writing humans have ever produced -- talking to an AI the way you'd talk to yourself -- is being harvested at industrial scale. Not maliciously. Systematically. There's a difference, but the outcome for your data is the same.

Here's what should bother you as an engineer: this isn't a technical requirement. There is no law of physics that says inference has to happen in a data center. The models fit on a phone. The hardware can run them. The frameworks exist. The tradeoff between "AI that works" and "AI that's private" is a business model decision, not a technical constraint.

AI should work like a calculator. Runs on your device. No account. No data leaving. Works in airplane mode.

That's what Off Grid is.

<table>
    <tr>
      <td align="center">
        <img src="/assets/img/home/mobile/other-1-light-640.webp" alt="The Off Grid home screen once set up: downloaded models by type and a New Chat button" width="200" height="434" style="object-fit: cover;" />
        <b>Home and downloaded models (iPhone)</b>
      </td>
      <td align="center">
        <img src="/assets/img/home/mobile/chat-ios-1-light-640.webp" alt="OGAM on iPhone showing a draft reply for the Acme example project" width="200" height="434" style="object-fit: cover;" />
        <b>Example chat (iPhone)</b>
      </td>
      <td align="center">
        <img src="/assets/img/home/mobile/imagegen-ios-1-light-640.webp" alt="OGAM image chat on iPhone with a connected desktop model" width="200" height="434" style="object-fit: cover;" />
        <b>Image chat (iPhone, connected desktop)</b>
      </td>
</tr>
<tr>
      <td align="center">
        <img src="/assets/img/home/mobile/models-ios-1-light-640.webp" alt="OGAM model browser on iPhone, showing available and downloaded text models" width="200" height="434" style="object-fit: cover;" />
        <b>Available models (iPhone)</b>
      </td>
      <td align="center">
        <img src="/assets/img/home/mobile/project-ios-2-light-640.webp" alt="OGAM on iPhone answering from an example project document and citing its filename" width="200" height="434" style="object-fit: cover;" />
        <b>Project documents (iPhone)</b>
      </td>
    </tr>
  </table>


It runs text generation, image generation (Stable Diffusion), vision AI, voice transcription (Whisper), tool calling, and document analysis -- all on your phone, all offline, all open source. Download a model, flip on airplane mode, never connect again. On the App Store and Google Play.

Open source so you don't have to trust anyone. Verify it yourself.

This article is the full technical reference -- the architecture, the technology choices, the hard problems, and the patterns you can extract for your own projects.

---

## Why On-Device Changes Everything (Not Just Privacy)

The privacy argument is the moral case. But once you ship on-device inference, you realize the implications hit your product economics just as hard.

When your intelligence layer runs on the user's hardware, your product economics change fundamentally. There's no API key. No per-token billing. No rate limits. No outage page. The model is a file on the filesystem. Inference is a function call. When your user base grows 10x, your inference costs grow 0x. The marginal cost of AI in your app is literally zero.

That changes what you can afford to build. You can put intelligence into features that would never justify a cloud API call at scale. Autocomplete in a note-taking app. Smart sorting in a file manager. Context-aware suggestions in a health tracker. Things that need AI but can't carry $0.002 per interaction when you have a million daily actives.

And it means your product roadmap stops being hostage to someone else's pricing changes. When OpenAI raises rates or deprecates a model version, that's not your problem. You ship the intelligence as an asset, not a subscription to someone else's infrastructure. Your app works in a subway tunnel, on a 14-hour flight, in a corporate environment where data can't leave the building, in countries where certain AI services are blocked entirely.

For your users, it means their private thoughts stay private -- not because of a privacy policy they didn't read, but because the data physically can't leave their device. That's a promise with teeth.

---

## Text Generation: llama.cpp on ARM64

The foundation is llama.cpp compiled for ARM64, accessed through llama.rn native bindings. Off Grid supports any GGUF-format model -- Qwen 3, Llama 3.2, Gemma 3, Phi-4, SmolLM3, or anything you find on Hugging Face. You can also import .gguf files directly from device storage via native file picker. Bring your own model. Literally.

Streaming inference with real-time token callbacks. Markdown rendering with syntax highlighting. Thinking mode support. Custom system prompts via project-based conversation contexts. 15-30 tokens per second on flagship devices (Snapdragon 8 Gen 2+, A17 Pro). 5-15 tok/s on mid-range.

### The Service Architecture

Three TypeScript services, layered by responsibility:

```
llmService (src/services/llm.ts)
  Wraps llama.rn for model lifecycle and inference.
  Streaming token callbacks.
  OpenCL GPU offloading on Adreno GPUs (experimental).

generationService (src/services/generationService.ts)
  Background-safe orchestration.
  Survives screen unmounts via subscriber pattern.
  Components subscribe on mount, get current state immediately.

activeModelService (src/services/activeModelService.ts)
  Singleton. Prevents duplicate model loading.
  Guards concurrent loads with promise tracking.
  Enforces memory budget before every load attempt.
```

The singleton on `activeModelService` isn't a design preference. It's crash prevention. Two screens trying to load different models simultaneously produces a SIGSEGV. No exception. No error message. Just a dead process. The guard:

```typescript
class ActiveModelService {
  private loadedTextModelId: string | null = null;
  private textLoadPromise: Promise<void> | null = null;

  async loadTextModel(modelId: string) {
    if (this.textLoadPromise) {
      await this.textLoadPromise;
      if (this.loadedTextModelId === modelId) return;
    }
    // ... load with memory budget check
  }
}
export const activeModelService = new ActiveModelService();
```

State management is Zustand with AsyncStorage persistence. Five stores (app, chat, project, auth, whisper) that automatically persist on every state change and rehydrate on launch. The entire app state survives restarts.

### The Memory Budget System

This is the invisible feature that prevents the most common failure mode in on-device ML: user loads a model that doesn't fit, the OS memory manager kills the app mid-inference, and the user sees a crash with no explanation. They don't file a bug report. They leave a 1-star review that says "crashes on open."

Before loading any model, Off Grid calculates whether it will fit:

```
Text models:   requiredRAM = fileSize * 1.5  (KV cache + activations)
Vision models: requiredRAM = (modelSize + mmProjSize) * 1.5
Image models:  requiredRAM = fileSize * 1.8  (MNN/QNN runtime overhead)

Budget = deviceTotalRAM * 0.60
```

Warn at 50% (yellow in the UI). Hard-block at 60% (red, prevents load). The error messages are human-readable:

```
"Cannot load Qwen3-7B-Q4_K_M (~5.5GB required) -- would exceed
device safe limit of 4.8GB. Unload current model or choose smaller."
```

The 60% threshold exists because the OS and other apps need the remaining 40%. Go higher and you get intermittent OOM kills that are nearly impossible to reproduce in development. The 1.5x and 1.8x multipliers are empirical -- they account for KV cache allocation, activation tensors, and runtime overhead that don't show up in the model file size.

### GPU Acceleration and the Constraints Nobody Documents

Android uses llama.cpp's OpenCL backend for Qualcomm Adreno GPUs. Configurable layer count (0-99) determines the CPU/GPU split. CPU inference uses ARM NEON, i8mm, and dotprod SIMD instructions. iOS uses Metal.

There's a hard-won lesson encoded directly in the codebase: flash attention must be automatically disabled when GPU layers > 0 on Android. llama.cpp's OpenCL path crashes with flash attention enabled. Not "degrades performance." Crashes. SIGABRT. Off Grid enforces this constraint automatically at the parameter level so users never encounter it. They toggle flash attention on, set GPU layers to 5, and the app quietly disables flash attention for them. No crash. No config error dialog. It just works.

The same kind of guardrail exists for KV cache quantization. You can choose between f16 (default), q8_0, and q4_0. Going from f16 to q4_0 roughly triples inference speed on most models -- and on a 6GB device, it can be the difference between fitting a model in memory or hitting the budget gate. After the user's first generation, the app nudges them to consider optimizing their KV cache type if they haven't already. Small UX detail, significant performance impact.

### Performance Characteristics

Flagship (Snapdragon 8 Gen 2+, A17 Pro):
- CPU: 15-30 tok/s with 4-8 threads
- GPU (OpenCL): 20-40 tok/s (experimental, stability varies by device)
- TTFT: 0.5-2s depending on context length

Mid-range (Snapdragon 7 series):
- CPU: 5-15 tok/s
- TTFT: 1-3s

Factors: model size (larger = slower), quantization (lower bits = faster, Q4_K_M is the sweet spot), context length (more tokens in history = slower), thread count (4-6 optimal on most devices, diminishing returns past 8), GPU layers (more = faster if OpenCL doesn't crash on that specific device).

---

## Image Generation: Stable Diffusion on Your Phone

This is the capability that makes people do a double-take. On-device Stable Diffusion with real-time preview as the denoising steps progress.

The pipeline:

```
Text Prompt --> CLIP Tokenizer --> Text Encoder (embeddings)
  --> Scheduler (DPM-Solver/Euler) <--> UNet (iterative denoising)
    --> VAE Decoder --> 512x512 Image
```

### Platform-Native Acceleration

**Android** has two backends, selected automatically at runtime:

MNN (Alibaba's Mobile Neural Network) is the universal backend. Works on all ARM64 devices. CPU-only. ~15 seconds for a 512x512 image at 20 steps on a Snapdragon 8 Gen 3. ~30 seconds on mid-range. 5 models available at ~1.2GB each -- Anything V5, Absolute Reality, QteaMix, ChilloutMix, CuteYukiMix.

QNN (Qualcomm AI Engine) is the fast path. NPU-accelerated. Snapdragon 8 Gen 1 and newer only. ~5-10 seconds for the same image. 20 models at ~1.0GB each with chipset-specific variants (8gen1, 8gen2 covering Gen 2/3/4/5). The system does runtime NPU detection -- if QNN is available, it uses it. If not, automatic MNN fallback. The user never has to know which backend is running.

**iOS** uses Apple's ml-stable-diffusion pipeline with Core ML:
- Neural Engine (ANE) acceleration via `.cpuAndNeuralEngine` compute units
- DPM-Solver multistep scheduler for faster convergence at fewer steps
- Safety checker disabled for reduced latency
- Palettized models (~1GB, 6-bit quantized) for memory-constrained devices
- Full precision models (~4GB, fp16) for maximum speed on ANE
- ~8-15 seconds on A17 Pro / M-series. Palettized roughly 2x slower due to dequantization overhead.

### The Implementation

Two native modules bridge to platform-specific implementations:

- `LocalDreamModule` (Android/Kotlin) wraps the local-dream C++ library for MNN/QNN
- `CoreMLDiffusionModule` (iOS/Swift) wraps Apple's `StableDiffusionPipeline`

Both feed progress callbacks, preview callbacks, and completion callbacks through `imageGenerationService` -- a singleton that maintains state independently of React component lifecycle. Start generating on the chat screen, navigate to the home screen, navigate to settings, come back to chat -- the image is either still generating (with a progress indicator and live preview) or already done. The generation never stops because a screen unmounted.

This is possible because of the background-safe subscriber pattern I'll cover later. It's the same pattern that powers text generation, and it's the single most reusable architectural piece in the whole codebase.

### Prompt Enhancement: The LLM-Image Gen Loop

When enabled, the currently loaded text model rewrites simple prompts into detailed Stable Diffusion prompts:

```
User types: "a dog in a field"

LLM enhancement adds artistic style, lighting, composition,
quality modifiers, concrete visual detail

Output: ~75-word enhanced prompt optimized for Stable Diffusion
```

The implementation has a subtle but important optimization. After enhancement completes, the system calls `stopGeneration()` to reset the generating flag, but intentionally does NOT clear the KV cache. Why? Because clearing KV cache after every prompt enhancement makes the next vision inference 30-60 seconds slower. That's a real performance cliff that only surfaces when you have both image generation and vision models in active use. The code comment explains it plainly. The next person who reads the source won't have to discover it the hard way.

### Why This Matters Beyond the Tech

You generate images without your prompts hitting a content moderation API. No server logs your prompt. No system classifies what you're "allowed" to create. No corporate policy sits between your idea and the output.

For builders, this means you can integrate private image generation into apps where the prompt itself is sensitive. Medical imaging prototypes. Security visualization. Internal design tools. Creative applications where users don't want a corporation cataloguing their imagination. The cost per image is zero. The content policy is whatever the user decides.

---

## Vision AI: Your Camera Becomes an AI Sensor

Multimodal understanding via vision-language models. Point your camera at something, ask a question, get an answer. On-device. SmolVLM at 500M parameters does it in ~7 seconds on a flagship.

Supported models: SmolVLM (500M, 2.2B), Qwen3-VL (2B, 8B), Gemma 3n E4B, LLaVA, MiniCPM-V. Camera and photo library integration via React Native Image Picker. Images passed in OpenAI-compatible message format through llama.rn.

SmolVLM 500M: ~7s flagship, ~15s mid-range.
SmolVLM 2.2B: ~10-15s flagship, ~25-35s mid-range.
Qwen3-VL: multilingual vision understanding, thinking mode support.

### The mmproj Problem

Vision models need two files: the main GGUF and a multimodal projector (mmproj) companion file. Exposing this as a user-facing concept is terrible UX. Nobody should have to understand what a multimodal projector is to use a vision model.

Off Grid handles it transparently:

1. **Automatic detection** -- vision models automatically trigger download of the required mmproj companion
2. **Parallel downloads** -- main model and mmproj download simultaneously, not sequentially (cuts total download time nearly in half for large vision models)
3. **Combined tracking** -- size estimates and memory calculations include mmproj overhead
4. **Runtime discovery** -- if mmproj wasn't linked during download, the system searches the model directory at load time

```typescript
interface DownloadedModel {
  id: string;
  filePath: string;
  fileSize: number;
  mmProjPath?: string;
  mmProjFileSize?: number;
  isVisionModel: boolean;
}

// Memory calculation includes both files
const totalRAM = (model.fileSize + (model.mmProjFileSize || 0)) * 1.5;
```

### What This Enables

Document analysis without uploading documents to a cloud OCR service. Receipt scanning without a third party knowing what you bought. Whiteboard capture without your brainstorm hitting someone else's training pipeline. A user points their phone camera at something and gets structured understanding of what they're looking at, and the image bytes never leave RAM.

If you're building for environments where visual data is sensitive by default -- medical intake, legal documents, financial statements, proprietary schematics -- the compliance story writes itself: "The image is processed on-device and never transmitted." No data processing agreements needed. No HIPAA business associate contracts for the vision feature. No GDPR data transfer impact assessments. The data doesn't transfer. Period.

---

## Voice Transcription: Whisper On-Device

whisper.cpp compiled for ARM64 via whisper.rn native bindings. Hold-to-record with slide-to-cancel gesture. Real-time partial transcription -- words appear as you speak. Multiple model sizes: Tiny (fastest), Base (balanced), Small (most accurate). Auto-downloads on first use. Multilingual.

Audio is temporarily buffered in native code during transcription, then cleared. It exists in device memory for the duration of inference and nowhere else. No audio file is written to disk. No audio is transmitted over the network. Ever.

Voice input becomes viable in contexts where it previously wasn't -- legal dictation, medical notes, therapy session summaries, personal journaling. Any use case where the user would self-censor if they knew the audio was being transmitted to a third party for processing. You can build these features and tell your users the truth: the audio never touches a network interface.

There's something fundamentally off about a world where talking to your own device means sending your voice to a remote server. Voice is the most natural input modality humans have. On-device Whisper makes it a local operation. The way it always should have been.

---

## Tool Calling: Agent Loops on Your Phone

This is the one that's genuinely novel.

On-device function calling for models that support it. The system detects tool calling capability from the model's jinja chat template at load time. If the model doesn't support tools, the tools button is disabled in the UI. No broken interactions. No hallucinated tool calls. Just a grayed-out button with a clear reason.

### Available Tools

- **Web Search** -- scrapes Brave Search for top 5 results. Requires network. Clickable URLs in results open in the system browser.
- **Calculator** -- safe recursive descent parser supporting +, -, *, /, %, ^, (). No eval(). Ever.
- **Date/Time** -- formatted date/time with optional timezone support.
- **Device Info** -- battery level, storage usage, memory stats via react-native-device-info.

### The Tool Loop

```
LLM generates --> tool calls parsed --> tools executed -->
results injected back into context --> LLM continues generating
```

Max 3 iterations per generation. Max 5 total tool calls across all iterations. Hard limits that prevent runaway loops where the model keeps calling tools indefinitely.

The parser supports both structured tool calls via llama.rn's native format and fallback XML tag parsing (`<tool_call>`) for smaller models that output tool invocations as XML rather than well-formed JSON. This fallback is critical -- without it, you'd be limited to only the largest, most capable models for tool use.

Empty web search queries fall back to the user's last message. Sounds like a tiny detail. In practice it handles the case where a model decides to search but generates an empty query string, which happens more often than you'd expect with smaller models.

### The Architecture

```
src/services/tools/registry.ts      -- Tool definitions + OpenAI schema
src/services/tools/handlers.ts      -- Tool execution dispatch
src/services/generationToolLoop.ts  -- Multi-turn loop orchestration
src/services/llmToolGeneration.ts   -- Low-level tool-aware generation
```

Capability gating happens at model load time:

```typescript
llmService.supportsToolCalling() // Inspects jinja chat template
```

When the model supports tools AND the user has tools enabled, the tool system prompt is injected into the conversation context. When either condition is false, it's not. This prevents smaller models from seeing tool descriptions in the system prompt and trying to use them despite not having the formatting capability.

Users configure which tools are available in settings. Default: calculator + date/time (both fully offline). Web search is opt-in because it requires network connectivity, and the whole point of this app is that network connectivity is optional.

### Why This Is a Big Deal

You can run agent loops on a phone. Not "agent loops that phone home to a server." Actual reasoning-acting-observing cycles executing locally on ARM cores. The model reasons about what it needs, decides to call a tool, gets the result, reasons about the result, maybe calls another tool, and eventually produces a final response. All local.

The device info tool is the key example of why this matters. Battery level, storage, memory -- that's phone-native context that cloud-based agents literally cannot access. Extend the tool registry with local files, on-device databases, health data, sensor readings, and suddenly the agent has context that no cloud API will ever have. Because that context lives on the device and has no business leaving it.

This is where mobile AI stops being a novelty demo and starts being infrastructure. The gap between "chatbot on my phone" and "AI that does things on my phone" is tool calling.

---

## Architectural Patterns Worth Extracting

Off Grid is an app, but it's also a reference implementation. These patterns solve problems that any React Native developer building long-running background operations will face. They're not AI-specific.

### Background-Safe Subscriber Pattern

The problem: React Native components unmount when you navigate away. If your long-running operation lives in component state, it dies when the user switches screens.

The solution: services own the state. Components subscribe on mount and unsubscribe on unmount. The service delivers current state immediately upon subscription -- no stale UI, no loading spinner while you "catch up":

```typescript
class GenerationService {
  private state: GenerationState = { isGenerating: false };
  private listeners: Set<GenerationListener> = new Set();

  subscribe(listener: GenerationListener): () => void {
    this.listeners.add(listener);
    listener(this.getState()); // Immediate state delivery
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const state = this.getState();
    this.listeners.forEach(listener => listener(state));
  }
}
```

In practice: user starts image generation on the chat screen. Navigates to home. Generation continues in the service. Home screen mounts, subscribes, immediately sees current progress and preview. User navigates to settings. Comes back to chat. Chat re-subscribes, picks up current state -- which might be "complete with result" by now. No state lost. No generation interrupted. No leaked references.

Both `generationService` (text) and `imageGenerationService` (images) use this pattern. It's the reason Off Grid can do 15-second image generations without forcing the user to stare at a progress bar.

### Service-Store Synchronization

Services write to Zustand stores. UI reads from Zustand stores. Unidirectional flow that decouples long-running operations from component lifecycle:

```typescript
private updateState(partial: Partial<ImageGenerationState>): void {
  this.state = { ...this.state, ...partial };
  this.notifyListeners();

  const appStore = useAppStore.getState();
  if ('isGenerating' in partial) {
    appStore.setIsGeneratingImage(this.state.isGenerating);
  }
  if ('progress' in partial) {
    appStore.setImageGenerationProgress(this.state.progress);
  }
}
```

This dual notification (direct listeners + store update) means the actively subscribed screen gets immediate updates via the listener, while any other screen that reads from the store also stays current. The home screen can show "image generating: 65%" without subscribing to the image generation service directly -- it just reads from appStore.

### Native Download Manager Bridge

React Native's JavaScript networking doesn't survive app backgrounding. Android's native DownloadManager does. Off Grid bridges to it through a Kotlin native module that handles multi-gigabyte model downloads in the background:

```kotlin
class DownloadManagerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

  fun downloadFile(url: String, fileName: String, modelId: String) {
    val request = DownloadManager.Request(Uri.parse(url))
      .setTitle(fileName)
      .setNotificationVisibility(
        DownloadManager.Request.VISIBILITY_VISIBLE)
      .setDestinationInExternalFilesDir(context, "models", fileName)

    val downloadId = downloadManager.enqueue(request)
    monitorDownload(downloadId, modelId)
  }
}
```

Downloads continue when the app is backgrounded. Native notifications show progress. React Native polls via BroadcastReceiver.

There's a subtle race condition this code handles that took real debugging time to find: on slow emulators and low-end hardware, the download completion broadcast can arrive before React Native has registered its listener. The download finishes but the app doesn't know. The fix tracks event delivery separately from completion status:

```kotlin
private data class DownloadInfo(
  val downloadId: Long,
  val modelId: String,
  var completedEventSent: Boolean = false
)

// Only send event if not already sent
if (!info.completedEventSent) {
  sendDownloadCompleteEvent(modelId)
  info.completedEventSent = true
}
```

If you're building any React Native app with large background downloads, this pattern saves you a week of debugging on low-end devices.

### Message Queue for Non-Blocking Input

Users can send messages while the LLM is still generating. Messages queue up and process automatically when generation completes. Both stop and send buttons are visible during active generation. The input field stays active throughout.

Multiple queued messages are aggregated when processing -- texts joined, attachments combined. Image generation requests bypass the queue entirely and route to the separate image generation service.

The queue lives in `generationService` as transient state (not persisted across app restarts). User messages are added to chat history only when the queue processor picks them up, preserving correct chronological order.

This is a small UX detail that dramatically changes how the app feels. The conversation is asynchronous and responsive instead of turn-locked. You don't wait for AI to finish talking before you can respond.

---

## The Stack

For the engineers who want the full dependency list:

**Core framework:** React Native 0.83, TypeScript 5.x

**AI inference:**
- llama.rn -- native bindings for llama.cpp (JNI on Android, Metal on iOS)
- whisper.rn -- native bindings for whisper.cpp
- local-dream -- MNN/QNN Stable Diffusion (Android native)
- ml-stable-diffusion -- Apple's Core ML Stable Diffusion pipeline (iOS native)

**State and navigation:** Zustand 5.x with AsyncStorage persistence, React Navigation 7.x

**UI:** React Native Reanimated 4.x (spring-based native-thread animations), React Native Haptic Feedback, custom brutalist design system with light/dark theme support (Menlo monospace, 10-level typography scale, emerald accent)

**Documents:** @react-native-documents/picker (file selection + local model import), @react-native-documents/viewer (QuickLook on iOS, Intent.ACTION_VIEW on Android)

**Native modules (custom):**
- DownloadManagerModule (Kotlin) -- background download bridge for Android
- LocalDreamModule (Kotlin) -- local-dream C++ bridge for MNN/QNN image gen
- PdfExtractorModule (Kotlin) -- Android PdfRenderer for PDF text extraction
- CoreMLDiffusionModule (Swift) -- Apple StableDiffusionPipeline bridge
- PDFExtractorModule (Swift) -- Apple PDFKit for PDF text extraction

All text inference: llama.cpp compiled for ARM64 with NEON, i8mm, dotprod SIMD.
All image inference: MNN (CPU), QNN (Qualcomm NPU), or Core ML (Apple ANE).
All voice: whisper.cpp compiled for ARM64.

---

## The Use Cases That Make This Real

These aren't hypothetical. These are the conversations that should make anyone uncomfortable sending to a cloud:

**Journaling with AI** -- without journal entries ending up in a training dataset. The whole point of journaling is unfiltered honesty. That breaks the moment you're aware someone might be reading.

**Medical and legal questions** -- the ones you'd self-censor if you knew they were being logged. "Is this mole normal?" "What are my options if my landlord does X?" Questions where the act of asking reveals vulnerability you haven't consented to share.

**Work notes with proprietary context** -- pasting code snippets, architecture decisions, competitive analysis into an AI conversation. In a cloud model, that's your company's IP sitting on a third party's infrastructure. On-device, it never leaves the app's sandboxed storage.

**Just wanting thoughts that are actually yours** -- the baseline expectation that thinking out loud into a text field shouldn't create a permanent record on someone else's server.

---

## The Real Point

The tradeoff that the entire industry has normalized -- "useful AI requires giving up your privacy" -- is a lie. Not an exaggeration. Not a simplification. A lie. The technology to run capable AI on a phone exists today. The models are good enough. The hardware is fast enough. Every piece is open source and freely available.

The reason AI conversations live on someone else's server isn't that they have to. It's that there's a business model built on them being there.

Off Grid is proof that the alternative works. Text generation, image generation, vision, voice, tool calling, document analysis -- the full suite -- running on a device in your pocket with zero network dependency. Not as a demo. As an app on the Play Store and App Store you can use today.

The codebase is open source. The architecture is documented. The patterns are extractable. If you're building a React Native app and want to add on-device AI, the reference implementation is there. If you just want the subscriber pattern or the memory budget system or the native download bridge, take those.

Build something private.

**GitHub:** https://github.com/alichherawalla/off-grid-mobile

**App Store:** https://apps.apple.com/us/app/off-grid-local-ai/id6759299882

**Google Play:** https://play.google.com/store/apps/details?id=ai.offgridmobile

---

*Off Grid is free and open source. Contributions welcome.*
