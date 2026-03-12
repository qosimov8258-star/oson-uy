import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { FilterProvider, useFilters } from './context/FilterContext';
import HeroHeader from './components/HeroHeader';
import ListingGrid from './components/ListingGrid';
import Footer from './components/Footer';
import Registration from './components/Registration';
import PostAd from './components/PostAd';
import PropertyDetail from './components/PropertyDetail';
import AdminDashboard from './components/AdminDashboard';
import { useEffect } from 'react';

const AppContent = () => {
  const navigate = useNavigate();
  const { resetFilters } = useFilters();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleLogoReset = () => {
    resetFilters();
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Routes>
        <Route path="/" element={
          <>
            <HeroHeader 
              onNavigate={handleNavigate} 
              onLogoClick={handleLogoReset} 
            />
            <div id="results">
              <ListingGrid />
            </div>
            <Footer />
          </>
        } />
        <Route path="/registration" element={<Registration onNavigate={handleNavigate} />} />
        <Route path="/post-ad" element={<PostAd onNavigate={handleNavigate} />} />
        <Route path="/property/:id" element={<PropertyDetail onNavigate={handleNavigate} />} />
        <Route path="/admin" element={<AdminDashboard onBack={() => handleNavigate('/')} />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <FilterProvider>
        <Router>
          <AppContent />
        </Router>
      </FilterProvider>
    </LanguageProvider>
  );
}

export default App;
