import { useLocation } from "react-router";
import { useFetch } from "../hooks/useFetch";

const API_URL = import.meta.env.VITE_API_URL;

export const HomePage = () => {
  const location = useLocation();
  const { data, isLoading, error } = useFetch(`${API_URL}/articles`);

  const articles = data?.data ?? [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-100">Artículos publicados</h1>

      {location.state?.message && (
        <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-emerald-300">
          {location.state.message}
        </p>
      )}

      {isLoading && <p className="mt-6 animate-pulse text-slate-400">Cargando artículos...</p>}

      {error && (
        <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-300">
          {error}
        </p>
      )}

      {!isLoading && !error && articles.length === 0 && (
        <p className="mt-6 text-slate-400">Todavía no hay artículos publicados.</p>
      )}

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-sky-500/60"
          >
            <h2 className="text-lg font-semibold text-slate-100">{article.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{article.excerpt}</p>
            <p className="mt-4 text-xs font-medium text-sky-400">
              Autor: {article.author?.username ?? "Desconocido"}
            </p>

            {article.tags?.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <li
                    key={tag.id}
                    className="rounded-full border border-violet-400/60 px-2.5 py-0.5 text-xs text-violet-300"
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};