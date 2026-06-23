import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CtaSection } from './components/sections/CtaSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { FeedbackSection } from './components/sections/FeedbackSection';
import { HeroSection } from './components/sections/HeroSection';
import { PricingSection } from './components/sections/PricingSection';
import { RoadmapSection } from './components/sections/RoadmapSection';
import { WhySection } from './components/sections/WhySection';
import { CheckoutPage } from './pages/CheckoutPage';
import { BillingPage } from './pages/BillingPage';
import { BillingCancelPage } from './pages/BillingCancelPage';
import { BillingSuccessPage } from './pages/BillingSuccessPage';

export function LandingPage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <HeroSection />
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <WhySection />
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <FeaturesSection />
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <PricingSection />
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <RoadmapSection />
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <FeedbackSection />
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

export function App() {
  const path = normalizePath(window.location.pathname);

  if (path === '/checkout') {
    return <CheckoutPage />;
  }

  if (path === '/billing') {
    return <BillingPage />;
  }

  if (path === '/billing/success') {
    return <BillingSuccessPage />;
  }

  if (path === '/billing/cancel') {
    return <BillingCancelPage />;
  }

  return <LandingPage />;
}
