import Image from "next/image";

const styles = {
    container: "w-full bg-[var(--color-sky-cream)] py-16",
    section: "mx-auto max-w-xl text-center px-6",
    image: "mx-auto w-40 sm:w-64",
    heading: "mt-6 text-3xl sm:text-4xl font-extrabold text-sky-900",
    paragraph: "mt-3 text-lg text-slate-600",
    buttonWrapper: "mt-6",
    button: "inline-flex items-center justify-center rounded-lg px-6 py-3 bg-lime-400 hover:bg-lime-500 text-slate-900 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-lime-300",
    loginWrapper: "mt-3 text-sm text-slate-500",
    loginLink: "underline",
  };

export default function Hero() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <Image src="/SmartFridgeLogo.png" alt="SmartFridge — gestor inteligente de inventario de cocina" width={256} height={256} className={styles.image} priority />
        <h1 className={styles.heading}>Mantén tu Cocina Abastecida, Sin Esfuerzo</h1>
        <p className={styles.paragraph}>Inventario familiar, listas de compra inteligentes y recordatorios de reabastecimiento.</p>
        <div className={styles.buttonWrapper}>
          <button id="heroSignup" aria-haspopup="dialog" aria-controls="signup-modal" className={styles.button}>Regístrate — es gratis</button>
        </div>
        <p className={styles.loginWrapper}><a href="/auth/login" className={styles.loginLink}>Inicia sesión</a></p>
      </section>
    </div>
  );
}
