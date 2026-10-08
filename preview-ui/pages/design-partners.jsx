import React from 'react';
import { Heading, Text } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { ArrowDown, EnvelopeSimple, Wrench, Infinity as InfinityIcon, Sparkle, Storefront, ChatCircleText, Flask, Check, UsersThree, Handshake } from '@phosphor-icons/react';
import { MagicCard } from '@magicui/magic-card';
import { BorderBeam } from '@magicui/border-beam';
import { NumberTicker } from '@magicui/number-ticker';
import { BlurFade } from '@magicui/blur-fade';
import { PageShell, Kicker, Title, Lede, SectionBg, MobileRail, SceneCard } from '../shared.jsx';
import { Points } from './_ideas.jsx';

// Conversion page for small businesses. The email link keeps its analytics attributes exactly.
const MAILTO = 'mailto:design.partners@getoffgridai.co?subject=Off%20Grid%20AI%20design%20partnership';

const STEPS = [
  ['01', 'Show me how your business works.', 'Walk me through the work as it happens today.'],
  ['02', 'We pick a problem worth solving.', 'One recurring task or process that slows you down.'],
  ['03', 'I set it up and implement it.', 'At no cost to you.'],
  ['04', 'You test it in your daily work.', 'Tell me what works and what needs to change.'],
];

function Card({ children, className = '' }) {
  return <MagicCard className={`feat dp-card ${className}`} gradientSize={260} gradientColor="rgba(16, 185, 129, 0.08)" gradientFrom="var(--og-primary)" gradientTo="var(--og-primary-dark)"><div className="feat-in">{children}</div></MagicCard>;
}

export default function DesignPartnersPage() {
  return <PageShell><div className="ideas dp">
    <section className="has-bg ideas-hero dp-hero" aria-labelledby="build-a-solution-for-your-daily-work-pay-0"><SectionBg />
      <div className="section-shell dp-hero-grid">
        <div className="sec-head ideas-head">
          <Kicker>DESIGN PARTNERS · TEAMS UNDER 50</Kicker>
          <Title as="h1" id="build-a-solution-for-your-daily-work-pay-0" lead="Build a solution for your daily work." dim="Pay $0." />
          <Lede>For teams under 50. Bring a real problem from your work. I set it up with you, at no cost.</Lede>
          <div className="ideas-ctas dp-hero-ctas">
            <Button asChild size="lg" className="ideas-cta-primary"><a href="#start-with-a-conversation">Start with a conversation <ArrowDown size={16} /></a></Button>
            <Button asChild size="lg" variant="outline" className="ideas-cta"><a href="#what-you-get">What you get</a></Button>
          </div>
        </div>
        <SceneCard className="dp-price" busy>
          <div className="dp-price-in">
            <div className="dp-price-row"><span className="eyebrow">Problems like this usually cost</span><span className="dp-was">$99–$999 <small>/ month</small></span></div>
            <div className="dp-price-row dp-price-now"><span className="eyebrow">As a design partner</span><span className="dp-now">$0</span></div>
            <ul className="dp-price-list">{['Free setup and implementation', 'Free lifetime product access', 'Free lifetime Pro, if it fits'].map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
          </div>
        </SceneCard>
      </div>
    </section>

    <section id="small-business-design-partners" className="chapter dp-sec" aria-labelledby="dp-how-h"><div className="section-shell">
      <div className="sec-head ideas-head ideas-stack dp-head"><Kicker>HOW IT WORKS</Kicker><Title id="dp-how-h" lead="You show me the work." dim="We build the fix together." /><Lede>Ideally, I work directly with an owner or someone who can choose and test a solution.</Lede></div>
      <div className="dp-steps">
        {STEPS.map(([n, t, d], i) => <BlurFade key={n} blur="0px" inView inViewMargin="-40px" delay={i * .08} className="dp-step"><span className="dp-step-n">{n}</span><Heading as="h3">{t}</Heading><Text as="p">{d}</Text></BlurFade>)}
      </div>
    </div></section>

    <section id="what-you-get" className="chapter dp-sec dp-band" aria-labelledby="dp-get-h"><div className="section-shell">
      <div className="sec-head ideas-head ideas-stack dp-head"><Kicker>THE OFFER</Kicker><Title id="dp-get-h" lead="What you get." dim="All of it free." /></div>
      <Points featured items={[
        [Wrench, 'Free setup and implementation.', 'I build it with you, in your business. Your cost is $0.'],
        [InfinityIcon, 'Free lifetime product access.', 'If we create a product based even loosely on your input, you get free lifetime access to it.'],
        [Sparkle, 'Free lifetime Off Grid AI Pro.', 'If your idea is a good fit for Off Grid AI. Even if we do not build the full solution together.'],
      ]} />
    </div></section>

    <section className="chapter dp-sec" aria-label="Fit and commitment"><div className="section-shell">
      <MobileRail className="dp-fit">
        <Card>
          <UsersThree size={22} />
          <Heading as="h2" id="who-this-is-for">Who this is for</Heading>
          <ul className="dp-list">
            <li><Check size={14} />Your business has fewer than 50 people.</li>
            <li><Check size={14} />You have a task or process you want to improve.</li>
            <li><Check size={14} />You can test a solution in your daily work.</li>
            <li><Check size={14} />It's a recurring problem that would normally justify $99-$999 per month to solve.</li>
          </ul>
        </Card>
        <Card>
          <Handshake size={22} />
          <Heading as="h2" id="what-i-need-from-you">What I need from you</Heading>
          <ul className="dp-list">
            <li><Check size={14} />Your time and feedback.</li>
            <li><Check size={14} />Show me how you handle the work today.</li>
            <li><Check size={14} />Try the solution in your business.</li>
            <li><Check size={14} />Tell me what works and what needs to change.</li>
          </ul>
          <Text as="p" className="small">I want to build around real work and learn from the people doing it.</Text>
        </Card>
      </MobileRail>
    </div></section>

    <section id="start-with-a-conversation" className="chapter dp-start" aria-labelledby="dp-start-h"><div className="section-shell">
      <div className="sec-head ideas-head ideas-stack dp-head"><Kicker>START WITH A CONVERSATION</Kicker><Title id="dp-start-h" lead="Tell me about your business." dim="We start with your use case." /></div>
      <Card className="dp-mail">
        <div className="dp-mail-to"><span className="eyebrow">Email</span>
          <Button asChild size="lg" className="ideas-cta-primary dp-mail-btn"><a href={MAILTO} data-analytics-event="design_partner_email_clicked" data-analytics-placement="partner_page"><EnvelopeSimple size={18} /><span>design.partners@getoffgridai.co</span></a></Button>
        </div>
        <span className="eyebrow dp-include-h">Include</span>
        <ol className="dp-include">
          <li><Storefront size={18} /><span>What your business does and how many people are on your team.</span></li>
          <li><Flask size={18} /><span>The task or process you want to improve.</span></li>
          <li><ChatCircleText size={18} /><span>How you handle it today and where you get stuck.</span></li>
        </ol>
      </Card>
    </div></section>
  </div></PageShell>;
}
