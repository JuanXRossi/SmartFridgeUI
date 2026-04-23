import Hero from "src/components/Hero";
import FeaturesSection from "src/components/FeaturesSection";
import Walkthrough from "src/components/Walkthrough";
import NewsletterSignup from "src/components/NewsletterSignup";
import FooterAuthLinks from "src/components/FooterAuthLinks";
import SignupModalClientWrapper from "src/components/SignupModalClientWrapper";

export default function Home() {
  return (
    <SignupModalClientWrapper>
      <Hero />
      <FeaturesSection />
      <Walkthrough />
      <NewsletterSignup />
      <FooterAuthLinks />
    </SignupModalClientWrapper>
  );
}
