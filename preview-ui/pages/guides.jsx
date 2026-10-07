import React from 'react';
import { Card } from '@radix-ui/themes';
import { ArrowRight } from '@phosphor-icons/react';
import { MobileRail, PlatformIcon, Kicker, useNarrow } from '../shared.jsx';
import { Hub } from './_hub.jsx';

// /guides/ — setup paths per platform, then every guide and article with search and filters.
const SETUP = [
  ['desktop', 'macos', 'macOS', '/articles/how-to-run-local-ai-on-your-mac-in-2026-no-cloud-no-account/'],
  ['desktop', 'windows', 'Windows', '/articles/how-to-run-local-ai-on-your-windows-pc-in-2026-no-cloud-no-account/'],
  ['desktop', 'linux', 'Linux', '/articles/how-to-run-local-ai-on-linux-in-2026-no-cloud-no-account/'],
  ['mobile', 'ios', 'iOS', '/guides/ios-setup/'],
  ['mobile', 'android', 'Android', '/guides/android-setup/'],
];
function SetupCard({ id, label, href }) {
  return <Card asChild className="setup-card"><a href={href}>
    <span className="setup-ic"><PlatformIcon id={id} size={20} /></span>
    <span className="setup-tx"><span className="setup-t">{label} setup</span><span className="setup-d">Install and run your first local model.</span></span>
    <ArrowRight size={16} className="setup-go" />
  </a></Card>;
}
function Setup() {
  const narrow = useNarrow();
  const card = ([, id, label, href]) => <SetupCard key={id} id={id} label={label} href={href} />;
  return <div className="setup">
    <div className="setup-head">
      <Kicker>START HERE</Kicker>
      <span className="setup-links"><a href="/quick-start/">Quick Start</a><a href="#desktop">Desktop</a><a href="#mobile">Mobile</a></span>
    </div>
    {narrow ? <div className="setup-group"><span id="desktop" /><span id="mobile" /><MobileRail>{SETUP.map(card)}</MobileRail></div> : <div className="setup-groups">
      <div className="setup-group" id="desktop"><p className="setup-label">On your computer</p>
        <MobileRail className="setup-row">{SETUP.filter(s => s[0] === 'desktop').map(([, id, label, href]) => <SetupCard key={id} id={id} label={label} href={href} />)}</MobileRail></div>
      <div className="setup-group" id="mobile"><p className="setup-label">On your phone</p>
        <MobileRail className="setup-row">{SETUP.filter(s => s[0] === 'mobile').map(([, id, label, href]) => <SetupCard key={id} id={id} label={label} href={href} />)}</MobileRail></div>
    </div>}
  </div>;
}

export default function GuidesPage({ data }) {
  return <Hub hub={data.hub} kicker="GUIDES" lead="Guides." dim="Any task, any device."
    lede="Your personal AI on hardware you already own." placement="guides" noun="guides" defaultTitle="Guides"
    searchLabel="Search guides" placeholder="Search: PDF, voice, sync..." intro={<Setup />} featured={['/guides/off-grid-ai-desktop-from-your-phone/']} />;
}
