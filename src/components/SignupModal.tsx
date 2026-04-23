"use client";
import { useState } from "react";
import Modal from "./ui/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // used to show verification banner
}

export default function SignupModal({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({ username: "", email: "", password: "", name: "", terms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
    setGlobalError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setGlobalError(null);

    const fieldErrors: Record<string, string> = {};
    if (!form.username.trim()) fieldErrors.username = "Required";
    if (!form.email.includes("@")) fieldErrors.email = "Invalid email";
    if (form.password.length < 8) fieldErrors.password = "At least 8 characters";
    if (!form.name.trim()) fieldErrors.name = "Required";
    if (!form.terms) fieldErrors.terms = "You must accept the Terms";

    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch("/api/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          name: form.name,
          termsAccepted: true,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        if (data?.fieldErrors) {
          setErrors(data.fieldErrors);
        } else {
          setGlobalError(data?.message ?? "Registration failed");
        }
        return;
      }
      onClose();
      onSuccess();
    } catch (err) {
      setGlobalError("Network error. Please try later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Create your SmartFridge account" id="signup-modal">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Username</label>
          <input value={form.username} onChange={(e) => update("username", e.target.value)} className={`mt-1 block w-full rounded-md border p-2 ${errors.username ? "border-rose-500" : "border-slate-200"}`} />
          {errors.username && <p className="mt-1 text-xs text-rose-600" role="alert">{errors.username}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={`mt-1 block w-full rounded-md border p-2 ${errors.email ? "border-rose-500" : "border-slate-200"}`} />
          {errors.email && <p className="mt-1 text-xs text-rose-600" role="alert">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className={`mt-1 block w-full rounded-md border p-2 ${errors.password ? "border-rose-500" : "border-slate-200"}`} />
          <p className="mt-1 text-xs text-slate-400">Use 8+ characters with letters and numbers.</p>
          {errors.password && <p className="mt-1 text-xs text-rose-600" role="alert">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className={`mt-1 block w-full rounded-md border p-2 ${errors.name ? "border-rose-500" : "border-slate-200"}`} />
          {errors.name && <p className="mt-1 text-xs text-rose-600" role="alert">{errors.name}</p>}
        </div>

        <div className="flex items-start gap-3">
          <input id="terms" type="checkbox" checked={form.terms} onChange={(e) => update("terms", e.target.checked)} className="h-4 w-4 rounded text-lime-500 focus:ring-lime-300" />
          <label htmlFor="terms" className="text-sm text-slate-700">I agree to the <a className="text-sky-600 underline" href="#">Terms of Service</a> and <a className="text-sky-600 underline" href="#">Privacy Policy</a>.</label>
        </div>
        {errors.terms && <p className="mt-1 text-xs text-rose-600" role="alert">{errors.terms}</p>}

        {globalError && <p className="text-sm text-rose-600" role="alert">{globalError}</p>}

        <div className="flex gap-2 mt-4">
          <button type="submit" disabled={loading} className="flex-1 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-md py-2 font-medium disabled:opacity-60">
            {loading ? "Creating..." : "Create account"}
          </button>
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-slate-700">Cancel</button>
        </div>
      </form>
    </Modal>
  );
}
