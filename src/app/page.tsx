import Hero from "@/app/components/Hero";
import FeaturesSection from "@/app/components/FeaturesSection";
import Walkthrough from "@/app/components/Walkthrough";
import NewsletterSignup from "@/app/components/NewsletterSignup";
import FooterAuthLinks from "@/app/components/FooterAuthLinks";
import SignupModalClientWrapper from "@/app/components/SignupModalClientWrapper";

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
