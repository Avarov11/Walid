import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import About from './pages/About';
import Reservation from './pages/Reservation';

function App() {
  const validPages = useMemo(() => new Set(['home', 'portfolio', 'services', 'about', 'reservation']), []);

  const getInitialPage = () => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
    return validPages.has(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Navigate helper: updates state and URL hash so back/forward works
  const navigate = (pageId: string) => {
    if (!validPages.has(pageId)) return;
    if (typeof window !== 'undefined') {
      if (window.location.hash.replace(/^#/, '') !== pageId) {
        window.location.hash = pageId;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPage(pageId);
  };

  // Keep state in sync when user presses browser/OS back/forward
  useEffect(() => {
    const onHashChange = () => {
      const page = window.location.hash.replace(/^#/, '');
      if (validPages.has(page)) {
        setCurrentPage(page);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [validPages]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'portfolio':
        return <Portfolio />;
      case 'services':
        return <Services onNavigate={setCurrentPage} />;
      case 'about':
        return <About onNavigate={setCurrentPage} />;
      case 'reservation':
        return <Reservation />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {(() => {
        switch (currentPage) {
          case 'home':
            return <Home onNavigate={navigate} />;
          case 'portfolio':
            return <Portfolio />;
          case 'services':
            return <Services onNavigate={navigate} />;
          case 'about':
            return <About onNavigate={navigate} />;
          case 'reservation':
            return <Reservation />;
          default:
            return <Home onNavigate={navigate} />;
        }
      })()}
      <Footer />
    </div>
  );
}

export default App;
