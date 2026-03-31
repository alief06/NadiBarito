import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Lazy loading components
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const PlaceDetail = lazy(() => import('./pages/PlaceDetail'));
const Culinary = lazy(() => import('./pages/Culinary'));
const CulinaryDetail = lazy(() => import('./pages/CulinaryDetail'));
const InteractiveMap = lazy(() => import('./pages/InteractiveMap'));
const SmartPlanner = lazy(() => import('./pages/SmartPlanner'));
const Auth = lazy(() => import('./pages/Auth'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const Profile = lazy(() => import('./pages/Profile'));

const History = lazy(() => import('./pages/History'));
const Culture = lazy(() => import('./pages/Culture'));
const ModernKalsel = lazy(() => import('./pages/ModernKalsel'));

const MainLayout = lazy(() => import('./components/MainLayout'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminPlaces = lazy(() => import('./pages/admin/AdminPlaces'));
const AdminCulinary = lazy(() => import('./pages/admin/AdminCulinary'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'));
const AdminEvents = lazy(() => import('./pages/admin/AdminEvents'));
const AdminCulture = lazy(() => import('./pages/admin/AdminCulture'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-heritage-cream dark:bg-heritage-dark text-heritage-gold">
    <Loader2 className="animate-spin" size={48} />
  </div>
);

function App() {
  const location = useLocation();

  return (
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
            <Route path="user/itinerary" element={<UserDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Auth mode="login" />} />
            <Route path="register" element={<Auth mode="register" />} />
          </Route>

          {/* Admin Section (Protected) */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="places" element={<AdminPlaces />} />
              <Route path="culinary" element={<AdminCulinary />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="culture" element={<AdminCulture />} />
            </Route>
          </Route>

          {/* Standalone Pages (No Navbar/Footer) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
