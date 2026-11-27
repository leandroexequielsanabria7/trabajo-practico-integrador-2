import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

const API_URL = import.meta.env.VITE_API_URL;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });
  const { username, password } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLogged", "true");
        navigate("/home", {
          replace: true,
          state: { message: "¡Sesión iniciada con éxito!" },
        });
        return;
      }

      if (response.status === 400) {
        // express-validator con errors.mapped() → { campo: { msg, path, ... } }
        setValidationErrors(Object.values(data.errors ?? {}));
      } else if (response.status === 401) {
        setError(data.message ?? "Usuario o contraseña incorrectos.");
      } else if (response.status === 403) {
        setError("No tenés permisos para ingresar.");
      } else {
        setError("Ocurrió un error en el servidor. Intentá más tarde.");
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-slate-100">Iniciar sesión</h1>

        {location.state?.message && (
          <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            {location.state.message}
          </p>
        )}

        <label className="mt-5 block text-sm text-slate-300" htmlFor="username">
          Usuario
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={handleInputChange}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-sky-400"
          autoComplete="username"
          required
        />

        <label className="mt-4 block text-sm text-slate-300" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleInputChange}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-sky-400"
          autoComplete="current-password"
          required
        />

        {error && <p className="mt-4 text-sm font-medium text-red-400">{error}</p>}

        {validationErrors.length > 0 && (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-400">
            {validationErrors.map((err) => (
              <li key={err.path}>{err.msg}</li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full rounded-lg bg-sky-500 py-2 font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-50"
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="mt-4 text-center text-sm text-slate-400">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-sky-400 hover:underline">
            Registrate
          </Link>
        </p>
      </form>
    </main>
  );
};