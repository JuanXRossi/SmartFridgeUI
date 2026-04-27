import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import Walkthrough from "@/components/Walkthrough";
import NewsletterSignup from "@/components/NewsletterSignup";
import FooterAuthLinks from "@/components/FooterAuthLinks";
import SignupModalClientWrapper from "@/components/SignupModalClientWrapper";

export default function Page() {
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
