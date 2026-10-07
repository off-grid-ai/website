import React from 'react';
import { Text } from '@radix-ui/themes';
import { GithubLogo, UserCircleMinus, EyeSlash } from '@phosphor-icons/react';
import { PageShell, Kicker, SLACK } from '../shared.jsx';
import { IdeasHero, Platforms, ChapterNav, Chapter, Points, Statement, Proof, Cta, GITHUB } from './_ideas.jsx';

const CHAPTERS = [
  ['the-shift', 'The shift'],
  ['the-way-its-being-built-today-is-wrong', 'The problem'],
  ['the-infrastructure-is-already-in-your-hands', 'The hardware'],
  ['privacy-is-not-a-feature-its-an-architecture-decision', 'Privacy'],
  ['what-were-building', 'What we build'],
  ['the-mission', 'The mission'],
];

export default function MissionPage() {
  return <PageShell><div className="ideas ideas-essay">
    <IdeasHero kicker="MISSION" id="intelligence-belongs-to-everyone" lead="Intelligence belongs" dim="to everyone."
      lede="Our goal is your digital twin: an AI personal assistant that knows your context, remembers what you do, and acts on your behalf with your approval.">
      <Platforms />
    </IdeasHero>

    <ChapterNav items={CHAPTERS} label="Mission chapters" />

    <Chapter id="the-shift" n="01" kicker="THE SHIFT" title="Intelligence is next."
      pull="Navigation used to belong to experts. Then it became ambient.">
      <p>You needed a map, a compass, training. Then it was built into the device in your pocket, free and always on. You stopped thinking of it as a tool.</p>
      <p>Intelligence is next. Not an app you open. Not rent you pay. Not a server that answers when you remember to ask. <strong>Ambient intelligence. Always on. Always yours.</strong></p>
      <p>The question isn't whether it happens. It's who builds it, on whose terms, and whose data pays for it.</p>
    </Chapter>

    <Chapter id="the-way-its-being-built-today-is-wrong" n="02" kicker="THE PROBLEM" title="The way it's being built today is wrong."
      pull="Your intelligence on a server you don't own is one acquisition, one pricing change, one bad quarter from gone.">
      <p>Today your health questions, money decisions and 2am ideas go to servers you don't control, under terms you didn't read.</p>
      <p>Some products promised local-first. Then they went cloud, got acquired, shut down overnight. Their users lost years of personal context. <strong>That already happened.</strong></p>
      <p>The problem isn't the companies. The problem is the architecture.</p>
    </Chapter>

    <Chapter id="the-infrastructure-is-already-in-your-hands" n="03" kicker="THE HARDWARE" title="The infrastructure is already in your hands."
      pull="The hardware for personal AI is already in your hands. Our job is to build the software that makes it useful.">
      <p>Your phone and computer already run local AI models for chat, writing and documents. Pick a model that fits, download it, run it offline.</p>
      <p><strong>No new device to wait for. Nothing to buy.</strong></p>
    </Chapter>

    <Chapter id="privacy-is-not-a-feature-its-an-architecture-decision" n="04" kicker="PRIVACY" title="Privacy is not a feature. It's an architecture decision."
      pull="The only guarantee your data stays yours is that it never leaves your device.">
      <p>"We anonymise before storing." "You can opt out in settings." Policies change when the company does. Not a toggle. Not a promise. <strong>Architecture.</strong></p>
      <Points featured items={[
        [GithubLogo, 'Open source.', 'If you can\'t audit it, you can\'t trust it. Anyone can verify what the software does.'],
        [UserCircleMinus, 'No account.', ''],
        [EyeSlash, 'No telemetry.', 'No analytics. No data collection of any kind.'],
      ]} />
    </Chapter>

    <Chapter id="what-were-building" n="05" kicker="WHAT WE'RE BUILDING" title="A private secretary, for everyone."
      pull="For two hundred years, a private intelligence layer belonged to the wealthy and the senior.">
      <p>A secretary knew your priorities, handled correspondence, prepared every meeting and tracked commitments, so you could do the work only you can do.</p>
      <p><strong>A Personal AI OS changes that.</strong> One intelligence layer across your phone and laptop, over your own network, no server in between. It preps your meetings before you ask and surfaces only what can't wait. It acts with your approval.</p>
      <p>On devices billions already carry. On models that cost nothing to run. With data that never leaves your hands.</p>
    </Chapter>

    <Statement label="The mission">Democratize intelligence. Personal. Private. Ambient. On the hardware people already own.</Statement>

    <section id="the-mission" className="has-bg ideas-close" aria-labelledby="the-mission-h"><div className="section-shell">
      <div className="sec-head ideas-head ideas-stack"><Kicker>THE MISSION</Kicker>
        <h2 id="the-mission-h" className="ideas-close-h">Democratize intelligence. <span className="t-dim">This is happening now.</span></h2>
        <Text as="p">Personal, private, ambient, without trusting anyone but yourself. Off Grid AI Pro is live on your laptop and your phone. Sync is live: chats, projects, model settings, generated images and chat attachments move between paired devices, and no Off Grid AI server receives or stores the synced content.</Text>
      </div>
      <Proof />
      <div className="ideas-ctas">
        <Cta primary href="/pro/">Get Off Grid AI Pro</Cta>
        <Cta href="/vision/">See the vision</Cta>
      </div>
      <Text as="p" className="fine">Open source. No account. No telemetry. <a href={`${GITHUB}github`} target="_blank" rel="noopener">View on GitHub</a> · <a href={SLACK} target="_blank" rel="noopener">Join the community</a> · <a href="/download/">Get the apps</a></Text>
    </div></section>
  </div></PageShell>;
}
