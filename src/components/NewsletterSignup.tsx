"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <div className="w-full bg-[var(--color-lime-cream)] py-16">
      <section className="max-w-4xl mx-auto px-6">
      <form onSubmit={submit} className="flex gap-2">
        <input required type="email" placeholder="you@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 rounded-md border p-2" />
        <button className="bg-sky-600 text-white rounded-md px-4 py-2">Subscribe</button>
      </form>
      {sent && <p className="mt-2 text-sm text-slate-600">Thanks — you'll get updates monthly.</p>}
      </section>
    </div>
  );
}
