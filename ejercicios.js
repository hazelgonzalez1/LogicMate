/* Página de ejercicios: filtros por tema + tarjetas con video */

const lecciones = [
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
let temaActivo = "Todos";

const filtros = document.getElementById("filtros");
const contenedor = document.getElementById("lecciones");

function pintarFiltros() {
  filtros.innerHTML = temas
    .map(
      (t) =>
        `<button class="filter ${t === temaActivo ? "active" : ""}" data-tema="${t}">${t}</button>`,
    )
    .join("");
  filtros.querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", () => {
      temaActivo = b.dataset.tema;
      pintarFiltros();
      pintarLecciones();
    }),
  );
}

function pintarLecciones() {
  const visibles =
    temaActivo === "Todos"
      ? lecciones
      : lecciones.filter((l) => l.tema === temaActivo);
  contenedor.innerHTML = visibles
    .map(
      (l) => `
      <article class="card lesson">
        <div class="video-wrap">
          <iframe src="${l.video}" title="${l.titulo}" loading="lazy" allowfullscreen></iframe>
        </div>
        <div class="body">
          <div class="row" style="gap:8px">
            <span class="chip" style="background:#e3f6ef;color:#1c7a61">${l.tema}</span>
            <span class="chip">${l.nivel}</span>
            <span class="chip">${l.duracion}</span>
          </div>
          <h2 class="mt-2">${l.titulo}</h2>
          <p class="small muted mt-1">${l.descripcion}</p>
          <div class="mt-2" style="background:var(--secondary);color:var(--secondary-fg);padding:12px 16px;border-radius:14px;font-weight:600;font-size:0.875rem">
            Práctica: ${l.practica}
          </div>
        </div>
      </article>`,
    )
    .join("");
}

pintarFiltros();
pintarLecciones();
