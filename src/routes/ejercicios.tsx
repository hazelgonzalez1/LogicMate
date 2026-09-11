import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";

export const Route = createFileRoute("/ejercicios")({
  head: () => ({
    meta: [
      { title: "Ejercicios y videos — LogicMate" },
      {
        name: "description",
        content:
          "Refuerza matemáticas con videos explicativos, descripciones y ejercicios de práctica por tema.",
      },
      { property: "og:title", content: "Ejercicios y videos — LogicMate" },
      {
        property: "og:description",
        content:
          "Videos y ejercicios de álgebra, geometría, fracciones y trigonometría.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ejercicios,
});

type Leccion = {
  tema: string;
  titulo: string;
  duracion: string;
  nivel: string;
  descripcion: string;
  video: string;
  practica: string;
};

const lecciones: Leccion[] = [
  {
    tema: "Álgebra",
    titulo: "Ecuaciones de primer grado",
    duracion: "8 min",
    nivel: "Básico",
    descripcion:
      "Aprende a despejar la incógnita paso a paso usando operaciones inversas en ambos lados de la igualdad.",
    video: "https://www.youtube.com/embed/l3XAFhoJTGE",
    practica: "Resuelve: 5x - 12 = 23",
  },
  {
    tema: "Álgebra",
    titulo: "Factorización de diferencia de cuadrados",
    duracion: "6 min",
    nivel: "Intermedio",
    descripcion:
      "Identifica expresiones del tipo a² - b² y descomponlas en (a + b)(a - b) con ejemplos guiados.",
    video: "https://www.youtube.com/embed/nZuHqKJZ4jU",
    practica: "Factoriza: x² - 49",
  },
  {
    tema: "Geometría",
    titulo: "Teorema de Pitágoras",
    duracion: "10 min",
    nivel: "Básico",
    descripcion:
      "Relaciona los catetos y la hipotenusa de un triángulo rectángulo y aplícalo a problemas reales.",
    video: "https://www.youtube.com/embed/AA6RfgP-AHU",
    practica: "Catetos 6 y 8, ¿cuánto mide la hipotenusa?",
  },
  {
    tema: "Fracciones",
    titulo: "Suma y resta con distinto denominador",
    duracion: "7 min",
    nivel: "Básico",
    descripcion:
      "Encuentra el mínimo común múltiplo, convierte las fracciones y opera con seguridad.",
    video: "https://www.youtube.com/embed/5juto2ze8Lg",
    practica: "Calcula: 2/3 + 1/4",
  },
  {
    tema: "Trigonometría",
    titulo: "Seno, coseno y tangente",
    duracion: "12 min",
    nivel: "Intermedio",
    descripcion:
      "Comprende las razones trigonométricas y cuándo usar cada una para hallar lados y ángulos.",
    video: "https://www.youtube.com/embed/PUB0TaZ7bhA",
    practica: "Si sen(θ) = 0.5, ¿cuánto vale θ?",
  },
  {
    tema: "Geometría",
    titulo: "Áreas de figuras planas",
    duracion: "9 min",
    nivel: "Básico",
    descripcion:
      "Repasa las fórmulas de área de triángulos, rectángulos, círculos y trapecios con ejemplos.",
    video: "https://www.youtube.com/embed/xCdxURXMdFY",
    practica: "Área de un círculo de radio 5",
  },
];

const temas = ["Todos", "Álgebra", "Geometría", "Fracciones", "Trigonometría"];

function Ejercicios() {
  const [tema, setTema] = useState("Todos");
  const visibles =
    tema === "Todos" ? lecciones : lecciones.filter((l) => l.tema === tema);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-3xl md:text-4xl">Ejercicios y refuerzos</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Cada tema incluye un video explicativo, una descripción del
          procedimiento y un ejercicio para practicar.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 text-sm font-semibold">
          {temas.map((t) => (
            <button
              key={t}
              onClick={() => setTema(t)}
              className={`rounded-full px-4 py-2 ${tema === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {visibles.map((l) => (
            <article key={l.titulo} className="card-soft overflow-hidden">
              <div className="aspect-video w-full bg-muted">
                <iframe
                  src={l.video}
                  title={l.titulo}
                  loading="lazy"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">
                    {l.tema}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
                    {l.nivel}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
                    {l.duracion}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold">{l.titulo}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {l.descripcion}
                </p>
                <div className="mt-4 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">
                  Práctica: {l.practica}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
