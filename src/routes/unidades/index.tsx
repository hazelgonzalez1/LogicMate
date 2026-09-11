import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav, SiteFooter } from "@/components/site-nav";

export const Route = createFileRoute("/unidades/")({
  head: () => ({
    meta: [{ title: "Unidades — LogicMate" }],
  }),
  component: UnidadesPage,
});

type UnidadConProgreso = {
  id: number;
  nombre: string;
  orden: number;
  totalEjercicios: number;
  resueltosCorrectos: number;
};

function UnidadesPage() {
  const [unidades, setUnidades] = useState<UnidadConProgreso[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const { data: unidadesData } = await supabase
        .from("unidades")
        .select("id, nombre, orden, temas(id, ejercicios(id))")
        .order("orden", { ascending: true });

      const { data: { user } } = await supabase.auth.getUser();

      const { data: progresoData } = user
        ? await supabase
            .from("progreso")
            .select("ejercicio_id, es_correcta")
            .eq("user_id", user.id)
            .eq("es_correcta", true)
        : { data: [] as { ejercicio_id: number; es_correcta: boolean }[] };

      const correctosIds = new Set((progresoData ?? []).map((p) => p.ejercicio_id));

      const resultado: UnidadConProgreso[] = (unidadesData ?? []).map((u: any) => {
        const ejerciciosIds = (u.temas ?? []).flatMap((t: any) =>
          (t.ejercicios ?? []).map((e: any) => e.id)
        );
        const resueltos = ejerciciosIds.filter((id: number) => correctosIds.has(id));
        return {
          id: u.id,
          nombre: u.nombre,
          orden: u.orden,
          totalEjercicios: ejerciciosIds.length,
          resueltosCorrectos: resueltos.length,
        };
      });

      setUnidades(resultado);
      setCargando(false);
    }
    cargar();
  }, []);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-5 py-12">
        <h1 className="text-3xl md:text-4xl">Unidades</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Elige una unidad para ver sus temas y ejercicios.
        </p>

        {cargando && <p className="mt-8 text-muted-foreground">Cargando...</p>}

        {!cargando && unidades.length === 0 && (
          <div className="mt-8 rounded-xl bg-muted px-5 py-4 text-sm text-muted-foreground">
            Todavía no hay unidades cargadas en la base de datos.
          </div>
        )}

        <div className="mt-8 flex flex-col gap-4">
          {unidades.map((u) => {
            const porcentaje =
              u.totalEjercicios === 0
                ? 0
                : Math.round((u.resueltosCorrectos / u.totalEjercicios) * 100);
            return (
              <Link
                key={u.id}
                to="/unidades/$unidadId"
                params={{ unidadId: String(u.id) }}
                className="card-soft block px-5 py-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {u.orden}. {u.nombre}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {u.resueltosCorrectos}/{u.totalEjercicios}
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}