import React, { useEffect, useRef, useState } from 'react';
import { usePricing } from '../pricing.js';
import { Badge } from '@radix-ui/themes';
import { ArrowRight, ArrowUpRight, ArrowDown, PuzzlePiece, ArrowsClockwise, CursorClick, ShieldCheck, Flask, GithubLogo } from '@phosphor-icons/react';
import Button from '@smoothui/smooth-button';
import { PageShell, Kicker, Title, Lede, SceneCard, SectionBg, MobileRail, PlatformIcon, Shot, ShotSeq, SLACK, useNarrow, CmdBar, CmdScope } from '../shared.jsx';
import { Proof } from './_product.jsx';
import { installClickTracking } from './_track.js';

// /download/ — the visitor's platform first, every other platform right below, then release
// tracks, then a one-line Pro upsell. Every URL and label below comes from the old download.md.
const UTM = 'utm_source=offgrid-docs&utm_medium=website&utm_campaign=download';
const OGAM_V = '0.0.111';
const OGAD_V = '0.0.54';
const OGAM_REL = `https://github.com/off-grid-ai/OGAM/releases/tag/v${OGAM_V}`;
const OGAD_REL = `https://github.com/off-grid-ai/OGAD/releases/tag/v${OGAD_V}`;
const D = `https://github.com/off-grid-ai/OGAD/releases/download/v${OGAD_V}/`;
const APK_V = '0.0.112-beta.1';
const APK = `https://github.com/off-grid-ai/OGAM/releases/download/v${APK_V}/OffgridMobile-${APK_V}.apk`;
const STAR = 'https://github.com/off-grid-ai/OGAD?utm_source=offgrid-docs&utm_medium=website&utm_campaign=github';
const BETA_V = '0.0.55-beta.114';
const B = `https://github.com/off-grid-ai/OGAD/releases/download/v${BETA_V}/`;
const BETA = { dmg: `${B}OffGrid-${BETA_V}.dmg`, exe: `${B}off-grid-ai-${BETA_V}-setup.exe`, AppImage: `${B}off-grid-ai-${BETA_V}.AppImage`, deb: `${B}off-grid-ai_${BETA_V}_amd64.deb` };
const SYNC_MAIL = 'mailto:mac@wednesday.is?subject=SYNC&body=Device%3A%20%0AStore%20email%3A%20';

// One entry per platform. `main` is the primary download; `more` the secondary packages.
const PLATFORMS = [
  { id: 'ios', name: 'iPhone', req: 'iOS 17+ · iPhone 12+', cta: 'Get it for iPhone', main: { small: 'Download on the', label: 'App Store', href: `https://apps.apple.com/us/app/off-grid-local-ai/id6759299882?${UTM}`, aria: 'Download for iOS', external: true } },
  { id: 'android', name: 'Android', req: 'Android 10+ · 4GB RAM+', cta: 'Get it for Android', main: { small: 'Get it on', label: 'Google Play', href: `https://play.google.com/store/apps/details?id=ai.offgridmobile&${UTM}`, aria: 'Download for Android', external: true },
    more: [[`OGAM ${OGAM_V} on GitHub`, OGAM_REL, null, true]] },
  { id: 'macos', name: 'macOS', req: 'Apple Silicon', cta: 'Download for Mac', main: { small: 'Download', label: '.dmg', href: `${D}OffGrid-${OGAD_V}.dmg`, aria: 'Download for macOS stable' } },
  { id: 'windows', name: 'Windows', req: 'x64', cta: 'Download for Windows', main: { small: 'Download', label: '.exe installer', href: `${D}off-grid-ai-${OGAD_V}-setup.exe`, aria: 'Download for Windows stable' } },
  { id: 'linux', name: 'Linux', req: 'Ubuntu 24.04+ · x64', cta: 'Download for Linux', main: { small: 'Download', label: 'AppImage', href: `${D}off-grid-ai-${OGAD_V}.AppImage`, aria: 'Download for Linux stable (AppImage)' },
    more: [['.deb package', `${D}off-grid-ai_${OGAD_V}_amd64.deb`, 'Download for Linux stable (deb)']] },
  { id: 'extension', name: 'Browser extension', req: 'Chrome and Firefox · needs Desktop', main: { small: 'Early access', label: 'Ask the community', href: SLACK, aria: 'Ask the community for the browser extension', external: true } },
];
const BY_ID = Object.fromEntries(PLATFORMS.map(p => [p.id, p]));

function detect() {
  const ua = navigator.userAgent || ''; const p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
  if (/iPhone|iPad|iPod/.test(ua) || (/Mac/.test(p) && navigator.maxTouchPoints > 1)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Win/i.test(p) || /Windows/.test(ua)) return 'windows';
  if (/Linux/i.test(p) || /Linux|X11/.test(ua)) return 'linux';
  return 'macos';
}

// The newest OGAD beta from GitHub replaces the pinned beta links (same logic as the old beta-download.js).
// It asks GitHub once the beta links come into view (or get focus), so most visits never spend the API quota.
function useLatestBeta(ref) {
  const [beta, setBeta] = useState({ links: BETA, tag: BETA_V });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let done = false;
    const load = () => {
      if (done) return; done = true; io.disconnect();
      const suffixes = { dmg: '.dmg', exe: '-setup.exe', AppImage: '.AppImage', deb: '_amd64.deb' };
      fetch('https://api.github.com/repos/off-grid-ai/OGAD/releases?per_page=100', { headers: { Accept: 'application/vnd.github+json' } })
        .then(r => { if (!r.ok) throw new Error('GitHub releases unavailable'); return r.json(); })
        .then(releases => {
          const betas = releases.filter(r => r.prerelease && !r.draft && /-beta\./.test(r.tag_name)).sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
          const links = { ...BETA }; let tag = null;
          Object.entries(suffixes).forEach(([k, suffix]) => {
            let asset; let rel;
            betas.some(r => { asset = r.assets.find(a => a.name.endsWith(suffix) && a.state === 'uploaded'); rel = r; return Boolean(asset); });
            if (asset) { links[k] = asset.browser_download_url; if (k === 'dmg') tag = rel.tag_name.replace(/^v/, ''); }
          });
          setBeta(b => ({ links, tag: tag || b.tag }));
        })
        .catch(() => { /* The links keep their pinned beta download. */ });
    };
    const io = new IntersectionObserver((es) => { if (es.some(e => e.isIntersecting)) load(); }, { rootMargin: '200px' });
    io.observe(el); el.addEventListener('focusin', load);
    return () => { io.disconnect(); el.removeEventListener('focusin', load); };
  }, []);
  return beta;
}

const ext = (on) => on ? { target: '_blank', rel: 'noopener' } : {};
const Icon = ({ id, size }) => id === 'extension' ? <PuzzlePiece size={size} /> : <PlatformIcon id={id} size={size} />;

function Hero({ dev }) {
  const P = BY_ID[dev];
  const desktop = ['macos', 'windows', 'linux'].includes(dev);
  return <section className="pp dn-hero has-bg" aria-labelledby="dn-h"><SectionBg />
    <div className="section-shell dn-hero-grid">
      <div className="dn-hero-copy">
        <Kicker>DOWNLOAD OFF GRID AI</Kicker>
        <Title as="h1" id="dn-h" className="pp-h1 dn-h1" lead="Your personal AI." dim="On hardware you already own." />
        <Lede className="pp-lede">{'Free to start. No account. Runs offline.'}</Lede>
        <div className="pp-cta">
          <Button asChild size="lg" className="pp-main"><a href={P.main.href} aria-label={P.main.aria} title={P.main.aria} {...ext(P.main.external)}><Icon id={dev} size={18} />{P.cta}</a></Button>
          <span className="pp-main-note">{desktop ? `Free · ${OGAD_V} · ${P.req}` : `Free · ${P.req}`}</span>
          <a className="dn-other" href="#all-platforms">Other platforms <ArrowDown size={13} /></a>
        </div>
        <Proof />
      </div>
      <SceneCard className="dn-hero-shot"><CmdScope chapter="download" cmd="brief me, Ares">{(text, seq) => <><CmdBar text={text} seq={seq} className="tour-cmd-card" /><div className="dn-frame"><ShotSeq shots={[
            ['god', 'Off Grid AI God: the 8:50 AM briefing, with three approvals waiting.', 3400],
            ['chat', 'Off Grid AI Chat: what you promised Sam, answered with sources.', 3400],
            ['meetings', 'Off Grid AI Meetings: an Acme Corp call, summarized on device, with what was on screen.', 3400],
            ['mobile/voice-ios-1', 'Off Grid AI on iPhone: a spoken brief on the Acme pilot, with its transcript.', 3600],
            ['models-text', 'Off Grid AI Models: the text models on this computer and the catalog.', 3000],
          ]} /></div></>}</CmdScope></SceneCard>
    </div>
  </section>;
}

function PlatformCard({ p, mine }) {
  return <SceneCard busy={mine} className={`dn-card${mine ? ' dn-mine' : ''}`}>
    <div className="dn-card-head">
      <span className="dn-ic"><Icon id={p.id} size={24} /></span>
      <span className="dn-name"><b>{p.name}</b><small>{p.req}</small></span>
      {mine && <Badge color="green" variant="soft" radius="small" className="dn-badge">This device</Badge>}
    </div>
    <a className="dl dn-dl" href={p.main.href} aria-label={p.main.aria} title={p.main.aria} {...ext(p.main.external)}>
      <span><small>{p.main.small}</small>{p.main.label}</span>{p.main.external ? <ArrowUpRight size={16} /> : <ArrowDown size={16} />}
    </a>
    <div className="dn-more">{(p.more || []).map(([l, h, a, x]) => <a key={h} href={h} {...(a ? { 'aria-label': a, title: a } : {})} {...ext(x)}>{l}</a>)}</div>
  </SceneCard>;
}

function Platforms({ dev }) {
  const narrow = useNarrow();
  const start = Math.max(0, PLATFORMS.findIndex(p => p.id === dev));
  return <section id="all-platforms" className="pp dn-sec dn-plat" aria-labelledby="dn-plat-h">
    {/* Old in-page anchors keep landing here. */}
    <span id="on-your-phone" className="dn-anchor" /><span id="on-your-computer" className="dn-anchor" />
    <div className="section-shell">
      <div className="sec-head"><Kicker>EVERY PLATFORM</Kicker><Title id="dn-plat-h" lead="Every device you own." dim="Same AI on each." /></div>
      <MobileRail key={narrow ? dev : 'grid'} start={start} className="dn-grid">
        {PLATFORMS.map(p => <PlatformCard key={p.id} p={p} mine={p.id === dev} />)}
      </MobileRail>
      <p className="pp-fine dn-foot">
        <a href="/desktop/releases/">Desktop release notes</a><span>·</span><a href="/mobile/releases/">Mobile release notes</a><span>·</span>
        <a href={STAR} target="_blank" rel="noopener" className="pp-ic-link"><GithubLogo size={13} /> Star on GitHub</a><span>·</span>
        <a href="/quick-start/">Installed? Quick start</a>
      </p>
    </div>
  </section>;
}

function Tracks() {
  const betaRef = useRef(null);
  const beta = useLatestBeta(betaRef);
  const BETAS = [['dmg', 'macos', 'macOS', 'Download for macOS beta'], ['exe', 'windows', 'Windows', 'Download for Windows beta'], ['AppImage', 'linux', 'AppImage', 'Download for Linux beta (AppImage)'], ['deb', 'linux', 'deb', 'Download for Linux beta (deb)']];
  return <section id="choose-a-release-track" className="pp dn-sec" aria-labelledby="dn-track-h">
    <div className="section-shell">
      <div className="sec-head"><Kicker>RELEASE TRACKS</Kicker><Title id="dn-track-h" lead="Stable to start." dim="Beta for what's next." /></div>
      <MobileRail className="dn-tracks" labels={['Stable', 'Preview and beta']}>
        <SceneCard className="dn-track">
          <span className="dn-track-ic"><ShieldCheck size={22} /></span>
          <b className="dn-track-t">Stable</b>
          <p>Start here. Store downloads on your phone, release packages on your computer.</p>
          <ul className="dn-vers">
            <li><span>Desktop</span><a href={OGAD_REL} target="_blank" rel="noopener">OGAD {OGAD_V} release</a></li>
            <li><span>Mobile</span><a href={OGAM_REL} target="_blank" rel="noopener">OGAM {OGAM_V} release</a></li>
          </ul>
          <p className="pp-fine">Windows and Linux packages are x64. Store availability varies by platform.</p>
        </SceneCard>
        <SceneCard className="dn-track">
          <span className="dn-track-ic"><Flask size={22} /></span>
          <b className="dn-track-t">Preview and beta</b>
          <p>New features first. Expect rough edges.</p>
          <div className="dn-beta-row" ref={betaRef} aria-label={`Desktop beta ${beta.tag}`}>
            {BETAS.map(([k, id, l, a]) => <a key={k} className="pp-alt" href={beta.links[k]} data-beta-download={k} aria-label={a} title={a}><PlatformIcon id={id} size={14} />{l}</a>)}
            <a className="pp-alt" href={APK} aria-label={`Download Android ${APK_V} preview APK`} title="Android preview APK"><PlatformIcon id="android" size={14} />APK</a>
          </div>
          <div id="new-in-desktop-preview" className="dn-new">
            <span className="eyebrow">New in desktop {beta.tag}</span>
            <ul>
              <li><PlatformIcon id="linux" size={13} /><span>Pro: screen capture, Replay, Clipboard and Vault.</span></li>
              <li><PlatformIcon id="windows" size={13} /><span>Pro: Day, Notifications and Reflect.</span></li>
              <li><Flask size={13} /><span>Edit and reprocess Replay frames. Faster chat and model search.</span></li>
            </ul>
          </div>
          <p className="pp-fine"><a href="/desktop/releases/">Preview release notes</a> · Android APK {APK_V} · <a href="/mobile/releases/">Release notes</a></p>
        </SceneCard>
      </MobileRail>
    </div>
  </section>;
}

function Pro({ pricing }) {
  return <section id="pro" className="pp dn-sec dn-pro" aria-labelledby="dn-pro-h">
    <div className="section-shell">
      <div className="sec-head"><Kicker>WITH PRO</Kicker><Title id="dn-pro-h" lead="Your devices, together." dim="Tasks you approve." /></div>
      <MobileRail className="dn-pro-grid" labels={['Sync', 'Act']}>
        <SceneCard className="dn-track">
          <span id="sync" className="dn-anchor" />
          <span className="dn-track-ic"><ArrowsClockwise size={22} /></span>
          <h2 className="dn-track-t">Continue across devices</h2>
          <p>Pair your devices to share chats, files and models, encrypted. One key covers up to {pricing.devices} devices.</p>
          <p className="pp-fine">Latest mobile Sync build: <a href={SYNC_MAIL}>email Mac</a> with your device and store email.</p>
        </SceneCard>
        <SceneCard className="dn-track">
          <span id="computer-use" className="dn-anchor" />
          <span className="dn-track-ic"><CursorClick size={22} /></span>
          <h2 className="dn-track-t">Let your assistant act</h2>
          <p>Approve a desktop task in your apps or browser. Pause, stop or take over.</p>
          <p className="pp-fine"><a href="/desktop/#computer-use">Desktop features and platform limits</a></p>
        </SceneCard>
      </MobileRail>
      <p className="dn-upsell">Pro adds memory, Sync and approved actions. <b>${pricing.lifetime} once</b> or ${pricing.monthly}/month. <a href="/pro/#buy" data-cta>Get Pro <ArrowRight size={14} /></a></p>
    </div>
  </section>;
}

export default function DownloadPage({ data }) {
  const { pricing } = usePricing(data.pricing);
  // Detect the visitor's platform after hydration; the server renders macOS.
  const [dev, setDev] = useState('macos');
  useEffect(() => { setDev(detect()); }, []);
  useEffect(() => installClickTracking(), []);
  return <PageShell>
    <Hero dev={dev} />
    <Platforms dev={dev} />
    <Tracks />
    <Pro pricing={pricing} />
  </PageShell>;
}
