import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav, SiteFooter } from "@/components/site-nav";

export const Route = createFileRoute("/unidades/unidad/tema")({
  component: TemaPage,
});

function TemaPage() {
  const { unidadId, temaId } = Route.useParams();
  const [tema, setTema] = useState<any>(null);
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const { data: temaData } = await supabase
        .from("temas")
        .select("*")
        .eq("id", temaId)
        .single();

      const { data: ejerciciosData } = await supabase
        .from("ejercicios")
        .select("*")
        .eq("tema_id", temaId)
        .order("orden", { ascending: true });

      setTema(temaData);
      setEjercicios(ejerciciosData ?? []);
      setCargando(false);
    }
    cargar();
  }, [temaId]);

  async function responder(ejercicioId: number, opcion: string, correcta: string) {
    setRespuestas((prev) => ({ ...prev, [ejercicioId]: opcion }));

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("progreso").insert({
      user_id: user.id,
      ejercicio_id: ejercicioId,
      es_correcta: opcion === correcta,
    });
  }

  if (cargando) return <p className="p-12 text-muted-foreground">Cargando...</p>;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <Link
          to="/unidades/$unidadId"
          params={{ unidadId }}
          className="text-sm text-muted-foreground"
        >
          ← Volver a temas
        </Link>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">
          {tema?.numero} {tema?.nombre}
        </h1>
        <p className="mt-4 text-muted-foreground">{tema?.contenido}</p>

        <div className="mt-8 flex flex-col gap-6">
          {ejercicios.map((ej) => {
            const opciones: string[] =
              typeof ej.opciones === "string" ? JSON.parse(ej.opciones) : ej.opciones;
            const seleccionada = respuestas[ej.id];

            return (
              <div key={ej.id} className="card-soft px-5 py-4">
                <p className="font-semibold">{ej.enunciado}</p>
                <div className="mt-3 flex flex-col gap-2">
                  {opciones.map((op) => {
                    const esSeleccionada = seleccionada === op;
                    const esCorrecta = op === ej.respuesta_correcta;
                    let estilo = "bg-muted";
                    if (seleccionada && esSeleccionada && esCorrecta) estilo = "bg-green-200";
                    if (seleccionada && esSeleccionada && !esCorrecta) estilo = "bg-red-200";

                    return (
                      <button
                        key={op}
                        disabled={!!seleccionada}
                        onClick={() => responder(ej.id, op, ej.respuesta_correcta)}
                        className={`rounded-lg px-4 py-2 text-left text-sm ${estilo}`}
                      >
                        {op}
                      </button>
                    );
                  })}
                </div>
                {seleccionada && (
                  <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                    {ej.explicacion}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}