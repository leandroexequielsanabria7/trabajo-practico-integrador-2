import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

const API_URL = import.meta.env.VITE_API_URL;

const fields = [
  { name: "username", label: "Usuario", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Contraseña", type: "password" },
  { name: "first_name", label: "Nombre", type: "text" },
  { name: "last_name", label: "Apellido", type: "text" },
  { name: "avatar_url", label: "URL del avatar (opcional)", type: "url" },
  { name: "birth_date", label: "Fecha de nacimiento (opcional)", type: "date" },
];

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { formState, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    biography: "",
    avatar_url: "",
    birth_date: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        handleReset();
        navigate("/login", {
          state: { message: "Registro exitoso. Ya podés iniciar sesión." },
        });
        return;
      }

      if (response.status === 400) {
        // express-validator con errors.mapped() → { campo: { msg, path, ... } }
        setValidationErrors(Object.values(data.errors ?? {}));
      } else if (response.status === 403) {
        setError("No tenés permisos para realizar esta acción.");
      } else if (response.status >= 500) {
        setError("Ocurrió un error en el servidor. Intentá más tarde.");
      } else {
        setError(data.message ?? "No se pudo completar el registro.");
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-slate-100">Crear cuenta</h1>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm text-slate-300" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formState[field.name]}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
              />
            </div>
          ))}
        </div>

        <label className="mt-4 block text-sm text-slate-300" htmlFor="biography">
          Biografía (opcional)
        </label>
        <textarea
          id="biography"
          name="biography"
          rows="3"
          value={formState.biography}
          onChange={handleInputChange}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
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
          className="mt-6 w-full rounded-lg bg-emerald-500 py-2 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
        >
          {isLoading ? "Registrando..." : "Registrarme"}
        </button>

        <p className="mt-4 text-center text-sm text-slate-400">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </form>
    </main>
  );
};