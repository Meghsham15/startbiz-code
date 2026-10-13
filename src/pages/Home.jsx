import Hero from '../components/Hero';
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
      <PopularServices />
      <TrustBar />
      <ProblemPathways />
      <SolutionFinderSection />
      <Services />
      <JourneySection />
      <WhyChooseUs />
      <AskStartbizSection />
      <FaqSection />
      <About />
      <FinalCta />
    </>
  );
}
