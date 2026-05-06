import Image from "next/image";

const styles = {
    container: "w-full bg-[var(--color-sky-cream)] py-16",
    section: "mx-auto max-w-xl text-center px-6",
    image: "mx-auto w-40 sm:w-64",
    heading: "mt-6 text-3xl sm:text-4xl font-extrabold text-sky-900",
    paragraph: "mt-3 text-lg text-slate-600",
    buttonWrapper: "mt-6",
    registerButton: "inline-flex items-center justify-center rounded-lg px-6 py-3 bg-lime-400 hover:bg-lime-500 text-slate-900 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-lime-300",
    loginButton: "-mt-2 inline-flex items-center justify-center rounded-md px-4 py-2 bg-sky-600 hover:bg-sky-700 text-sm text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500",
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
          <button id="heroSignup" aria-haspopup="dialog" aria-controls="signup-modal" className={styles.registerButton}>Regístrate — es gratis</button>
        </div>
        <div className={styles.buttonWrapper}>
          <button id="heroLogin" aria-haspopup="dialog" aria-controls="login-modal" className={styles.loginButton}>Inicia sesión</button>
        </div>
      </section>
    </div>
  );
}
