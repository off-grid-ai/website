import React from 'react';
import { Text } from '@radix-ui/themes';
import { DeviceMobile, Laptop, WifiHigh, CalendarBlank, ChatCircle, VideoCamera, CalendarPlus } from '@phosphor-icons/react';
import { PageShell, Kicker, SceneCard, Shot } from '../shared.jsx';
import { IdeasHero, Platforms, ChapterNav, Chapter, Points, Statement, Proof, Cta, GITHUB } from './_ideas.jsx';

const CHAPTERS = [
  ['your-morning', 'Your morning'],
  ['one-brain-all-your-devices', 'One brain'],
  ['proactive-not-reactive', 'Proactive'],
  ['private-by-architecture-always', 'Private'],
  ['intelligence-for-everyone', 'For everyone'],
];

export default function VisionPage() {
  return <PageShell><div className="ideas ideas-essay">
    <IdeasHero kicker="VISION" id="your-digital-twin-on-the-devices-you-own" lead="Your digital twin," dim="on the devices you own."
      lede="An AI personal assistant that knows your context, remembers what you do, and acts on your behalf with your approval. Available today. This is where we are taking it.">
      <Platforms label="Available today on" />
    </IdeasHero>

    <ChapterNav items={CHAPTERS} label="Vision chapters" />

    <Chapter id="your-morning" n="01" kicker="IMAGINE" title="You wake up. Your devices already know your day."
      pull="By the time you pick up your phone, the briefing is ready. You didn't ask for it.">
      <p>Not from a server. From the intelligence layer on your phone and laptop, synced over your home network while you slept.</p>
      <p>It noticed your 9am is with someone you haven't spoken to in three months, and the last conversation left an open item.</p>
      <SceneCard className="ideas-shot"><Shot name="day" alt="Off Grid AI Day view: to-dos, journal, meetings and timeline for the day." /></SceneCard>
    </Chapter>

    <Chapter id="one-brain-all-your-devices" n="02" kicker="ONE BRAIN" title="One brain. All your devices."
      pull="Your phone and your laptop are used by one person. Today, they don't know that.">
      <p>Each holds a fragment of your context. A Personal AI OS joins them into one picture of you.</p>
      <Points featured items={[
        [DeviceMobile, 'Your phone knows your life.', 'Messages, location, health, the texture of your day.'],
        [Laptop, 'Your laptop knows your work.', 'Documents, email, the projects on your mind.'],
        [WifiHigh, 'They sync over your network.', 'No cloud relay. No data leaving your home.'],
      ]} />
    </Chapter>

    <Chapter id="proactive-not-reactive" n="03" kicker="PROACTIVE" title="Proactive, not reactive."
      pull="Every AI product today waits for you to open it. A great assistant doesn't wait to be asked.">
      <p>You don't pull intelligence out of it. It pushes what's relevant, at the right moment, on the right device.</p>
      <Points featured items={[
        [VideoCamera, 'Your meeting in 20 minutes, already prepped.', 'Past conversations, open items and shared documents, surfaced without asking.'],
        [CalendarBlank, 'Notices when you\'re overcommitted.', ''],
        [ChatCircle, 'Sorts what needs you now.', ''],
        [CalendarPlus, 'Turns "dinner Friday?" into an event.', ''],
      ]} />
    </Chapter>

    <Chapter id="private-by-architecture-always" n="04" kicker="PRIVATE" title="Private by architecture. Always."
      pull="Not because we say so. Because the system has no mechanism to do otherwise.">
      <p>Privacy isn't a setting. It's the output of the architecture. Messages, health data, money, relationships, midnight thoughts: processed locally, stored locally, never transmitted.</p>
      <p><strong>Open source, so anyone can check what leaves the device. The answer is nothing.</strong></p>
    </Chapter>

    <Chapter id="intelligence-for-everyone" n="05" kicker="FOR EVERYONE" title="Intelligence for everyone."
      pull="The only thing between a billion people and their own private intelligence layer is software that takes it seriously.">
      <p>For two hundred years, a personal assistant was a privilege of the powerful. Not anymore. The phones and computers people own run local models, offline after setup, with open-weight models you choose.</p>
      <p><strong>Not for executives. For anyone with a supported phone or computer.</strong></p>
    </Chapter>

    <Statement label="The vision">The same intelligence layer that made some people more effective for two centuries. Now ambient, private, and in everyone's hands.</Statement>

    <section className="has-bg ideas-close" aria-labelledby="vision-close-h"><div className="section-shell">
      <div className="sec-head ideas-head ideas-stack"><Kicker>START TODAY</Kicker>
        <h2 id="vision-close-h" className="ideas-close-h">This is the world we are building. <span className="t-dim">You can use it now.</span></h2>
        <Text as="p">Off Grid AI Pro is live now on your phone and laptop. Sync is live too: chats, projects, model settings, generated images and chat attachments move between paired devices.</Text>
      </div>
      <Proof />
      <div className="ideas-ctas">
        <Cta primary href="/download/">Get the app for your hardware</Cta>
        <Cta href="/download/#sync">Get the latest builds</Cta>
      </div>
      <Text as="p" className="fine">Read <a href="/ethos/">the ethos</a> and <a href="/mission/">the mission</a>. <a href={`${GITHUB}vision`} target="_blank" rel="noopener">View on GitHub</a>.</Text>
    </div></section>
  </div></PageShell>;
}
