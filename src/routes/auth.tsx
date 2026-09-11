import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Registrarse o iniciar sesión — LogicMate" },
      {
        name: "description",
        content:
          "Crea tu cuenta de LogicMate para guardar tu progreso, tus medallas y tu perfil.",
      },
      {
        property: "og:title",
        content: "Registrarse o iniciar sesión — LogicMate",
      },
      {
        property: "og:description",
        content: "Accede a tu cuenta de LogicMate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [modo, setModo] = useState<"login" | "signup">("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (session) navigate({ to: "/perfil", replace: true });
  }, [session, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setCargando(true);
    if (modo === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin, data: { nombre } },
      });
      setCargando(false);
      if (error) return setMsg(error.message);
      if (!data.session)
        return setMsg("Revisa tu correo para confirmar tu cuenta.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setCargando(false);
      if (error) return setMsg("Correo o contraseña incorrectos.");
    }
  }

  async function conGoogle() {
    setMsg(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) setMsg("No se pudo iniciar sesión con Google.");
  }

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-md px-5 py-16">
        <div className="card-soft p-7">
          <h1 className="text-2xl">
            {modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Guarda tu progreso, tus medallas y tu perfil.
          </p>

          <button
            onClick={conGoogle}
            className="mt-6 w-full rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Continuar con Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> o con tu correo{" "}
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {modo === "signup" && (
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                required
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              minLength={6}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={cargando}
              className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {modo === "login" ? "Entrar" : "Registrarme"}
            </button>
          </form>

          {msg && (
            <p className="mt-4 text-sm font-semibold text-coral">{msg}</p>
          )}

          <button
            onClick={() => setModo(modo === "login" ? "signup" : "login")}
            className="mt-5 text-sm font-semibold text-primary"
          >
            {modo === "login"
              ? "No tengo cuenta, registrarme"
              : "Ya tengo cuenta, iniciar sesión"}
          </button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
