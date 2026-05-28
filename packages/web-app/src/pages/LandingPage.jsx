import HeroSection from '@/components/sections/HeroSection.jsx';
import StatsStrip from '@/components/sections/StatsStrip.jsx';
import FeaturesSection from '@/components/sections/FeaturesSection.jsx';
import LearningPathSection from '@/components/sections/LearningPathSection.jsx';
import TopicsPreview from '@/components/sections/TopicsPreview.jsx';
import CtaBanner from '@/components/sections/CtaBanner.jsx';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <FeaturesSection />
      <LearningPathSection />
      <TopicsPreview />
      <CtaBanner />
    </>
  );
}
