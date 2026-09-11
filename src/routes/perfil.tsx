import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/perfil")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mi perfil — LogicMate" },
      {
        name: "description",
        content:
          "Edita tu foto, tu nombre y tu descripción, y revisa tu progreso en LogicMate.",
      },
      { property: "og:title", content: "Mi perfil — LogicMate" },
      {
        property: "og:description",
        content: "Tu perfil personal en LogicMate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("nombre, avatar_url, bio")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setNombre(data.nombre ?? "");
          setAvatarUrl(data.avatar_url ?? "");
          setBio(data.bio ?? "");
        }
      });
  }, [user]);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setGuardando(true);
    setMsg(null);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      nombre,
      avatar_url: avatarUrl || null,
      bio: bio || null,
      updated_at: new Date().toISOString(),
    });
    setGuardando(false);
    setMsg(error ? "No se pudo guardar." : "¡Perfil actualizado!");
  }

  async function salir() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <p className="mx-auto max-w-md px-5 py-20 text-center text-muted-foreground">
          Cargando…
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <main className="mx-auto max-w-md px-5 py-20 text-center">
          <h1 className="text-2xl">Tu perfil personal</h1>
          <p className="mt-2 text-muted-foreground">
            Inicia sesión o regístrate para tener tu foto, tu nombre y guardar
            tu progreso.
          </p>
          <Link
            to="/auth"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Registrarse / Iniciar sesión
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const inicial = (nombre || user.email || "?").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-2xl px-5 py-12">
        <h1 className="text-3xl">Mi perfil</h1>

        <section className="card-soft mt-8 flex flex-wrap items-center gap-5 p-6">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`Foto de ${nombre}`}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {inicial}
            </span>
          )}
          <div>
            <p className="text-xl font-bold">{nombre || "Sin nombre"}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {bio && <p className="mt-1 text-sm">{bio}</p>}
          </div>
        </section>

        <form onSubmit={guardar} className="card-soft mt-6 space-y-3 p-6">
          <label className="block text-sm font-semibold">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <label className="block text-sm font-semibold">
            Enlace de tu foto
          </label>
          <input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://…"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <label className="block text-sm font-semibold">Sobre mí</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Cuéntanos qué te gusta de las matemáticas"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={guardando}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={salir}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
            >
              Cerrar sesión
            </button>
            {msg && (
              <span className="text-sm font-semibold text-mint">{msg}</span>
            )}
          </div>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
