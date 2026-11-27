import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

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
  const { formState, handleInputChange } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    biography: "",
    avatar_url: "",
    birth_date: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    
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

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-emerald-500 py-2 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
        >
          Registrarme
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