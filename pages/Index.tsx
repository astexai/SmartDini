"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimations from "@/components/ScrollAnimations";

const HomePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle hash-based scrolling in Next.js
    const hash = window.location.hash;
    
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          });
        }, 100);
      }
    }
  }, [pathname, searchParams]); // Re-run when URL changes

  // Handle direct navigation to sections
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollAnimations />
      <Header />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="benefits">
          <Benefits />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;