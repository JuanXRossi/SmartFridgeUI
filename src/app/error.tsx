"use client";
import { useEffect } from "react";

const styles = {
    container: "p-8 text-center",
    title: "text-xl font-semibold",
    message: "mt-2 text-sm text-slate-600",
  };

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Algo salió mal</h2>
      <p className={styles.message}>Por favor, inténtalo más tarde.</p>
    </div>
  );
}
