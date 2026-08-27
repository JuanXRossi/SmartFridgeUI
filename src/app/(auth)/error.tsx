"use client";

export default function AuthError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAF4FB] p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-4">
        <h1 className="text-xl font-bold text-rose-600">Algo salió mal</h1>
        <p className="text-sm text-slate-600">{error.message}</p>
        <button
          onClick={reset}
          className="bg-sky-600 hover:bg-sky-700 text-white rounded-md px-4 py-2 font-medium"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
