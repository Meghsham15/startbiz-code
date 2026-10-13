import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ContactForm from './components/ContactForm';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import CategoryPage from './pages/CategoryPage';
import FinderPage from './pages/FinderPage';
import ComparePage from './pages/ComparePage';
import KnowledgePage from './pages/KnowledgePage';
import KnowledgeArticle from './pages/KnowledgeArticle';
import IndustriesPage from './pages/IndustriesPage';
import IndustryDetail from './pages/IndustryDetail';
import NotFound from './pages/NotFound';
import LegalPage from './pages/LegalPage';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <main>
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
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </BrowserRouter>
  );
}

export default App;
