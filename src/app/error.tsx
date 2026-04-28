"use client";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-semibold">Algo salió mal</h2>
      <p className="mt-2 text-sm text-slate-600">Por favor, inténtalo más tarde.</p>
    </div>
  );
}
