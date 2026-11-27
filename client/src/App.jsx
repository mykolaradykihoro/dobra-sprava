import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import CampaignDetails from './pages/CampaignDetails.jsx';
import Contacts from './pages/Contacts.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('dobra-theme') || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('dobra-theme', theme);
  }, [theme]);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const title = path === '/' ? 'Добра Справа — волонтерські ініціативи' : path === '/catalog' ? 'Каталог зборів — Добра Справа' : path === '/contacts' ? 'Контакти — Добра Справа' : path.startsWith('/items/') ? 'Деталі збору — Добра Справа' : 'Сторінку не знайдено — Добра Справа';
    document.title = title;
  }, [location.pathname]);
  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light');

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/items/:id" element={<CampaignDetails />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
