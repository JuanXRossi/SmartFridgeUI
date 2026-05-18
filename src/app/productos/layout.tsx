import React from "react";
import '../globals.css'

const styles = {
    body: "min-h-screen bg-slate-50 text-slate-800",
  };

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={styles.body}>
        <main>{children}</main>
      </body>
    </html>
  );
}
