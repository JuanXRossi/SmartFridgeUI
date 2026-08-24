import React from "react";
import './globals.css'
import LayoutClient from "./layoutClient";

const styles = {
    body: "min-h-screen bg-slate-50 text-slate-800",
  };

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={styles.body}>
        <LayoutClient>
          <main>{children}</main>
        </LayoutClient>
      </body>
    </html>
  );
}
