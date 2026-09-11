import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LogicMate — Refuerzo de matemáticas" },
      {
        name: "description",
        content:
          "Practica matemáticas con videos, ejercicios explicados, foro de dudas y medallas por tu progreso.",
      },
      { property: "og:title", content: "LogicMate — Refuerzo de matemáticas" },
      {
        property: "og:description",
        content:
          "Videos, ejercicios, foro y ranking para reforzar matemáticas paso a paso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  {
    title: "Ejercicios y videos",
    text: "Temas explicados en video con práctica guiada y descripciones claras.",
    to: "/ejercicios" as const,
    color: "bg-mint text-mint-foreground",
  },
  {
    title: "Foro de dudas",
    text: "Pregunta, responde y aprende junto a otros estudiantes.",
    to: "/foro" as const,
    color: "bg-coral text-coral-foreground",
  },
  {
    title: "Ranking y medallas",
    text: "Gana puntos, sube de nivel y desbloquea medallas.",
    to: "/ranking" as const,
    color: "bg-sun text-sun-foreground",
  },
];

function BienvenidaConProgreso() {
  const { user } = useAuth();
  const [unidades, setUnidades] = useState
    { id: number; nombre: string; orden: number; total: number; resueltos: number }[]
  >([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function cargar() {
      const { data: unidadesData } = await supabase
        .from("unidades")
        .select("id, nombre, orden, temas(id, ejercicios(id))")
        .order("orden", { ascending: true });

      const { data: progresoData } = await supabase
        .from("progreso")
        .select("ejercicio_id")
        .eq("user_id", user!.id)
        .eq("es_correcta", true);

      const correctosIds = new Set((progresoData ?? []).map((p) => p.ejercicio_id));

      const resultado = (unidadesData ?? []).map((u: any) => {
        const ejerciciosIds = (u.temas ?? []).flatMap((t: any) =>
          (t.ejercicios ?? []).map((e: any) => e.id)
        );
        return {
          id: u.id,
          nombre: u.nombre,
          orden: u.orden,
          total: ejerciciosIds.length,
          resueltos: ejerciciosIds.filter((id: number) => correctosIds.has(id)).length,
        };
      });

      setUnidades(resultado);
      setCargando(false);
    }
    cargar();
  }, [user]);

  if (!user) return null;

  const nombre = (user.user_metadata as any)?.full_name || user.email?.split("@")[0] || "";

  const siguienteUnidad =
    unidades.find((u) => u.total > 0 && u.resueltos < u.total) ?? unidades[0];

  const totalGeneral = unidades.reduce((acc, u) => acc + u.total, 0);
  const resueltosGeneral = unidades.reduce((acc, u) => acc + u.resueltos, 0);
  const porcentaje =
    totalGeneral === 0 ? 0 : Math.round((resueltosGeneral / totalGeneral) * 100);

  return (
    <section className="card-soft mt-8 p-6">
      <h2 className="text-2xl font-bold">
        Bienvenido, <span className="text-primary">{nombre}</span>
      </h2>

      {cargando && <p className="mt-3 text-muted-foreground">Cargando tu progreso...</p>}

      {!cargando && totalGeneral > 0 && (
        <>
          <p className="mt-2 text-sm text-muted-foreground">
            Llevas {resueltosGeneral} de {totalGeneral} ejercicios ({porcentaje}%)
          </p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </>
      )}

      {!cargando && siguienteUnidad && (
        <Link
          to="/unidades/$unidadId"
          params={{ unidadId: String(siguienteUnidad.id) }}
          className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
        >
          Continúa con tu clase: {siguienteUnidad.nombre}
        </Link>
      )}

      {!cargando && !siguienteUnidad && (
        <p className="mt-4 text-sm text-muted-foreground">
          Todavía no hay unidades disponibles.
        </p>
      )}
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <BienvenidaConProgreso />
      <main className="mx-auto max-w-6xl px-5">
        <section className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              Refuerzo escolar de matemáticas
            </span>
            <h1 className="mt-4 text-4xl leading-tight md:text-5xl">
              Las matemáticas se entienden{" "}
              <span className="text-primary">paso</span>{" "}
              <span className="text-mint">a paso</span>
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Aprende con videos cortos, practica con ejercicios resueltos,
              resuelve tus dudas en el foro y gana medallas mientras avanzas.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/ejercicios"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                Empezar a practicar
              </Link>
              <Link
                to="/foro"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Ir al foro
              </Link>
            </div>
          </div>
          <div className="card-soft p-6">
            <p className="text-sm font-semibold text-muted-foreground">
              Ejercicio del día
            </p>
            <p className="mt-3 text-2xl font-bold">Resuelve: 3x + 7 = 25</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-semibold">
              {["x = 4", "x = 6", "x = 8", "x = 9"].map((o, i) => (
                <div
                  key={o}
                  className={`rounded-xl px-4 py-3 ${i === 1 ? "bg-mint text-mint-foreground" : "bg-muted"}`}
                >
                  {o}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Pista: resta 7 en ambos lados y luego divide entre 3.
            </p>
          </div>
        </section>

        <section className="grid gap-5 pb-6 md:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="card-soft block p-6 transition-transform hover:-translate-y-1"
            >
              <span
                className={`inline-block rounded-xl px-3 py-1 text-xs font-bold ${f.color}`}
              >
                {f.title}
              </span>
              <p className="mt-4 text-muted-foreground">{f.text}</p>
            </Link>
          ))}
        </section>

        <section className="my-16 grid gap-5 rounded-3xl bg-secondary p-8 text-center sm:grid-cols-3">
          {[
            ["+120", "ejercicios resueltos"],
            ["40", "videos explicativos"],
            ["15", "medallas por ganar"],
          ].map(([n, t]) => (
            <div key={t}>
              <p className="text-3xl font-bold text-primary">{n}</p>
              <p className="text-sm text-secondary-foreground">{t}</p>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
