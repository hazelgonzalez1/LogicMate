import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/ejercicios", label: "Ejercicios" },
  { to: "/juegos", label: "Juegos" },
  { to: "/foro", label: "Foro" },
  { to: "/ranking", label: "Ranking" },
] as const;

export function SiteNav() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
            L
          </span>
          <span className="text-xl font-bold">
            <span className="text-primary">Logic</span>
            <span className="text-mint">Mate</span>
          </span>
        </Link>
        <ul className="flex flex-wrap items-center gap-1 text-sm font-semibold">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                activeProps={{
                  className: "bg-secondary text-secondary-foreground",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            {user ? (
              <Link
                to="/perfil"
                className="rounded-full bg-primary px-4 py-2 text-primary-foreground"
                activeProps={{ className: "bg-primary" }}
              >
                Mi perfil
              </Link>
            ) : (
              <Link
                to="/auth"
                className="rounded-full bg-primary px-4 py-2 text-primary-foreground"
              >
                Registrarse
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/70 py-8 text-center text-sm text-muted-foreground">
      LogicMate · Refuerzo de matemáticas para todos
    </footer>
  );
}
