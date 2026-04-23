export default function FooterAuthLinks() {
  return (
    <footer className="border-t mt-12 py-6">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="text-sm text-slate-500">© {new Date().getFullYear()} SmartFridge</div>
        <nav className="space-x-4 text-sm">
          <a href="/auth/login" className="text-slate-600">Login</a>
          <a href="/auth/register" className="text-slate-600">Register</a>
          <a href="/docs" className="text-slate-600">Docs</a>
          <a href="/support" className="text-slate-600">Support</a>
        </nav>
      </div>
    </footer>
  );
}
