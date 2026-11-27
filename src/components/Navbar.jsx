import { Link } from "react-router";

export const Navbar = () => {
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
            className="rounded-full border border-pink-500 px-4 py-1.5 text-sm font-semibold text-pink-400 hover:bg-pink-500/10 disabled:opacity-50"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};