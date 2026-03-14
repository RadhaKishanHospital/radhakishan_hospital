import { useEffect } from 'react';
import { createBrowserRouter, useLocation } from 'react-router';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Doctors } from './pages/Doctors';
import DoctorProfile from './pages/DoctorProfile';
import { Appointments } from './pages/Appointments';
import { Contact } from './pages/Contact';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function WithScroll({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WithScroll><Layout><Home /></Layout></WithScroll>,
  },
  {
    path: '/about',
    element: <WithScroll><Layout><About /></Layout></WithScroll>,
  },
  {
    path: '/services',
    element: <WithScroll><Layout><Services /></Layout></WithScroll>,
  },
  {
    path: '/doctors',
    element: <WithScroll><Layout><Doctors /></Layout></WithScroll>,
  },
  {
    path: '/appointments',
    element: <WithScroll><Layout><Appointments /></Layout></WithScroll>,
  },
  {
    path: '/doctor/:id',
    element: <WithScroll><DoctorProfile /></WithScroll>,
  },
  {
    path: '/contact',
    element: <WithScroll><Layout><Contact /></Layout></WithScroll>,
  },
  {
    path: '*',
    element: (
      <WithScroll>
        <Layout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl mb-4" style={{ fontWeight: 700 }}>404</h1>
              <p className="text-muted-foreground mb-6">Page not found</p>
              <a href="/" className="text-primary hover:underline">Go back home</a>
            </div>
          </div>
      </Layout>
      </WithScroll>
    ),
  },
]);
