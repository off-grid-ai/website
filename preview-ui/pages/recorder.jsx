import React, { useEffect, useState } from 'react';
import { Badge, Card, Heading, Text } from '@radix-ui/themes';
import { ArrowDown, ArrowRight, Pause, Play, Microphone, MagnifyingGlass, ChatCircle, CalendarBlank, Waveform, ShieldCheck, WifiSlash, Cpu, Database, Check } from '@phosphor-icons/react';
import { useReducedMotion } from 'motion/react';
import Button from '@smoothui/smooth-button';
import { MagicCard } from '@magicui/magic-card';
import { BlurFade } from '@magicui/blur-fade';
import { AnimatedList } from '@magicui/animated-list';
import { TypingAnimation } from '@magicui/typing-animation';
import { PageShell, Kicker, Title, Lede, Reveal, SceneCard, SectionBg, MobileRail, useCycle, useNarrow } from '../shared.jsx';

// A day in the recorder, shown as it works: speech arrives, is written down, and becomes what mattered.
const HEARD = [
  ['10:02', 'Sam', 'Can we move the Acme Corp pilot to the fourteenth?'],
  ['10:03', 'You', 'Yes. I will send the revised rollout plan by Friday.'],
  ['10:05', 'Sam', 'Keep it at forty seats for now.'],
];
const MATTERED = 'Pilot moves to 14 November at 40 seats. You owe Sam the revised rollout plan by Friday.';

function RecorderScene() {
  const reduce = useReducedMotion();
  // Plays on its own until the visitor takes over: touching the scene or the control pauses the loop.
  const [paused, setPaused] = useState(false);
  const still = reduce || paused;
  const loop = useCycle(still ? 0 : 9000);
  const [step, setStep] = useState(reduce ? 2 : 0);
  useEffect(() => {
    if (still) { setStep(2); return; }
    setStep(0);
    const t = [setTimeout(() => setStep(1), 3400), setTimeout(() => setStep(2), 4200)];
    return () => t.forEach(clearTimeout);
  }, [loop, still]);
  return <SceneCard busy={step < 2 && !still} className="rc-scene">
    <div className="rc-scene-in" onPointerDown={(e) => { if (!e.target.closest('.rc-play')) setPaused(true); }}>
      <div className="rc-scene-head">
        <span className="rc-rec"><Microphone size={14} weight="fill" /> Recording · on this phone</span>
        <span className="rc-head-r"><Badge variant="outline"><WifiSlash size={12} /> Airplane mode</Badge>
          {!reduce && <Button variant="outline" size="sm" className="rc-play" aria-pressed={paused} aria-label={paused ? 'Play the demo' : 'Pause the demo'} onClick={() => setPaused(v => !v)}>{paused ? <Play size={14} /> : <Pause size={14} />}</Button>}</span>
      </div>
      <div className="rc-heard" key={`h${loop}`}>
        <AnimatedList delay={900} className="rc-list">
          {HEARD.map(([t, who, line]) => <div className="rc-line" key={t}><small>{t}</small><b>{who}</b><span>{line}</span></div>)}
        </AnimatedList>
      </div>
      <div className={`rc-out ${step >= 1 ? 'is-on' : ''}`}>
        <Kicker>WHAT MATTERED</Kicker>
        <p className="rc-out-text">{step >= 1 ? (still ? MATTERED : <TypingAnimation key={`t${loop}`} as="span" duration={18} startOnView={false} className="rc-typing">{MATTERED}</TypingAnimation>) : <span className="rc-wait">Listening...</span>}</p>
        <div className="rc-tags"><span><Check size={12} /> Filed to Acme Corp sync</span><span><Check size={12} /> 1 follow-up</span></div>
      </div>
    </div>
  </SceneCard>;
}

const DOES = [
  [Microphone, 'It listens, and writes it down', 'The meeting, the call, the hallway aside. Whisper runs on the phone in resumable chunks, so a three-hour recording transcribes without eating your memory.'],
  [MagnifyingGlass, 'It finds what matters', 'A local model turns each recording into a summary, key points and the follow-ups you owe. Give it the names and jargon to get right.'],
  [ChatCircle, 'You can ask it anything', 'Every transcript is indexed on-device. Open a chat about one recording: "what did I promise her", answered from the room you were in.'],
  [CalendarBlank, 'It knows your day', 'Reads your calendar, nudges you before a meeting, files each recording against it. Reminders are local notifications, so they work with no signal.'],
  [Waveform, 'It keeps the speech, not the silence', 'An on-device voice-activity model drops silence before anything is written. Compress after analysis, or strip to speech and restore the full timeline later.'],
  [ShieldCheck, 'You are the only one with a copy', 'No account, no upload. Off until you turn it on, it shows when it is running, and you can delete any of it outright.'],
];

// Wide screens: six quiet columns under one heading. Phones: a swipe row of cards.
function Does() {
  const narrow = useNarrow();
  if (narrow) return <MobileRail>{DOES.map(([Icon, title, text]) => <MagicCard key={title} className="feat" gradientColor="rgba(16, 185, 129, 0.08)" gradientFrom="var(--og-primary)" gradientTo="var(--og-primary-dark)">
    <div className="feat-in"><Icon size={22} /><Heading as="h3">{title}</Heading><Text as="p">{text}</Text></div>
  </MagicCard>)}</MobileRail>;
  return <ul className="rc-does">{DOES.map(([Icon, title, text], i) => <li key={title}><BlurFade inView delay={(i % 3) * .1} blur="0px" className="rc-does-in"><Icon size={22} /><Heading as="h3">{title}</Heading><Text as="p">{text}</Text></BlurFade></li>)}</ul>;
}

const LOCAL = [
  [Waveform, 'Transcription', 'Whisper runs in your phone\'s memory.'],
  [Cpu, 'Insights', 'A model you downloaded does the analysis.'],
  [Database, 'Search', 'The index is a database on your disk.'],
];

const FORGOT = 'Think about everything you forgot today. The name, the one line you needed, the idea gone by lunch. This catches it.';
// A scroll-driven reveal on wide screens, a short statement on phones (less scrolling).
function Forgot() {
  const narrow = useNarrow();
  if (narrow) return <section className="has-bg rc-forgot" aria-label="Everything you forgot today"><SectionBg /><div className="section-shell"><Title lead={FORGOT} className="rc-forgot-h" /></div></section>;
  return <section className="has-bg manifesto" aria-label="Everything you forgot today"><SectionBg /><Reveal>{FORGOT}</Reveal></section>;
}

export default function RecorderPage() {
  return <PageShell><div className="rc-page">
    <section className="has-bg rc-hero" aria-labelledby="rec-h"><SectionBg />
      <div className="section-shell rc-hero-grid">
        <div className="rc-hero-copy">
          <Kicker>OFF GRID AI MOBILE · RECORDER</Kicker>
          <div className="rc-badges"><Badge color="green" variant="soft">Private alpha</Badge><Badge variant="outline">Cohort full</Badge></div>
          <Title as="h1" id="rec-h" className="rc-h1" lead="Never forget" dim="anything again." />
          <Lede className="rc-lede">Leave it running. Your phone catches your day, writes it down, and hands you what mattered. All on the device in your hand.</Lede>
          <div className="rc-ctas"><Button asChild size="lg" variant="outline"><a href="#what-it-does">See what it does <ArrowDown size={15} /></a></Button></div>
          <Text as="p" className="small rc-full">The current private alpha is full. We are not taking more people into this round.</Text>
        </div>
        <RecorderScene />
      </div>
    </section>

    <Forgot />

    <section id="what-it-does" className="chapter rc-solid" aria-labelledby="does-h">
      <div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>WHAT IT DOES</Kicker><Title id="does-h" lead="A chief of staff in every room." dim="Help that is just there." /></BlurFade>
        <Does />
      </div>
    </section>

    <section id="the-part-no-one-else-will-give-you" className="chapter rc-solid" aria-labelledby="local-h">
      <div className="section-shell">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>THE PART NO ONE ELSE WILL GIVE YOU</Kicker><Title id="local-h" lead="Nothing leaves your phone." dim="Not to us. Not to anyone." /><Lede>Not a policy. How it is built. Airplane mode for a day and all of it still works.</Lede></BlurFade>
        <MobileRail className="rc-local">{LOCAL.map(([Icon, t, d]) => <SceneCard key={t} className="rc-local-card"><div className="rc-local-in"><Icon size={22} /><Heading as="h3">{t}</Heading><Text as="p">{d}</Text><span className="rc-zero">0 bytes sent</span></div></SceneCard>)}</MobileRail>
        <Text as="p" className="fine rc-sync">Sync is live. Chats, projects, model settings, generated images and chat attachments move between paired devices. No Off Grid AI server receives or stores the synced content.</Text>
      </div>
    </section>

    <section id="the-honest-part" className="chapter rc-solid" aria-labelledby="honest-h">
      <div className="section-shell rc-honest">
        <BlurFade blur="0px" inView inViewMargin="-80px" className="sec-head"><Kicker>THE HONEST PART</Kicker><Title id="honest-h" lead="Hard to do on a phone." dim="So we test it with a few first." /><Lede>Continuous capture, transcription and a local model push hard on battery and heat. We are still finding the edges on real phones.</Lede></BlurFade>
        <SceneCard className="rc-status"><div className="rc-status-in">
          <Kicker>STATUS</Kicker>
          <Heading as="h3">The current private alpha cohort is full.</Heading>
          <Text as="p">They run it daily, tell us what works and what does not, and shape what this becomes. We are not taking more people into this round.</Text>
        </div></SceneCard>
        <MobileRail className="explore rc-next">
          <Card asChild className="ex" size="3"><a href="/mobile/" data-analytics-event="recorder_related_clicked" data-analytics-placement="recorder_mobile"><Badge variant="outline">Free · Open source</Badge><Heading as="h3">Get the free app.</Heading><Text as="p">Chat, vision, image, voice and documents on your phone. No account.</Text><span className="ex-link">Explore Mobile <ArrowRight size={15} /></span></a></Card>
          <Card asChild className="ex" size="3"><a href="/ogap/" data-analytics-event="recorder_related_clicked" data-analytics-placement="recorder_ogap"><Badge variant="outline">Hardware · Prototype</Badge><Heading as="h3">Cooling and power for all-day AI.</Heading><Text as="p">OGAP: a frame, cooling module and battery for the phone you own.</Text><span className="ex-link">See OGAP <ArrowRight size={15} /></span></a></Card>
        </MobileRail>
      </div>
    </section>
  </div></PageShell>;
}
