import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import App from './App.tsx'
import BlogListingPage from './pages/BlogListingPage.tsx'
import BlogDetailPage from './pages/BlogDetailPage.tsx'
import './index.css'

// Track page views in Google Analytics
const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-NL4NXKB24B', {
      page_path: path,
    });
  }
};

// Component to track route changes
const PageViewTracker = () => {
  const location = useLocation();

  React.useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogListingPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
