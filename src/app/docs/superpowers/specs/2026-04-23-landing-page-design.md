Title: SmartFridge Landing Page — Hero + Signup Modal
Date: 2026-04-23
Author: OpenCode
Status: Approved by product owner

Overview
- Friendly, playful landing page to showcase SmartFridge features and surface Login/Register.
- Primary visual: public/SmartFridgeLogo.png used as the centered hero mark.
- Hero CTA opens a centered compact signup modal (fields: Username, Email, Password, Name, Terms checkbox — all required).
- On successful signup the user remains on landing and sees a verification/welcome banner instructing them to check email.

Goals / Success Criteria
- Clear value proposition: “Keep Your Kitchen Stocked, Effortlessly”
- Fast conversion: signup modal reduces friction
- Accessibility and mobile-first responsive design
- Server-side registration via Next.js Route Handler → ASP.NET backend (axios client). No tokens or secrets exposed client-side.

Sections
1. Header — small header with logo (left) and Login/Register links (right)
2. Hero — centered logo, headline (h1), subhead, CTA “Sign up — it’s free”
3. Features — 3 cards (Smart Inventory / Auto Shopping Lists / Family Sharing)
4. How It Works — 3-step walkthrough
5. Newsletter Signup — compact email capture
6. Footer — small logo, Login/Register/Docs/Support links

Hero & Modal (interaction)
- Hero layout: single-column, centered, max-w-xl, logo responsive (w-40 mobile -> w-64 desktop).
- CTA: aria-haspopup="dialog", aria-controls="signup-modal".
- Modal: centered compact card, max-width 520px, focus-trap, Esc/backdrop dismiss, returns focus to CTA when closed.
- Modal fields (all required): Username, Email, Password, Name, Terms checkbox.
- On success: show banner in hero: "Thanks — check your email to verify your account" with dismiss (session-only).

API Contract (example)
- Client -> Next.js route: POST /api/account/register
  Request body:
  {
    "username":"jdoe",
    "email":"jdoe@example.com",
    "password":"Secret123!",
    "name":"John Doe",
    "termsAccepted": true
  }
- Route handler uses /lib/api/client.ts to contact the ASP.NET backend register endpoint.
- Route handler response to client: { success: boolean, message?: string, fieldErrors?: Record<string,string> } with appropriate HTTP status codes.

Accessibility
- Modal: role="dialog", aria-modal="true", aria-labelledby, focus trap, initial focus on first input.
- Inputs: labels and aria-describedby for errors; aria-invalid for invalid states.
- Buttons: visible focus states; contrast at least AA.
- Images: <img alt="SmartFridge — intelligent kitchen stock manager">

Styling / Tokens
- Use logo colors: primary blue (tailwind-sky-600 / text-sky-900), accent green (tailwind-lime-400 / lime-500 hover).
- Tailwind utilities and project tokens — no inline CSS.

File List (planned)
- app/landing/{layout.tsx,layoutClient.tsx,page.tsx,loading.tsx,error.tsx}
- app/api/account/register/route.ts
- src/components/{Hero.tsx,SignupModal.tsx,ui/Modal.tsx,FeatureCard.tsx,FeaturesSection.tsx,Walkthrough.tsx,NewsletterSignup.tsx,FooterAuthLinks.tsx,SignupModalClientWrapper.tsx}
- types/api/auth.ts

Tests & QA
- Unit tests (Jest + React Testing Library): Hero renders logo + CTA; SignupModal opens/closes, validates required fields, and handles mock responses; Route handler mapping of backend errors.
- Accessibility tests: axe (modal + inputs)
- Manual QA checklist included in spec

Estimate
- Spec & mockup: 0.5 day
- Implementation: 3–4 days (components, modal, route handler)
- Tests + QA + preview deploy: 0.5–1 day
