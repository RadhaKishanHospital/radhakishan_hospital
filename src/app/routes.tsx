import { createBrowserRouter } from 'react-router';
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/about',
    element: <Layout><About /></Layout>,
  },
  {
    path: '/services',
    element: <Layout><Services /></Layout>,
  },
  {
    path: '/doctors',
    element: <Layout><Doctors /></Layout>,
  },
  {
    path: '/appointments',
    element: <Layout><Appointments /></Layout>,
  },
  {
    path: '/doctor/:id',
    element: <DoctorProfile />,
  },
  {
    path: '/contact',
    element: <Layout><Contact /></Layout>,
  },
  {
    path: '*',
    element: (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4" style={{ fontWeight: 700 }}>404</h1>
            <p className="text-muted-foreground mb-6">Page not found</p>
            <a href="/" className="text-primary hover:underline">Go back home</a>
          </div>
        </div>
      </Layout>
    ),
  },
]);
