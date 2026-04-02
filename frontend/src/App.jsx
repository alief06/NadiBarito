import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Toaster } from 'sonner';
import SplashScreen from './components/SplashScreen';

// Lazy loading components
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const PlaceDetail = lazy(() => import('./pages/PlaceDetail'));
const Culinary = lazy(() => import('./pages/Culinary'));
const CulinaryDetail = lazy(() => import('./pages/CulinaryDetail'));
const InteractiveMap = lazy(() => import('./pages/InteractiveMap'));
const SmartPlanner = lazy(() => import('./pages/SmartPlanner'));
const NotFound = lazy(() => import('./pages/NotFound'));

const History = lazy(() => import('./pages/History'));
const Culture = lazy(() => import('./pages/Culture'));
const ModernKalsel = lazy(() => import('./pages/ModernKalsel'));
const AdminCommandCenter = lazy(() => import('./pages/AdminCommandCenter'));

const MainLayout = lazy(() => import('./components/MainLayout'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#050505] text-brand-orange">
    <Loader2 className="animate-spin" size={48} />
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  return (
    <>
      <Toaster 
        position="top-right" 
        richColors 
        expand={false} 
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(20, 20, 20, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          },
        }}
      />
      
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" finishLoading={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <Suspense fallback={<LoadingFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Main Application with Navbar and Footer */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="history" element={<History />} />
            <Route path="culture" element={<Culture />} />
            <Route path="modern" element={<ModernKalsel />} />
            <Route path="place/:id" element={<PlaceDetail />} />
            <Route path="culinary" element={<Culinary />} />
            <Route path="culinary/:id" element={<CulinaryDetail />} />
            <Route path="map" element={<InteractiveMap />} />
            <Route path="planner" element={<SmartPlanner />} />
          </Route>

          {/* Hidden Admin Command Center - No Layout, Direct Secret Route */}
          <Route path="/nadibarito-command-v1-9922" element={<AdminCommandCenter />} />

          {/* Standalone Pages (No Navbar/Footer) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      </Suspense>
    </>
  );
}

export default App;
