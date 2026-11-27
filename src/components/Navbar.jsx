import { useState } from "react";
import { Link, useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok || response.status === 401) {
        localStorage.removeItem("isLogged");
        navigate("/login", {
          replace: true,
          state: { message: "Cerraste sesión correctamente." },
        });
        return;
      }

      setError("No se pudo cerrar la sesión. Intentá de nuevo.");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/home" className="text-lg font-bold text-sky-400 hover:text-sky-300">
          Blog Personal
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/home"
            className="rounded-full border border-slate-700 px-4 py-1.5 text-sm text-slate-200 hover:border-sky-400"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="rounded-full border border-pink-500 px-4 py-1.5 text-sm font-semibold text-pink-400 hover:bg-pink-500/10 disabled:opacity-50"
          >
            {isLoading ? "Saliendo..." : "Logout"}
          </button>
        </div>
      </nav>

      {error && (
        <p className="bg-red-500/10 px-4 py-2 text-center text-sm text-red-400">{error}</p>
      )}
    </header>
  );
};