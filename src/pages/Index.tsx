import { lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/Footer";

// Lazy load sections for performance
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const SkillsSection = lazy(() => import("@/components/sections/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/sections/ProjectsSection"));
const ArticlesSection = lazy(() => import("@/components/sections/ArticlesSection"));
const ProfilesSection = lazy(() => import("@/components/sections/ProfilesSection"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));
const ResumeSection = lazy(() => import("@/components/sections/ResumeSection"));
const SocialLinksSection = lazy(() => import("@/components/sections/SocialLinksSection"));

const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
    />
  </div>
);

const Index = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative min-h-screen bg-background overflow-x-hidden"
      >
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <HeroSection />
          
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <SkillsSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ProjectsSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ArticlesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ProfilesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ResumeSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <SocialLinksSection />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
