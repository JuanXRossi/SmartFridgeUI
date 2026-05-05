const styles = {
    footer: "w-full bg-[var(--color-footer-blue)] py-4 text-white",
    container: "max-w-6xl mx-auto px-6 flex items-center justify-between",
    copyright: "text-sm text-white",
    nav: "space-x-4 text-sm",
    navLink: "text-white hover:text-slate-100 hover:underline",
  };

export default function FooterAuthLinks() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>© {new Date().getFullYear()} SmartFridge</div>
        <nav className={styles.nav}>
          <a href="/auth/login" className={styles.navLink}>Inicia sesión</a>
          <a href="/auth/register" className={styles.navLink}>Regístrate</a>
          <a href="/docs" className={styles.navLink}>Documentación</a>
          <a href="/support" className={styles.navLink}>Soporte</a>
        </nav>
      </div>
    </footer>
  );
}
