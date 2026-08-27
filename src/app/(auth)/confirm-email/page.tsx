"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const styles = {
  container: "min-h-screen flex items-center justify-center bg-[#EAF4FB] p-4",
  card: "bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-4",
  title: "text-xl font-bold text-[#2E7DA6]",
  message: "text-sm text-slate-600",
  successMessage: "text-sm text-emerald-600 font-medium",
  errorMessage: "text-sm text-rose-600 font-medium",
  link: "text-sky-600 hover:underline font-medium",
  spinner: "mx-auto h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin",
};

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    if (!userId || !token) {
      setTimeout(() => {
        setStatus("error");
        setMessage("Enlace de confirmación inválido o incompleto.");
      }, 0);
      return;
    }

    fetch("/api/account/confirm-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message ?? "Correo confirmado correctamente.");
          setTimeout(() => router.replace("/"), 3000);
        } else {
          setStatus("error");
          setMessage(data.message ?? "No pudimos confirmar tu correo.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Error de red. Por favor, inténtalo más tarde.");
      });
  }, [searchParams, router]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Confirmación de correo</h1>

        {status === "loading" && (
          <>
            <div className={styles.spinner} />
            <p className={styles.message}>Confirmando tu correo...</p>
          </>
        )}

        {status === "success" && (
          <>
            <p className={styles.successMessage}>{message}</p>
            <p className={styles.message}>
              Serás redirigido en unos segundos...{" "}
              <Link href="/" className={styles.link}>
                Ir ahora
              </Link>
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <p className={styles.errorMessage}>{message}</p>
            <Link href="/" className={styles.link}>
              Volver al inicio
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
