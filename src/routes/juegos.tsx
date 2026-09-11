import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";

export const Route = createFileRoute("/juegos")({
  head: () => ({
    meta: [
      { title: "Juegos educativos de matemáticas — LogicMate" },
      {
        name: "description",
        content:
          "Juegos interactivos para entender mejor las matemáticas: reto de cálculo mental, parejas de fracciones y adivina el número.",
      },
      { property: "og:title", content: "Juegos educativos — LogicMate" },
      {
        property: "og:description",
        content:
          "Aprende jugando con retos de cálculo mental, fracciones y lógica.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Juegos,
});

function Juegos() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-5 py-12">
        <h1 className="text-3xl md:text-4xl">Juegos educativos</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Practica jugando: cada juego refuerza una habilidad distinta y puedes
          repetirlo las veces que quieras.
        </p>
        <div className="mt-10 space-y-10">
          <FusionNumerica />
          <RetoRapido />
          <ParejasFracciones />
          <AdivinaNumero />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Panel({
  titulo,
  descripcion,
  children,
}: {
  titulo: string;
  descripcion: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-soft p-6">
      <h2 className="text-xl font-bold">{titulo}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{descripcion}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/* ---------- Juego 1: cálculo mental contra reloj ---------- */

function nuevaOperacion() {
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)]!;
  const a = Math.floor(Math.random() * (op === "×" ? 9 : 40)) + 2;
  const b = Math.floor(Math.random() * (op === "×" ? 9 : 40)) + 2;
  const [x, y] = op === "-" && b > a ? [b, a] : [a, b];
  const r = op === "+" ? x + y : op === "-" ? x - y : x * y;
  return { texto: `${x} ${op} ${y}`, resultado: r };
}

function RetoRapido() {
  const [jugando, setJugando] = useState(false);
  const [tiempo, setTiempo] = useState(30);
  const [puntos, setPuntos] = useState(0);
  const [op, setOp] = useState(nuevaOperacion);
  const [valor, setValor] = useState("");
  const [feedback, setFeedback] = useState<"ok" | "mal" | null>(null);

  useEffect(() => {
    if (!jugando) return;
    if (tiempo <= 0) {
      setJugando(false);
      return;
    }
    const t = setTimeout(() => setTiempo((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [jugando, tiempo]);

  function empezar() {
    setPuntos(0);
    setTiempo(30);
    setOp(nuevaOperacion());
    setValor("");
    setFeedback(null);
    setJugando(true);
  }

  function responder(e: React.FormEvent) {
    e.preventDefault();
    if (!jugando) return;
    const correcto = Number(valor) === op.resultado;
    setFeedback(correcto ? "ok" : "mal");
    if (correcto) setPuntos((p) => p + 10);
    setOp(nuevaOperacion());
    setValor("");
  }

  return (
    <Panel
      titulo="Reto rápido de cálculo mental"
      descripcion="Resuelve todas las operaciones que puedas en 30 segundos. Cada acierto vale 10 puntos."
    >
      {!jugando ? (
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={empezar}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            {tiempo === 30 && puntos === 0 ? "Empezar" : "Jugar otra vez"}
          </button>
          {tiempo <= 0 && (
            <p className="text-sm font-semibold">
              ¡Tiempo! Conseguiste{" "}
              <span className="text-primary">{puntos} puntos</span>.
            </p>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="rounded-full bg-sun px-4 py-1 text-sun-foreground">
              {tiempo}s
            </span>
            <span className="text-primary">{puntos} puntos</span>
          </div>
          <p className="mt-6 text-center text-4xl font-bold">{op.texto}</p>
          <form onSubmit={responder} className="mt-5 flex justify-center gap-3">
            <input
              autoFocus
              inputMode="numeric"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-32 rounded-xl border border-input bg-background px-4 py-3 text-center text-lg font-bold outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="rounded-full bg-mint px-6 py-3 text-sm font-semibold text-mint-foreground">
              Responder
            </button>
          </form>
          {feedback && (
            <p
              className={`mt-3 text-center text-sm font-semibold ${feedback === "ok" ? "text-mint" : "text-coral"}`}
            >
              {feedback === "ok" ? "¡Correcto!" : "Casi, sigue intentando"}
            </p>
          )}
        </div>
      )}
    </Panel>
  );
}

/* ---------- Juego 2: parejas de fracciones ---------- */

const parejas = [
  { fraccion: "1/2", equivalente: "50%" },
  { fraccion: "1/4", equivalente: "25%" },
  { fraccion: "3/4", equivalente: "75%" },
  { fraccion: "1/5", equivalente: "20%" },
  { fraccion: "2/5", equivalente: "40%" },
];

function ParejasFracciones() {
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [resueltas, setResueltas] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const derecha = useMemo(
    () => [...parejas].sort(() => Math.random() - 0.5),
    [],
  );

  function elegirEquivalente(valor: string) {
    if (!seleccion) return;
    const par = parejas.find((p) => p.fraccion === seleccion);
    if (par && par.equivalente === valor) {
      setResueltas((r) => [...r, seleccion]);
      setError(false);
    } else {
      setError(true);
    }
    setSeleccion(null);
  }

  const completado = resueltas.length === parejas.length;

  return (
    <Panel
      titulo="Une la fracción con su porcentaje"
      descripcion="Toca una fracción y luego el porcentaje que le corresponde."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          {parejas.map((p) => {
            const hecha = resueltas.includes(p.fraccion);
            return (
              <button
                key={p.fraccion}
                disabled={hecha}
                onClick={() => setSeleccion(p.fraccion)}
                className={`w-full rounded-xl px-4 py-3 text-left font-bold transition-colors ${
                  hecha
                    ? "bg-mint text-mint-foreground"
                    : seleccion === p.fraccion
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                }`}
              >
                {p.fraccion}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {derecha.map((p) => {
            const hecha = resueltas.includes(p.fraccion);
            return (
              <button
                key={p.equivalente}
                disabled={hecha}
                onClick={() => elegirEquivalente(p.equivalente)}
                className={`w-full rounded-xl px-4 py-3 text-left font-bold transition-colors ${
                  hecha ? "bg-mint text-mint-foreground" : "bg-muted"
                }`}
              >
                {p.equivalente}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold">
        {error && (
          <span className="text-coral">
            Esa no es la pareja, inténtalo de nuevo.
          </span>
        )}
        {completado && (
          <span className="text-mint">¡Completaste todas las parejas!</span>
        )}
        {(completado || resueltas.length > 0) && (
          <button
            onClick={() => {
              setResueltas([]);
              setError(false);
              setSeleccion(null);
            }}
            className="rounded-full border border-border px-4 py-2"
          >
            Reiniciar
          </button>
        )}
      </div>
    </Panel>
  );
}

/* ---------- Juego 3: adivina el número ---------- */

function AdivinaNumero() {
  const [secreto, setSecreto] = useState(
    () => Math.floor(Math.random() * 100) + 1,
  );
  const [valor, setValor] = useState("");
  const [pistas, setPistas] = useState<string[]>([]);
  const [ganado, setGanado] = useState(false);

  function intentar(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(valor);
    if (!n) return;
    if (n === secreto) {
      setGanado(true);
      setPistas((p) => [
        `¡${n} es el número! Lo lograste en ${p.length + 1} intentos.`,
        ...p,
      ]);
    } else {
      setPistas((p) => [
        `${n} es ${n < secreto ? "muy bajo" : "muy alto"}`,
        ...p,
      ]);
    }
    setValor("");
  }

  return (
    <Panel
      titulo="Adivina el número"
      descripcion="Piensa en un número del 1 al 100. Usa las pistas de mayor y menor para encontrarlo."
    >
      {!ganado && (
        <form onSubmit={intentar} className="flex flex-wrap gap-3">
          <input
            inputMode="numeric"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Tu número"
            className="w-40 rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Probar
          </button>
        </form>
      )}
      <ul className="mt-4 space-y-1 text-sm font-semibold">
        {pistas.slice(0, 5).map((p, i) => (
          <li
            key={i}
            className={
              i === 0 && ganado ? "text-mint" : "text-muted-foreground"
            }
          >
            {p}
          </li>
        ))}
      </ul>
      {ganado && (
        <button
          onClick={() => {
            setSecreto(Math.floor(Math.random() * 100) + 1);
            setPistas([]);
            setGanado(false);
          }}
          className="mt-4 rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
        >
          Jugar otra vez
        </button>
      )}
    </Panel>
  );
}

/* ---------- Juego 4: fusión numérica (Tetris + Suika matemático) ---------- */

const COLS = 5;
const ROWS = 9;
const VALORES_INICIALES = [2, 2, 2, 4, 4, 8];

const COLORES: Record<number, string> = {
  2: "bg-primary/15 text-primary",
  4: "bg-mint/20 text-mint",
  8: "bg-sun/25 text-sun",
  16: "bg-coral/20 text-coral",
  32: "bg-primary/35 text-primary",
  64: "bg-mint/40 text-mint",
  128: "bg-sun/45 text-sun",
  256: "bg-coral/40 text-coral",
};

type Celda = number | null;

function tableroVacio(): Celda[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => null),
  );
}

function valorAleatorio() {
  return VALORES_INICIALES[
    Math.floor(Math.random() * VALORES_INICIALES.length)
  ]!;
}

function FusionNumerica() {
  const [tablero, setTablero] = useState<Celda[][]>(tableroVacio);
  const [col, setCol] = useState(2);
  const [fila, setFila] = useState(0);
  const [valor, setValor] = useState(2);
  const [siguiente, setSiguiente] = useState(4);
  const [puntos, setPuntos] = useState(0);
  const [mejor, setMejor] = useState(2);
  const [jugando, setJugando] = useState(false);
  const [perdio, setPerdio] = useState(false);

  function resolverFusiones(base: Celda[][], f: number, c: number, v: number) {
    const grid = base.map((r) => r.slice());
    let fFila = f;
    let val = v;
    let ganado = 0;
    grid[fFila]![c] = val;

    let sigue = true;
    while (sigue) {
      sigue = false;
      // fusión vertical con la celda de abajo
      if (fFila + 1 < ROWS && grid[fFila + 1]![c] === val) {
        grid[fFila]![c] = null;
        fFila = fFila + 1;
        val = val * 2;
        grid[fFila]![c] = val;
        ganado += val;
        sigue = true;
        continue;
      }
      // fusión horizontal
      for (const d of [-1, 1]) {
        const nc = c + d;
        if (nc >= 0 && nc < COLS && grid[fFila]![nc] === val) {
          grid[fFila]![nc] = null;
          val = val * 2;
          grid[fFila]![c] = val;
          ganado += val;
          sigue = true;
          break;
        }
      }
      if (sigue) continue;
      // caída por gravedad tras fusionar
      if (fFila + 1 < ROWS && grid[fFila + 1]![c] === null) {
        grid[fFila]![c] = null;
        fFila += 1;
        grid[fFila]![c] = val;
        sigue = true;
      }
    }

    // gravedad general en todas las columnas
    for (let cc = 0; cc < COLS; cc++) {
      const vals: number[] = [];
      for (let rr = ROWS - 1; rr >= 0; rr--) {
        const cel = grid[rr]![cc];
        if (cel !== null && cel !== undefined) vals.push(cel);
      }
      for (let rr = ROWS - 1, i = 0; rr >= 0; rr--, i++) {
        grid[rr]![cc] = i < vals.length ? vals[i]! : null;
      }
    }
    return { grid, ganado, val };
  }

  function aterrizar(f: number, c: number, v: number) {
    const { grid, ganado, val } = resolverFusiones(tablero, f, c, v);
    setTablero(grid);
    setPuntos((p) => p + ganado + v);
    setMejor((m) => Math.max(m, val));
    if (grid[0]!.some((x) => x !== null)) {
      setJugando(false);
      setPerdio(true);
      return;
    }
    setValor(siguiente);
    setSiguiente(valorAleatorio());
    setFila(0);
  }

  useEffect(() => {
    if (!jugando) return;
    const id = setTimeout(() => {
      if (fila + 1 < ROWS && tablero[fila + 1]![col] === null) {
        setFila(fila + 1);
      } else {
        aterrizar(fila, col, valor);
      }
    }, 650);
    return () => clearTimeout(id);
  }, [jugando, fila, col, valor, tablero, siguiente]);

  useEffect(() => {
    if (!jugando) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCol((c) => Math.max(0, c - 1));
      if (e.key === "ArrowRight") setCol((c) => Math.min(COLS - 1, c + 1));
      if (e.key === "ArrowDown" || e.key === " ") soltar();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function soltar() {
    let f = fila;
    while (f + 1 < ROWS && tablero[f + 1]![col] === null) f++;
    if (tablero[f]![col] !== null) {
      setJugando(false);
      setPerdio(true);
      return;
    }
    aterrizar(f, col, valor);
  }

  function iniciar() {
    setTablero(tableroVacio());
    setPuntos(0);
    setMejor(2);
    setCol(2);
    setFila(0);
    setValor(valorAleatorio());
    setSiguiente(valorAleatorio());
    setPerdio(false);
    setJugando(true);
  }

  return (
    <Panel
      titulo="Fusión numérica (Tetris + Suika matemático)"
      descripcion="Las piezas caen como en Tetris: cuando dos números iguales se tocan, se suman y forman uno más grande, igual que las frutas del Suika. Practica dobles y potencias de 2."
    >
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="mx-auto">
          <div
            className="grid gap-1 rounded-2xl bg-muted/60 p-2"
            style={{ gridTemplateColumns: `repeat(${COLS}, 2.75rem)` }}
          >
            {Array.from({ length: ROWS }).map((_, r) =>
              Array.from({ length: COLS }).map((__, c) => {
                const esActiva = jugando && r === fila && c === col;
                const v = esActiva ? valor : tablero[r]![c];
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`flex h-11 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                      v === null || v === undefined
                        ? "bg-card/70"
                        : (COLORES[v] ?? "bg-primary/40 text-primary")
                    } ${esActiva ? "ring-2 ring-primary" : ""}`}
                  >
                    {v ?? ""}
                  </div>
                );
              }),
            )}
          </div>
          {jugando && (
            <div className="mt-3 flex justify-center gap-2">
              <button
                onClick={() => setCol((c) => Math.max(0, c - 1))}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
                aria-label="Mover a la izquierda"
              >
                ←
              </button>
              <button
                onClick={soltar}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Soltar
              </button>
              <button
                onClick={() => setCol((c) => Math.min(COLS - 1, c + 1))}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
                aria-label="Mover a la derecha"
              >
                →
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex gap-4">
            <div className="rounded-2xl bg-muted/60 px-4 py-3">
              <p className="text-xs text-muted-foreground">Puntos</p>
              <p className="text-2xl font-bold">{puntos}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 px-4 py-3">
              <p className="text-xs text-muted-foreground">Número mayor</p>
              <p className="text-2xl font-bold text-mint">{mejor}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 px-4 py-3">
              <p className="text-xs text-muted-foreground">Siguiente</p>
              <p className="text-2xl font-bold text-sun">{siguiente}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Usa las flechas del teclado (o los botones) para mover la pieza y
            soltarla. Dos números iguales que se tocan se convierten en su suma:
            2 + 2 = 4, 4 + 4 = 8, y así hasta llegar lo más alto posible.
          </p>
          {perdio && (
            <p className="text-sm font-semibold text-coral">
              ¡Se llenó el tablero! Llegaste a {mejor} con {puntos} puntos.
            </p>
          )}
          <button
            onClick={iniciar}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            {jugando ? "Reiniciar" : "Jugar"}
          </button>
        </div>
      </div>
    </Panel>
  );
}
