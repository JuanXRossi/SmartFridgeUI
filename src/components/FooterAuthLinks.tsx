export default function FooterAuthLinks() {
  return (
    <footer className="w-full bg-[var(--color-footer-blue)] py-16 text-white">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="text-sm text-white">© {new Date().getFullYear()} SmartFridge</div>
        <nav className="space-x-4 text-sm">
          <a href="/auth/login" className="text-white hover:text-slate-100 hover:underline">Login</a>
          <a href="/auth/register" className="text-white hover:text-slate-100 hover:underline">Register</a>
          <a href="/docs" className="text-white hover:text-slate-100 hover:underline">Docs</a>
          <a href="/support" className="text-white hover:text-slate-100 hover:underline">Support</a>
        </nav>
      </div>
    </footer>
  );
}
