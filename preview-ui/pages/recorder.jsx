import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ListGroup, ListRow } from '@offgrid-ui/list-row';
import { Badge, Card, Heading, Text } from '@radix-ui/themes';
import { ArrowDown, ArrowRight, Pause, Play, Microphone, MagnifyingGlass, ChatCircle, CalendarBlank, Waveform, ShieldCheck, WifiSlash, Cpu, Database, Check } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { AnimatedList } from '@magicui/animated-list';
import { TypingAnimation } from '@magicui/typing-animation';
import { orchestra } from '@offgrid-ui/alive';
import { PlayCtx, PageShell, Kicker, Title, Lede, Reveal, SceneCard, MobileRail, useCycle, useNarrow, useTypePulse } from '../shared.jsx';

// A day in the recorder, shown as it works: speech arrives, is written down, and becomes what mattered.
const HEARD = [
  ['10:02', 'Sam', 'Can we move the Acme Corp pilot to the fourteenth?'],
  ['10:03', 'You', 'Yes. I will send the revised rollout plan by Friday.'],
  ['10:05', 'Sam', 'Keep it at forty seats for now.'],
];
const MATTERED = 'Pilot moves to 14 November at 40 seats. You owe Sam the revised rollout plan by Friday.';
// Script timing: a heard line every LINE_MS, the summary starts at WRITE_AT and types TYPE_MS per character.
const LINE_MS = 900, WRITE_AT = 3400, TYPE_MS = 18;
const DONE_AT = WRITE_AT + MATTERED.length * TYPE_MS + 200;

function RecorderScene() {
  const reduce = useContext(PlayCtx).reducedMotion;
  // Plays on its own until the visitor takes over: touching the scene or the control pauses the loop.
  const [paused, setPaused] = useState(false);
  const still = reduce || paused;
  const loop = useCycle(still ? 0 : 9000);
  const [step, setStep] = useState(reduce ? 2 : 0);
  useEffect(() => {
    if (still) { setStep(2); return; }
    setStep(0);
    const t = [setTimeout(() => setStep(1), WRITE_AT), setTimeout(() => setStep(2), DONE_AT)];
    return () => t.forEach(clearTimeout);
  }, [loop, still]);
  // The scene acts on its own, so the field answers as if the visitor had: each heard line lands with
  // a soft pulse, the summary types with keystroke pulses (kit useTypePulse), and the finished summary
  // settles (aria-busy on the output clears, which the conductor flashes once).
  const heard = useRef(null); const out = useRef(null);
  useEffect(() => {
    if (still) return;
    const t = HEARD.map((_, k) => setTimeout(() => {
      const r = heard.current?.getBoundingClientRect(); if (!r || r.bottom < 0 || r.top > innerHeight) return;
      orchestra.pulse(r.left + r.width / 2, r.top + 28, 'type', .6);
    }, k * LINE_MS));
    return () => t.forEach(clearTimeout);
  }, [loop, still]);
  useTypePulse(out, step === 1 && !still ? MATTERED : '', { delay: 0, perChar: TYPE_MS });
  return <SceneCard busy={step < 2 && !still} className="rc-scene">
    <div className="rc-scene-in" onPointerDown={(e) => { if (!e.target.closest('.rc-play')) setPaused(true); }}>
      <div className="rc-scene-head">
        <span className="rc-rec"><Microphone size={14} weight="fill" /> Recording · on this phone</span>
        <span className="rc-head-r"><Badge variant="outline"><WifiSlash size={12} /> Airplane mode</Badge>
          {!reduce && <Button data-site-button="secondary" variant="outline" size="sm" className="rc-play" aria-pressed={paused} aria-label={paused ? 'Play the demo' : 'Pause the demo'} onClick={() => setPaused(v => !v)}>{paused ? <Play size={14} /> : <Pause size={14} />}</Button>}</span>
      </div>
      <div className="rc-heard" key={`h${loop}`} ref={heard}>
        <AnimatedList delay={900} className="rc-list">
          {HEARD.map(([t, who, line]) => <div className="rc-line" key={t}><small>{t}</small><b>{who}</b><span>{line}</span></div>)}
        </AnimatedList>
      </div>
      <div className={`rc-out ${step >= 1 ? 'is-on' : ''}`} ref={out} aria-busy={step === 1 && !still ? 'true' : undefined}>
        <Kicker>WHAT MATTERED</Kicker>
        <p className="rc-out-text">{step >= 1 ? (still ? MATTERED : <TypingAnimation key={`t${loop}`} as="span" duration={TYPE_MS} startOnView={false} className="rc-typing">{MATTERED}</TypingAnimation>) : <span className="rc-wait">Listening...</span>}</p>
        <div className="rc-tags"><span><Check size={12} /> Filed to Acme Corp sync</span><span><Check size={12} /> 1 follow-up</span></div>
      </div>
    </div>
  </SceneCard>;
}

const DOES = [
  [Microphone, 'It listens, and writes it down', 'The meeting, the call, the hallway aside. Whisper runs on the phone, so a three-hour recording transcribes without filling memory.'],
  [MagnifyingGlass, 'It finds what matters', 'A local model writes the summary and the follow-ups you owe.'],
  [ChatCircle, 'You can ask it anything', 'Every transcript is indexed on-device. Open a chat about one recording: "what did I promise her", answered from the room you were in.'],
  [CalendarBlank, 'It knows your day', 'It reads your calendar and files each recording against its meeting. Reminders work with no signal.'],
  [Waveform, 'It keeps the speech, not the silence', 'It drops silence before anything is written. Keep the speech, or the full timeline.'],
  [ShieldCheck, 'You are the only one with a copy', 'No account, no upload. Off until you turn it on. Delete any of it.'],
];

// The library's ListGroup of ListRows: one surface, rows divided by hairlines. ListRow takes no extra
// attributes, so its rows are marked living after each render; the group arrives once on scroll.
function Steps({ label, className = '', children }) {
  const ref = useRef(null);
  useLayoutEffect(() => { ref.current?.querySelectorAll(':scope > [data-slot=list-row]:not([data-og-living])').forEach((row) => row.setAttribute('data-og-living', '')); });
  return <ListGroup ref={ref} label={label} className={className} data-og-reveal="">{children}</ListGroup>;
}

// What it does: one list of six rows (icon, what it does, how), on every screen.
function Does() {
  return <Steps label="What it does" className="og-rows rc-does">{DOES.map(([Icon, title, text]) => <ListRow key={title} className="og-row"
    leading={<Icon size={18} className="og-row-ic" />} title={title} description={text} />)}</Steps>;
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
  if (narrow) return <section className="has-bg rc-forgot" aria-label="Everything you forgot today"><div className="section-shell"><Title lead={FORGOT} className="rc-forgot-h" /></div></section>;
  return <section className="has-bg manifesto" aria-label="Everything you forgot today"><Reveal>{FORGOT}</Reveal></section>;
}

export default function RecorderPage() {
  return <PageShell><div className="rc-page">
    <section className="has-bg rc-hero" aria-labelledby="rec-h">
      <div className="section-shell rc-hero-grid">
        <div className="rc-hero-copy">
          <Kicker>OFF GRID AI MOBILE · RECORDER</Kicker>
          <div className="rc-badges"><Badge color="green" variant="soft">Private alpha</Badge><Badge variant="outline">Cohort full</Badge></div>
          <Title as="h1" id="rec-h" className="rc-h1" lead="Never forget" dim="anything again." />
          <Lede className="rc-lede">Leave it running. Your phone writes your day down, on the device.</Lede>
          <div className="rc-ctas"><Button data-site-button="secondary" asChild size="lg" variant="outline"><a href="#what-it-does">See what it does <ArrowDown size={15} /></a></Button></div>
        </div>
        <RecorderScene />
      </div>
    </section>

    <Forgot />

    <section id="what-it-does" className="chapter og-solid" aria-labelledby="does-h">
      <div className="section-shell">
        <div className="sec-head" data-og-reveal=""><Kicker>WHAT IT DOES</Kicker><Title id="does-h" lead="A chief of staff in every room." dim="Help that is just there." /></div>
        <Does />
      </div>
    </section>

    <section id="the-part-no-one-else-will-give-you" className="chapter rc-field" aria-labelledby="local-h">
      <div className="section-shell">
        <div className="sec-head" data-og-reveal=""><Kicker>THE PART NO ONE ELSE WILL GIVE YOU</Kicker><Title id="local-h" lead="Nothing leaves your phone." dim="Not to us. Not to anyone." /><Lede>Not a policy. How it is built. Airplane mode for a day and all of it still works.</Lede></div>
        <MobileRail className="rc-local">{LOCAL.map(([Icon, t, d]) => <SceneCard key={t} className="rc-local-card"><div className="rc-local-in"><Icon size={22} /><Heading as="h3">{t}</Heading><Text as="p">{d}</Text><span className="rc-zero">0 bytes sent</span></div></SceneCard>)}</MobileRail>
      </div>
    </section>

    <section id="the-honest-part" className="chapter rc-field" aria-labelledby="honest-h">
      <div className="section-shell rc-honest">
        <div className="sec-head" data-og-reveal=""><Kicker>THE HONEST PART</Kicker><Title id="honest-h" lead="Hard to do on a phone." dim="So we test it with a few first." /><Lede>Continuous capture, transcription and a local model push hard on battery and heat. We are still finding the edges on real phones.</Lede></div>
        <SceneCard className="rc-status"><div className="rc-status-in">
          <Kicker>STATUS</Kicker>
          <Heading as="h3">The current private alpha cohort is full.</Heading>
          <Text as="p">They run it daily, tell us what works and what does not, and shape what this becomes.</Text>
        </div></SceneCard>
        <MobileRail className="explore rc-next">
          <Card asChild className="ex" size="3" data-og-reveal=""><a href="/mobile/" data-analytics-event="recorder_related_clicked" data-analytics-placement="recorder_mobile"><Badge variant="outline">Free · Open source</Badge><Heading as="h3">Get the free app.</Heading><Text as="p">Chat, vision, image, voice and documents on your phone. No account.</Text><span className="ex-link">Explore Mobile <ArrowRight size={15} /></span></a></Card>
          <Card asChild className="ex" size="3" data-og-reveal=""><a href="/ogap/" data-analytics-event="recorder_related_clicked" data-analytics-placement="recorder_ogap"><Badge variant="outline">Hardware · Prototype</Badge><Heading as="h3">Cooling and power for all-day AI.</Heading><Text as="p">OGAP: a frame, cooling module and battery for the phone you own.</Text><span className="ex-link">See OGAP <ArrowRight size={15} /></span></a></Card>
        </MobileRail>
      </div>
    </section>
  </div></PageShell>;
}
