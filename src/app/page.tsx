import Hero from "@/app/components/Hero";
import FeaturesSection from "@/app/components/FeaturesSection";
import Walkthrough from "@/app/components/Walkthrough";
import NewsletterSignup from "@/app/components/NewsletterSignup";
import FooterAuthLinks from "@/app/components/FooterAuthLinks";
import SignupModalClientWrapper from "@/app/components/SignupModalClientWrapper";
import LoginModalClientWrapper from "./components/LoginModalClientWrapper";

export default function Page() {
  return (
    <SignupModalClientWrapper>
      <LoginModalClientWrapper>
        <Hero />
        <FeaturesSection />
        <Walkthrough />
        <NewsletterSignup />
        <FooterAuthLinks />
      </LoginModalClientWrapper>
    </SignupModalClientWrapper>
  );
}
