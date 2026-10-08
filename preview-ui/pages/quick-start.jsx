import React, { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, DeviceMobile, Laptop, ArrowsClockwise, MagnifyingGlass, ChatsCircle } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, MobileRail, PlatformIcon, Shot, SLACK } from '../shared.jsx';
import { Explorer, Framed, Seq, Fit, Loop, ChatScene } from './_product.jsx';
import { installClickTracking } from './_track.js';

// /quick-start/ — download to first answer in four steps, each with the real screen.
const INSTALL = [
  ['macos', 'macOS', 'Apple Silicon', 'Download', '/download/'],
  ['windows', 'Windows', 'x64', 'Download', '/download/'],
  ['linux', 'Linux', 'Ubuntu 24.04+, x64', 'AppImage or deb', '/download/'],
  ['ios', 'iOS', 'iOS 17+, iPhone 12+', 'App Store', 'https://apps.apple.com/us/app/off-grid-local-ai/id6759299882'],
  ['android', 'Android', 'Android 10+, 4GB RAM+', 'Google Play', 'https://play.google.com/store/apps/details?id=ai.offgridmobile'],
];

function InstallScene() {
  return <div className="pp-scene"><SceneCard className="qs-install">
    <ul className="qs-plat">
      {INSTALL.map(([id, name, req, label, href]) => <li key={id}>
        <span className="qs-plat-ic"><PlatformIcon id={id} size={18} /></span>
        <span className="qs-plat-tx"><b>{name}</b><small>{req}</small></span>
        <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>{label}{href.startsWith('http') ? <ArrowUpRight size={13} /> : <ArrowRight size={13} />}</a>
      </li>)}
    </ul>
  </SceneCard></div>;
}

const shot = (name, alt) => () => <Framed><Shot name={name} alt={alt} /></Framed>;

const STEPS = [
  { id: 'install', cmd: 'install Off Grid AI', title: 'Install', line: 'Get the app for your phone or computer.',
    note: <>Use <a href="/download/#choose-a-release-track">preview builds</a> for the newest features.</>, visual: () => <InstallScene /> },
  { id: 'model', cmd: 'download a model', title: 'Prepare a model',
    line: 'Open Models and download a text model that fits your memory. On a phone, tap Load.',
    visual: shot('models-text', 'Off Grid AI Models: local models that fit this computer, ready to download.') },
  { id: 'chat', cmd: 'start a chat', title: 'Start a chat',
    line: 'Open Chat and ask something. It works offline once the model is downloaded.',
    visual: (compact) => { const n = <Loop><ChatScene model="Qwen 3.8 · on device" q="Rewrite this in three bullets. Keep the facts. Do not add details." a="• Acme Corp pilot moves to 14 November. • 40 seats stay at the current price. • Revised rollout plan due Friday." /></Loop>; return compact ? <div className="pp-card-scene">{n}</div> : <Fit><SceneCard className="pp-scene-card">{n}</SceneCard></Fit>; } },
  { id: 'pro', cmd: 'turn on memory and actions', title: 'Add memory and actions',
    line: 'Enter your Pro key. Choose what it captures. Approve each action.',
    note: <>Features differ by platform and release. Check <a href="/desktop/releases/">desktop support</a> or <a href="/mobile/releases/">mobile support</a>.</>,
    visual: (compact) => compact ? <Framed><Shot name="replay" alt="Off Grid AI Replay: the screen activity you chose to capture." /></Framed> : <Seq shots={[['replay', 'Off Grid AI Replay: the screen activity you chose to capture.', 3400], ['approval', 'Off Grid AI approval card: a drafted Gmail reply with Approve, Edit and Reject.', 3400]]} /> },
];

const NEXT = [
  [Laptop, 'Desktop setup and tasks', '/guides/#desktop'],
  [DeviceMobile, 'Mobile setup', '/guides/#mobile'],
  [ArrowsClockwise, 'Pair your devices with Pro Sync', '/articles/how-to-pair-your-phone-and-computer-in-off-grid-ai-in-2026-local-chat-and-file-sync/'],
  [MagnifyingGlass, 'Find a guide for your task', '/articles/'],
];

export default function QuickStartPage() {
  useEffect(() => installClickTracking(), []);
  return <PageShell>
    <section className="pp qs-hero has-bg" aria-labelledby="quick-start"><SectionBg />
      <div className="section-shell qs-hero-in">
        <Kicker>QUICK START</Kicker>
        <Title as="h1" id="quick-start" className="pp-h1" lead="From download" dim="to first answer." />
        <Lede className="pp-lede">{'Free on the hardware you own. No account, no API key.'}</Lede>
        <Button asChild size="lg" className="pp-main"><a href="/download/" data-cta>Get the app <ArrowRight size={16} /></a></Button>
      </div>
    </section>

    <section className="chapter pp qs-steps" aria-labelledby="qs-steps-h">
      {/* Old heading anchors keep landing on the steps. */}
      {['1-install', '2-prepare-a-model', '3-start-a-chat', '4-add-memory-and-actions'].map(id => <span key={id} id={id} className="qs-anchor" />)}
      <div className="section-shell">
        <div className="sec-head"><Kicker>FOUR STEPS</Kicker><Title id="qs-steps-h" lead="Install. Pick a model." dim="Then ask." /></div>
        <Explorer items={STEPS} label="Quick start steps" ms={7000} className="qs-explorer" />
      </div>
    </section>

    <section className="pp qs-next" aria-labelledby="find-your-next-task">
      <span id="next" className="qs-anchor" />
      <div className="section-shell">
        <div className="sec-head"><Kicker>NEXT</Kicker><Title id="find-your-next-task" lead="Find your next task." /></div>
        <MobileRail className="qs-next-grid">
          {NEXT.map(([I, label, href]) => <a key={href} className="qs-next-a" href={href}><SceneCard className="qs-next-card">
            <span className="qs-next-ic"><I size={20} /></span><b>{label}</b><ArrowRight size={16} className="qs-go" />
          </SceneCard></a>)}
        </MobileRail>
        <p className="qs-help"><a href="/guides/">All guides <ArrowRight size={13} /></a><span>·</span><span>Need help?</span> <a href={SLACK} target="_blank" rel="noopener"><ChatsCircle size={14} /> Join the community</a></p>
      </div>
    </section>
  </PageShell>;
}
