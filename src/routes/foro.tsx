import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";

export const Route = createFileRoute("/foro")({
  head: () => ({
    meta: [
      { title: "Foro de dudas — LogicMate" },
      {
        name: "description",
        content:
          "Publica tus dudas de matemáticas y ayuda a otros estudiantes en el foro de LogicMate.",
      },
      { property: "og:title", content: "Foro de dudas — LogicMate" },
      {
        property: "og:description",
        content:
          "Comparte preguntas y respuestas de matemáticas con la comunidad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Foro,
});

type Post = {
  id: number;
  autor: string;
  tema: string;
  titulo: string;
  cuerpo: string;
  respuestas: number;
};

const iniciales: Post[] = [
  {
    id: 1,
    autor: "Ana R.",
    tema: "Álgebra",
    titulo: "¿Cómo factorizo x² - 9?",
    cuerpo: "Sé que da algo con paréntesis pero no entiendo el procedimiento.",
    respuestas: 4,
  },
  {
    id: 2,
    autor: "Diego M.",
    tema: "Geometría",
    titulo: "Área de un triángulo con coordenadas",
    cuerpo: "Tengo tres puntos en el plano, ¿hay una fórmula directa?",
    respuestas: 2,
  },
  {
    id: 3,
    autor: "Sofía L.",
    tema: "Fracciones",
    titulo: "Suma de fracciones con distinto denominador",
    cuerpo: "¿Siempre hay que buscar el mínimo común múltiplo?",
    respuestas: 7,
  },
];

const temas = ["Álgebra", "Geometría", "Fracciones", "Trigonometría"];

function Foro() {
  const [posts, setPosts] = useState(iniciales);
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [tema, setTema] = useState<string>("Álgebra");
  const [filtro, setFiltro] = useState<string | null>(null);

  const visibles = filtro ? posts.filter((p) => p.tema === filtro) : posts;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-5 py-12">
        <h1 className="text-3xl md:text-4xl">Foro de dudas</h1>
        <p className="mt-2 text-muted-foreground">
          Pregunta lo que no entiendas y ayuda a quien lo necesite.
        </p>

        <form
          className="card-soft mt-8 space-y-3 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!titulo.trim()) return;
            setPosts([
              {
                id: Date.now(),
                autor: "Tú",
                tema,
                titulo,
                cuerpo,
                respuestas: 0,
              },
              ...posts,
            ]);
            setTitulo("");
            setCuerpo("");
          }}
        >
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Escribe tu pregunta"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            value={cuerpo}
            onChange={(e) => setCuerpo(e.target.value)}
            placeholder="Cuenta más detalles (opcional)"
            rows={3}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="rounded-xl border border-input bg-background px-4 py-2 text-sm font-semibold"
            >
              {temas.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Publicar
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap gap-2 text-sm font-semibold">
          <button
            onClick={() => setFiltro(null)}
            className={`rounded-full px-4 py-2 ${!filtro ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Todos
          </button>
          {temas.map((t) => (
            <button
              key={t}
              onClick={() => setFiltro(t)}
              className={`rounded-full px-4 py-2 ${filtro === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <ul className="mt-6 space-y-4">
          {visibles.map((p) => (
            <li key={p.id} className="card-soft p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">
                  {p.tema}
                </span>
                <span className="text-muted-foreground">por {p.autor}</span>
              </div>
              <h2 className="mt-3 text-lg font-bold">{p.titulo}</h2>
              {p.cuerpo && (
                <p className="mt-1 text-sm text-muted-foreground">{p.cuerpo}</p>
              )}
              <p className="mt-3 text-sm font-semibold text-primary">
                {p.respuestas} respuestas
              </p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
