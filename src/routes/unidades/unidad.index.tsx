import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav, SiteFooter } from "@/components/site-nav";

export const Route = createFileRoute("/unidades/$unidadId/")({
  component: TemasPage,
});

function TemasPage() {
  const { unidadId } = Route.useParams();
  const [unidad, setUnidad] = useState<{ nombre: string } | null>(null);
  const [temas, setTemas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const { data: unidadData } = await supabase
        .from("unidades")
        .select("nombre")
        .eq("id", unidadId)
        .single();

      const { data: temasData } = await supabase
        .from("temas")
        .select("id, numero, nombre, orden, ejercicios(id)")
        .eq("unidad_id", unidadId)
        .order("orden", { ascending: true });

      setUnidad(unidadData);
      setTemas(temasData ?? []);
      setCargando(false);
    }
    cargar();
  }, [unidadId]);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-5 py-12">
        <Link to="/unidades" className="text-sm text-muted-foreground">
          ← Volver a unidades
        </Link>
        <h1 className="mt-2 text-3xl md:text-4xl">{unidad?.nombre ?? "..."}</h1>

        {cargando && <p className="mt-8 text-muted-foreground">Cargando...</p>}

        <div className="mt-8 flex flex-col gap-3">
          {temas.map((t) => (
            <Link
              key={t.id}
              to="/unidades/$unidadId/$temaId"
              params={{ unidadId, temaId: String(t.id) }}
              className="card-soft flex items-center justify-between px-5 py-4"
            >
              <span className="font-semibold">
                {t.numero} {t.nombre}
              </span>
              <span className="text-sm text-muted-foreground">
                {(t.ejercicios ?? []).length} ejercicio(s)
              </span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}