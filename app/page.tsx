import Image from "next/image";
import Link from "next/link";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import { PurposeCompass } from "@/components/purpose/PurposeCompass";
import { HomeDispatchPreview } from "@/components/dispatch/HomeDispatchPreview";
import { sites } from "@/content/sites";
import { commonThreadJourney } from "@/content/journeys/common-thread";

const buildPrinciples = [
  {
    number: "01",
    title: "Find the human centre",
    copy: "Begin with the longing, relationship or suffering the project exists to serve—not with a feature list.",
  },
  {
    number: "02",
    title: "Make it experiential",
    copy: "Do not merely explain the idea. Give it an entrance, a meaningful action, a transformation and a return.",
  },
  {
    number: "03",
    title: "Make ethics structural",
    copy: "Evidence labels, limits, accessibility, privacy and cultural difference belong inside the product architecture.",
  },
  {
    number: "04",
    title: "Build for continuation",
    copy: "Use traceable knowledge, reusable components, revision history and governance so others can carry the work forward.",
  },
];

export default function HomePage() {
  const identity = getClaim("giza-khufu-tomb");
  const mystery = getClaim("giza-big-void");
  const journeySites = commonThreadJourney.steps.map((step) => sites[step.siteId as keyof typeof sites]);

  return (
    <>
      <section className="centre-hero" id="centre">
        <Image
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Angkor_Wat_with_its_reflection_(cropped).jpg"
          alt="Angkor Wat reflected in water at dawn"
          fill
          priority
          sizes="100vw"
        />
        <div className="centre-hero-shade" />
        <div className="centre-hero-orbit" aria-hidden="true"><i/><i/><i/></div>
        <div className="centre-hero-content">
          <p className="eyebrow">Atlas of the Sacred · our living centre</p>
          <h1>Build what helps humanity remember, cooperate, heal and become more conscious.</h1>
          <p className="centre-hero-answer">And build it beautifully enough that people want to enter.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#purpose">Find your doorway</a>
            <Link className="button button-ghost" href="/journeys/common-thread/">Begin the Common Thread</Link>
          </div>
        </div>
        <div className="eternity-question">
          <span>The question beneath the project</span>
          <strong>What do humans build when they want to touch eternity?</strong>
        </div>
        <p className="visual-label">Archaeological photograph · Wikimedia Commons · image credits in source</p>
      </section>

      <PurposeCompass />

      <section className="architecture-manifesto" id="method">
        <div className="architecture-manifesto-intro">
          <p className="eyebrow">How we build</p>
          <h2>Code can be architecture for invisible human values.</h2>
          <p>
            Stone once gave form to remembrance, belonging, death, renewal and the cosmos. Our material is different, but the responsibility is familiar: turn what matters into a structure people can inhabit.
          </p>
        </div>
        <div className="build-principles">
          {buildPrinciples.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
        <div className="living-system">
          <span>Human need</span><i>→</i><span>Beautiful entrance</span><i>→</i><span>Meaningful action</span><i>→</i><span>Real-world return</span><i>→</i><span>Continuable system</span>
        </div>
      </section>

      <section className="thread-preview" id="journey">
        <div className="thread-preview-heading">
          <div><p className="eyebrow">The flagship guided experience</p><h2>One humanity.<br/>Many worlds.</h2></div>
          <div><p>The common thread is not one lost civilisation or one secret doctrine. It is the recurring human work of turning landscape, light, movement, water, sound and stone into relationships that can be inhabited.</p><Link href="/journeys/common-thread/">Walk all seven thresholds →</Link></div>
        </div>
        <div className="thread-ribbon">
          {commonThreadJourney.steps.map((step, index) => <Link href="/journeys/common-thread/" className="thread-ribbon-card" key={step.id} style={{ backgroundImage: `url("${step.image}")` }}><span>0{index + 1}</span><div><small>{step.siteName}</small><strong>{step.title}</strong><em>{step.voice}</em></div></Link>)}
        </div>
      </section>

      <section className="product-covenant" id="covenant">
        <div>
          <p className="eyebrow">The covenant</p>
          <h2>Wonder without manipulation.</h2>
          <p>Beauty earns attention. Trust determines what we do with it.</p>
        </div>
        <div className="covenant-grid">
          <article><span>We remember</span><strong>Every factual statement can reveal its sources, review date and limits.</strong></article>
          <article><span>We cooperate</span><strong>Recurring patterns never erase cultural difference or local voices.</strong></article>
          <article><span>We heal</span><strong>The experience returns people to life—not into dependency, fear or fantasy.</strong></article>
          <article><span>We awaken</span><strong>Mystery remains open without being manufactured for engagement.</strong></article>
        </div>
      </section>

      <section className="home-intro" id="giza">
        <p className="eyebrow">The first deep portal</p>
        <h2>Giza: where eternity becomes an engineering, social and spiritual problem.</h2>
        <div className="home-grid">
          <article><EvidenceBadge status={identity.status}/><h3>{identity.title}</h3><p>{identity.statement}</p></article>
          <article><EvidenceBadge status={mystery.status}/><h3>{mystery.title}</h3><p>{mystery.statement}</p></article>
          <article className="home-journey"><p className="eyebrow">Enter the monument</p><h3>Discover why it is extraordinary.</h3><p>Move through construction, river landscape, ritual geography, cardinal alignment and the known interior.</p><Link href="/sites/giza/">Enter Giza →</Link></article>
        </div>
      </section>

      <HomeDispatchPreview />

      <section className="site-constellation">
        <div className="chapter-heading"><p className="eyebrow">A constellation, not a single doctrine</p><h2>Seven places. Seven distinct voices.</h2><p>Each place holds its own history while joining a wider human conversation about what deserves our finest attention, labour and imagination.</p></div>
        <div className="site-constellation-grid">
          {journeySites.map((site, index) => <Link href={`/sites/${site.slug}/`} key={`${site.id}-${index}`}><Image src={site.heroImage} alt={site.heroAlt} fill sizes="(max-width: 900px) 100vw, 33vw"/><div/><span>0{index + 1}</span><small>{site.locationLabel}</small><h3>{site.name}</h3><p>{site.poeticThesis}</p></Link>)}
        </div>
      </section>

      <section className="system-section" id="evidence">
        <div><p className="eyebrow">Build so others can continue</p><h2>Every fact is a traceable, revisable object.</h2></div>
        <div>
          <div className="system-flow"><span>Site</span><i>→</i><span>Claim</span><i>→</i><span>Evidence</span><i>→</i><span>Sources</span><i>→</i><span>Limits</span><i>→</i><span>Revision</span></div>
          <p>Pages arrange knowledge. They do not hide where it came from. That is how a beautiful experience can become a trustworthy institution.</p>
          <Link className="system-link" href="/editorial/">Inspect the editorial operating system →</Link>
        </div>
      </section>

      <section className="final-centre">
        <p className="eyebrow">The work beneath all our projects</p>
        <h2>We build vessels for human flourishing.</h2>
        <p>Some preserve truth. Some gather communities. Some nourish the body. Some awaken curiosity. The form changes. The centre remains.</p>
        <Link className="button button-primary" href="/journeys/common-thread/">Enter the Atlas</Link>
      </section>
    </>
  );
}
