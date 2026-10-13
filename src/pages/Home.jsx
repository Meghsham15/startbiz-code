import Hero from '../components/Hero';
import Reveal from '../components/Reveal';
import PopularServices from '../components/PopularServices';
import TrustBar from '../components/TrustBar';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import About from '../components/About';
import Seo, {
  faqSchema,
  organizationSchema,
  websiteSchema,
} from '../components/Seo';
import { brand } from '../data/content';
import { siteFaqs } from '../data/strategyContent';
import {
  AskStartbizSection,
  FaqSection,
  FinalCta,
  JourneySection,
  ProblemPathways,
  SolutionFinderSection,
} from '../components/HomeExtras';

export default function Home() {
  const jsonLd = [organizationSchema(), websiteSchema(), faqSchema(siteFaqs)];

  return (
    <>
      <Seo
        title={brand.seoTitle}
        description={brand.seoDescription}
        path="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <Reveal>
        <PopularServices />
      </Reveal>
      <Reveal>
        <TrustBar />
      </Reveal>
      <Reveal>
        <ProblemPathways />
      </Reveal>
      <Reveal>
        <SolutionFinderSection />
      </Reveal>
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <JourneySection />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <AskStartbizSection />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
