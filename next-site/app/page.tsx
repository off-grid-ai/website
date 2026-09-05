import {
  Monitor,
  Search,
  Users,
  Video,
  Clock,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

import { Nav } from '@/components/site/nav';
import { OgCard } from '@/components/site/og-card';
import { RevealWords } from '@/components/site/reveal-words';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { GridLines } from '@/components/magicui/grid-lines';
import { BorderBeam } from '@/components/magicui/border-beam';

/* Every string below is lifted verbatim from index.md. Prices come from
   _data/pricing.yml (lifetime 69, top_lifetime 149, price 49, period year) —
   the one thing to wire to real data when the content pipeline lands. */

const STORES = [
  { label: 'App Store', href: 'https://apps.apple.com/us/app/off-grid-local-ai/id6759299882', primary: true },
  { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=ai.offgridmobile' },
  { label: 'macOS', href: 'https://github.com/off-grid-ai/OGAD/releases/latest/download/OffGrid-latest.dmg' },
  { label: 'Windows', href: 'https://github.com/off-grid-ai/OGAD/releases/latest/download/OffGrid-latest-setup.exe' },
];

const STATS = [
  { value: 100, suffix: 'k+', label: 'downloads', sub: 'Play Store, App Store & GitHub' },
  { value: 2500, suffix: '+', label: 'stars on GitHub' },
  { value: 500, suffix: '+', label: 'strong community' },
];

const CAPABILITIES = [
  ['Text generation', 'Llama, Qwen 3, Gemma 3, Phi-4, Mistral and any GGUF model - 15-30 tok/s on flagship devices'],
  ['Image generation', 'On-device Stable Diffusion - 5-10s on NPU (Snapdragon), Core ML on iOS. 20+ models'],
  ['Vision AI', 'Point your camera at anything and ask questions. SmolVLM, Qwen3-VL, Gemma 3n'],
  ['Voice input', 'On-device Whisper speech-to-text. Hold to record, auto-transcribe. No audio leaves your phone'],
  ['Tool calling', 'Web search, calculator, date/time, device info. Automatic tool loop'],
  ['Document analysis', 'Attach PDFs, CSVs, code files. Native PDF text extraction on both platforms'],
  ['Remote servers', 'Connect to Ollama, LM Studio, LocalAI on your home network'],
  ['Works offline', 'Airplane mode, restricted networks, anywhere'],
];

const PERKS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Monitor,
    title: 'Capture, on device',
    desc: 'It quietly takes in what you see and do, on your screen and in your meetings, and turns it into memory. Opt-in per device, with a recording indicator. The pixels never leave your disk.',
  },
  {
    icon: Search,
    title: 'One search across everything',
    desc: 'Find the message, the page, the meeting, the screen from last week, all in one place that only you can read. The end of where did that go.',
  },
  {
    icon: Users,
    title: 'A CRM that builds itself',
    desc: 'It maps the people, projects, and companies you work with, and what is open with each. A relationship graph you never have to update.',
  },
  {
    icon: Video,
    title: 'Replay your whole day',
    desc: 'Scrub through your day like a recording. Every screen, in order, on device. The thing you swear you saw three hours ago is right there.',
  },
  {
    icon: Clock,
    title: 'Where your time really went',
    desc: "You start no timer and tag nothing. At day's end the breakdown is just there: 4h on the rewrite, 50m on Slack, 30m you will wish you had back.",
  },
  {
    icon: Check,
    title: 'It acts, you approve',
    desc: 'It drafts the reply, files the ticket, finds the commitment you made in an email. Every action is a proposal you approve, and every approval is logged.',
  },
];

const NEXT_LINKS = [
  {
    href: '/pro/',
    title: 'See Pro features',
    desc: 'The layer that sees your day, remembers it, and gets ahead of you. Capture, memory, replay, a CRM that builds itself, and actions you approve.',
  },
  {
    href: '/pro/#buy',
    title: 'Get Off Grid AI Pro',
    desc: "Live now on desktop and mobile. Own it forever - $69 - climbing as we grow toward $149, so today's tier is the lowest it will be. Prefer yearly? $49/year.",
  },
  {
    href: '/vision/',
    title: 'Read the vision',
    desc: 'What the world looks like when intelligence is ambient, personal, and private - on the hardware you already own.',
  },
];

/** Uppercase micro-label. right-suite's section label at 0.15em, emerald. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-accent">{children}</p>
  );
}

function Section({
  label,
  title,
  children,
  className,
}: {
  label?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-line py-20 lg:py-28 ${className ?? ''}`}>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
        {label ? <Label>{label}</Label> : null}
        {title ? (
          <h2 className="mb-8 max-w-[26ch] text-2xl lg:text-4xl">{title}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />

      {/* ─── Hero ─────────────────────────────────────────────────────────────
          Left-aligned display type over a masked grid. No stock art: the
          headline is the only thing on the page that makes a claim about the
          reader, so it gets the space. */}
      <section className="relative overflow-hidden">
        <GridLines
          className="[mask-image:radial-gradient(ellipse_at_30%_0%,#000_10%,transparent_70%)]"
          color="rgba(52,211,153,0.10)"
          size={56}
        />
        <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-20 sm:px-8 lg:px-16 lg:pb-28 lg:pt-32">
          <Label>Private AI, on hardware you own</Label>

          <RevealWords
            as="h1"
            words="A private AI that runs on the hardware you already own."
            className="max-w-[18ch] text-[2.5rem] leading-[1.05] tracking-[-0.05em] text-fg sm:text-6xl lg:text-7xl"
          />

          <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-fg-3">
            Chat, images, vision, voice, documents - on iOS, Android, macOS, and Windows, running
            on hardware you own. Local models keep your prompts on your device. If you connect a
            remote model, Off Grid AI sends requests only to the server you choose. Off Grid AI Pro
            adds one intelligence layer across your phone and laptop. The layer that merges the two
            is landing through July.
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {STORES.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                className={
                  s.primary
                    ? 'rounded-md bg-accent px-5 py-3 text-[13px] text-accent-on transition-transform duration-100 ease-og hover:-translate-y-px'
                    : 'rounded-md border border-line px-5 py-3 text-[13px] text-fg transition-colors duration-100 ease-og hover:border-accent hover:text-accent'
                }
              >
                {s.label}
              </a>
            ))}
          </div>

          <p className="mt-6 max-w-[62ch] text-xs leading-relaxed text-fg-3">
            iOS 0.0.103 is live on the App Store. macOS has a stable build. Windows stable{' '}
            <span className="text-fg">0.0.42</span> is available now.{' '}
            <a
              href="https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.42"
              target="_blank"
              rel="noopener"
              className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
            >
              Windows release notes
            </a>
            .
          </p>
        </div>
      </section>

      {/* ─── Proof ────────────────────────────────────────────────────────────
          NumberTicker counts each figure the first time it enters view. */}
      <section className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 lg:px-16">
        <div className="grid gap-3 sm:grid-cols-3">
          {STATS.map((s) => (
            <OgCard key={s.label} className="p-7">
              <div className="text-4xl tracking-[-0.05em] text-accent lg:text-5xl">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-4 text-xs leading-relaxed text-fg-3">
                {s.label}
                {s.sub ? (
                  <>
                    <br />
                    {s.sub}
                  </>
                ) : null}
              </div>
            </OgCard>
          ))}
        </div>

        <p className="mt-10 max-w-[68ch] text-sm leading-relaxed text-fg-2">
          Over 100,000 people already run AI on their own phone with Off Grid AI. No account, no
          subscription for the core, no cloud. The phone in your pocket has enough compute to run a
          capable model offline, at real speed - Off Grid AI makes it do exactly that.
        </p>

        {/* The one place a BorderBeam earns its keep: the enterprise CTA. */}
        <a href="/console/" className="mt-10 block">
          <OgCard
            rule={false}
            className="border-l-2 border-l-accent p-7"
            beam={<BorderBeam size={160} duration={12} borderWidth={1} colorFrom="#34d399" colorTo="transparent" />}
          >
            <Label>For organizations</Label>
            <div className="flex items-center gap-2 text-base text-fg">
              OGAC: govern every AI call in your company
              <ArrowRight className="h-4 w-4 text-accent" />
            </div>
            <p className="mt-3 max-w-[70ch] text-[13px] leading-relaxed text-fg-3">
              The control plane for agentic AI. One governed gateway for every model call and agent,
              on your own infrastructure, fully auditable, built on open source. No per-token or
              per-seat fees.
            </p>
          </OgCard>
        </a>
      </section>

      {/* ─── Capabilities ─────────────────────────────────────────────────── */}
      <Section label="Start with the app" title="Everything runs on the device in your pocket">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-accent">
                <th className="w-56 py-3 pr-6 text-[10px] uppercase tracking-[0.15em] text-fg-3">
                  Capability
                </th>
                <th className="py-3 text-[10px] uppercase tracking-[0.15em] text-fg-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {CAPABILITIES.map(([cap, detail]) => (
                <tr key={cap} className="border-b border-line transition-colors hover:bg-surface">
                  <td className="py-3.5 pr-6 align-top text-fg">{cap}</td>
                  <td className="py-3.5 align-top leading-relaxed text-fg-3">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ─── Vision ───────────────────────────────────────────────────────── */}
      <Section label="Where this is going" title="A private intelligence layer across every device you own">
        <div className="max-w-[68ch] space-y-5 text-sm leading-relaxed text-fg-2">
          <p>
            The app is the first piece. The whole is a Personal AI OS: a private intelligence layer
            that lives across your phone and your laptop, learns your day in the background, and
            gets ahead of you the way a chief of staff would.
          </p>
          <p>
            Your phone knows your life. Your laptop knows your work. Today neither has the full
            picture. Off Grid AI unifies them into one working model of who you are and what you are
            doing. It syncs over your own network, never a cloud relay. It does not wait to be
            opened - it briefs you on the day, surfaces the item you left open, and drafts the reply
            before you remember you owe it.
          </p>
          <p className="text-fg">
            Nothing is sent anywhere, because there is no server to send it to. It is open source,
            so you can check.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NEXT_LINKS.map((l) => (
            <a key={l.title} href={l.href}>
              <OgCard className="h-full p-6">
                <div className="flex items-center gap-2 text-sm text-fg transition-colors group-hover:text-accent">
                  {l.title}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-fg-3">{l.desc}</p>
              </OgCard>
            </a>
          ))}
        </div>
      </Section>

      {/* ─── Pro ──────────────────────────────────────────────────────────── */}
      <Section label="Off Grid AI Pro" title="It was in the room">
        <p className="max-w-[68ch] text-sm leading-relaxed text-fg-2">
          The free app runs models. Off Grid AI Pro adds the layer that sees your day, remembers it,
          and gets ahead of you, the way a chief of staff would. Always on, on your own hardware. It
          is live now on your laptop and your phone. You never brief it. It briefs you.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map(({ icon: Icon, title, desc }) => (
            <OgCard key={title} className="h-full p-6">
              <span className="mb-4 grid h-9 w-9 place-items-center rounded-sm border border-accent/40 text-accent transition-colors group-hover:border-accent">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <div className="text-sm text-fg">{title}</div>
              <p className="mt-2 text-xs leading-relaxed text-fg-3">{desc}</p>
            </OgCard>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2.5">
          <a
            href="/pro/#buy"
            className="rounded-md bg-accent px-5 py-3 text-[13px] text-accent-on transition-transform duration-100 ease-og hover:-translate-y-px"
          >
            Own Off Grid AI Pro forever - $69
          </a>
          <a
            href="/pro/"
            className="rounded-md border border-line px-5 py-3 text-[13px] text-fg transition-colors duration-100 ease-og hover:border-accent hover:text-accent"
          >
            See all Pro features
          </a>
        </div>
      </Section>

      {/* ─── Why local ────────────────────────────────────────────────────── */}
      <Section label="Why local AI matters" title="Privacy is the output of the architecture, not a setting">
        <div className="max-w-[68ch] space-y-5 text-sm leading-relaxed text-fg-2">
          <p>
            When you run a query on a cloud AI service - ChatGPT, Gemini, Claude - it&apos;s logged
            on a server. Your prompt, the response, the time, your account. Stored indefinitely. Used
            to train future models. Subject to law enforcement requests. Readable by employees.
          </p>
          <p>
            With Off Grid AI, none of that applies. The model runs in your phone&apos;s memory.
            Inference happens on your CPU and GPU. Nothing is sent anywhere. Ever.
          </p>
          <p className="text-fg">
            Privacy here isn&apos;t a setting or a promise. It&apos;s the default output of the
            architecture. The system has no mechanism to do otherwise - and because the code is
            open, anyone can verify it.
          </p>
        </div>
      </Section>

      <footer className="border-t border-line py-12">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-6 gap-y-3 px-5 text-xs text-fg-3 sm:px-8 lg:px-16">
          <span className="text-fg">Off Grid AI</span>
          <a href="/privacy/" className="hover:text-fg">Privacy</a>
          <a href="/terms/" className="hover:text-fg">Terms</a>
          <span className="ml-auto">
            Built by{' '}
            <a href="https://www.wednesday.is" target="_blank" rel="noopener" className="underline hover:text-fg">
              Wednesday Solutions
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
