/* LogicMate — script compartido: navegación y sesión local */

const PAGINAS = [
  { href: "index.html", label: "Inicio" },
  { href: "ejercicios.html", label: "Ejercicios" },
  { href: "juegos.html", label: "Juegos" },
  { href: "foro.html", label: "Foro" },
  { href: "ranking.html", label: "Ranking" },
];

/* --- sesión simulada guardada en el navegador (localStorage) --- */
export const sesion = {
  leer() {
    try {
      return JSON.parse(localStorage.getItem("logicmate_usuario") || "null");
    } catch {
      return null;
    }
  },
  guardar(u) {
    localStorage.setItem("logicmate_usuario", JSON.stringify(u));
  },
  cerrar() {
    localStorage.removeItem("logicmate_usuario");
  },
};

export function pintarNav() {
  const actual = location.pathname.split("/").pop() || "index.html";
  const usuario = sesion.leer();

  const enlaces = PAGINAS.map(
    (p) =>
      `<li><a href="${p.href}" class="${p.href === actual ? "active" : ""}">${p.label}</a></li>`,
  ).join("");

  const cuenta = usuario
    ? `<li><a class="cta" href="perfil.html">Mi perfil</a></li>`
    : `<li><a class="cta" href="auth.html">Registrarse</a></li>`;

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<header class="site-nav">
       <div class="inner">
         <a class="logo" href="index.html">
           <span class="mark">L</span>
           <span><span class="text-primary">Logic</span><span class="text-mint">Mate</span></span>
         </a>
         <ul class="nav-links">${enlaces}${cuenta}</ul>
       </div>
     </header>`,
  );

  document.body.insertAdjacentHTML(
    "beforeend",
    `<footer class="site-footer">LogicMate · Refuerzo de matemáticas para todos</footer>`,
  );
}

pintarNav();
