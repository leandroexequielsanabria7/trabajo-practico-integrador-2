import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const { formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });
  const { username, password } = formState;

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-slate-100">Iniciar sesión</h1>

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

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-sky-500 py-2 font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-50"
        >
          Ingresar
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