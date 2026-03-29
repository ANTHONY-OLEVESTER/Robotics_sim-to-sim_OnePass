import { NavLink } from "react-router-dom";
import { repoUrl } from "../data/siteContent";

const links = [
  { to: "/", label: "Showcase" },
  { to: "/results", label: "Results" },
  { to: "/docs", label: "Docs" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl border border-cyan/30 bg-cyan/10 p-2 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan">
            S2S
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-paper">
              Sim2Sim-OnePass
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-steel">
              Public research showcase
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-white/10 text-paper"
                    : "text-steel hover:bg-white/5 hover:text-paper"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-paper transition hover:border-cyan/50 hover:bg-cyan/10"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
