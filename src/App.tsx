import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import About from './pages/About';
import Reservation from './pages/Reservation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
