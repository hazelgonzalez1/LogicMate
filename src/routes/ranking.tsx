import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking y medallas — LogicMate" },
      {
        name: "description",
        content:
          "Consulta tu posición, tus puntos y las medallas que has ganado practicando matemáticas.",
      },
      { property: "og:title", content: "Ranking y medallas — LogicMate" },
      {
        property: "og:description",
        content:
          "Sube posiciones y desbloquea medallas resolviendo ejercicios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ranking,
});

const tabla = [
  { pos: 1, nombre: "Sofía L.", puntos: 2480, medalla: "Oro" },
  { pos: 2, nombre: "Diego M.", puntos: 2310, medalla: "Oro" },
  { pos: 3, nombre: "Ana R.", puntos: 2105, medalla: "Plata" },
  { pos: 4, nombre: "Tú", puntos: 1890, medalla: "Plata" },
  { pos: 5, nombre: "Marco P.", puntos: 1620, medalla: "Bronce" },
  { pos: 6, nombre: "Lucía G.", puntos: 1440, medalla: "Bronce" },
];

const medallas = [
  {
    nombre: "Primer paso",
    desc: "Resolviste tu primer ejercicio",
    ganada: true,
    color: "bg-mint text-mint-foreground",
  },
  {
    nombre: "Racha de 7 días",
    desc: "Practicaste una semana seguida",
    ganada: true,
    color: "bg-sun text-sun-foreground",
  },
  {
    nombre: "Maestro del álgebra",
    desc: "20 ejercicios de álgebra correctos",
    ganada: true,
    color: "bg-primary text-primary-foreground",
  },
  {
    nombre: "Geómetra",
    desc: "Completa el módulo de geometría",
    ganada: false,
    color: "bg-muted text-muted-foreground",
  },
  {
    nombre: "Sin errores",
    desc: "10 ejercicios seguidos sin fallar",
    ganada: false,
    color: "bg-muted text-muted-foreground",
  },
  {
    nombre: "Mentor",
    desc: "Responde 15 dudas en el foro",
    ganada: false,
    color: "bg-muted text-muted-foreground",
  },
];

function Ranking() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-5 py-12">
        <h1 className="text-3xl md:text-4xl">Tu ranking y medallas</h1>

        <section className="card-soft mt-8 grid gap-6 p-6 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Tu posición</p>
            <p className="text-3xl font-bold text-primary">#4</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Puntos</p>
            <p className="text-3xl font-bold text-mint">1,890</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Medallas</p>
            <p className="text-3xl font-bold text-sun">3 / 6</p>
          </div>
          <div className="sm:col-span-3">
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[76%] rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Te faltan 215 puntos para alcanzar el podio.
            </p>
          </div>
        </section>

        <h2 className="mt-12 text-2xl">Tabla de posiciones</h2>
        <ul className="mt-4 space-y-2">
          {tabla.map((r) => (
            <li
              key={r.pos}
              className={`flex items-center gap-4 rounded-2xl border border-border px-5 py-4 ${
                r.nombre === "Tú" ? "bg-secondary" : "bg-card"
              }`}
            >
              <span className="w-8 text-lg font-bold text-primary">
                {r.pos}
              </span>
              <span className="flex-1 font-semibold">{r.nombre}</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                {r.medalla}
              </span>
              <span className="w-20 text-right font-bold">{r.puntos}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl">Medallas</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {medallas.map((m) => (
            <div
              key={m.nombre}
              className={`card-soft p-5 ${m.ganada ? "" : "opacity-60"}`}
            >
              <span
                className={`inline-grid h-11 w-11 place-items-center rounded-full text-lg font-bold ${m.color}`}
              >
                ★
              </span>
              <p className="mt-3 font-bold">{m.nombre}</p>
              <p className="text-sm text-muted-foreground">{m.desc}</p>
              <p className="mt-2 text-xs font-semibold text-primary">
                {m.ganada ? "Conseguida" : "Bloqueada"}
              </p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
