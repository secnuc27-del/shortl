import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { useState } from "react";
import { X } from "lucide-react";

export const Route = createFileRoute("/galeria")({
  component: Galeria,
});

const filters = ["Todos", "Estrutura", "Eventos", "Clubes", "Dia a dia", "Turmas", "Projetos"] as const;

type PhotoCategory = Exclude<typeof filters[number], "Todos">;

interface Photo {
  id: number;
  cat: PhotoCategory;
  hue: number;
  ratio: string;
}

const photos: Photo[] = Array.from({ length: 24 }, (_, i) => {
  const cats: PhotoCategory[] = ["Estrutura", "Eventos", "Clubes", "Dia a dia", "Turmas", "Projetos"];
  return {
    id: i,
    cat: cats[i % cats.length],
    hue: (i * 37) % 360,
    ratio: i % 4 === 0 ? "aspect-[4/5]" : i % 3 === 0 ? "aspect-[5/4]" : "aspect-square",
  };
});

function Galeria() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [open, setOpen] = useState<Photo | null>(null);

  const list = filter === "Todos" ? photos : photos.filter((p) => p.cat === filter);

  return (
    <Page>
      <PageHero
        eyebrow="Memórias da escola"
        title={<>Cada foto, uma <span className="gradient-text">história</span>.</>}
        subtitle="Explore momentos da estrutura, do dia a dia, dos clubes, eventos, turmas e projetos da Kairala."
      />

      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  filter === f
                    ? "text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "border border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
                style={filter === f ? { background: "var(--gradient-brand)" } : undefined}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {list.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpen(p)}
                className={`group relative overflow-hidden rounded-2xl ring-1 ring-border transition-transform hover:-translate-y-1 ${p.ratio}`}
                style={{
                  background: `linear-gradient(135deg, oklch(0.6 0.2 ${p.hue}), oklch(0.4 0.18 ${(p.hue + 50) % 360}))`,
                }}
              >
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                <div className="absolute bottom-2 left-2 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                  {p.cat}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 animate-[fade-in_0.2s_ease-out]"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-foreground shadow"
            >
              <X size={18} />
            </button>
            <div
              className="aspect-[4/3] w-full"
              style={{
                background: `linear-gradient(135deg, oklch(0.6 0.2 ${open.hue}), oklch(0.4 0.18 ${(open.hue + 50) % 360}))`,
              }}
            />
            <div className="p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-accent">{open.cat}</div>
              <h3 className="mt-1 text-lg font-bold">Foto #{open.id + 1}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Espaço reservado para foto real da escola.</p>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
