import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ContactForm from './components/ContactForm';
import WhatsAppFloat from './components/WhatsAppFloat';
import SiteSkeleton from './components/SiteSkeleton';
import ScrollMotion from './components/ScrollMotion';

const Home = lazy(() => import('./pages/Home'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const FinderPage = lazy(() => import('./pages/FinderPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const KnowledgeArticle = lazy(() => import('./pages/KnowledgeArticle'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

function PageContent({ children }) {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const timer = window.setTimeout(() => setReady(true), 420);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <div hidden={!ready}>{children}</div>
      {ready ? null : <SiteSkeleton />}
      <ScrollMotion active={ready} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Suspense fallback={<SiteSkeleton />}>
          <PageContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/finder" element={<FinderPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/knowledge/:slug" element={<KnowledgeArticle />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route
              path="/privacy-policy"
              element={<LegalPage docKey="privacy" />}
            />
            <Route
              path="/refund-cancellation-policy"
              element={<LegalPage docKey="refund" />}
            />
            <Route
              path="/terms-and-conditions"
              element={<LegalPage docKey="terms" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ContactForm />
          </PageContent>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </BrowserRouter>
  );
}

export default App;
