import React from "react";
import './globals.css'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800">
        <main>{children}</main>
      </body>
    </html>
  );
}
