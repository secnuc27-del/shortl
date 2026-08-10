import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export const Route = createFileRoute("/galeria")({
  component: Galeria,
});

// Importa URLs das imagens por pasta
const ambienteImgs = import.meta.glob("../assets/galeria/ambiente/*.jpg", {
  eager: true,
  as: "url",
});
const auditorioImgs = import.meta.glob("../assets/galeria/auditorio/*.jpg", {
  eager: true,
  as: "url",
});
const labInfoImgs = import.meta.glob(
  "../assets/galeria/laboratorio-de-informatica/*.jpg",
  { eager: true, as: "url" }
);
const labQuimImgs = import.meta.glob(
  "../assets/galeria/laboratorio-de-quimica/*.jpg",
  { eager: true, as: "url" }
);

type Category =
  | "Todos"
  | "Ambiente"
  | "Auditório"
  | "Lab. Informática"
  | "Lab. Química";

interface Photo {
  url: string;
  cat: Exclude<Category, "Todos">;
  label: string;
}

function buildPhotos(): Photo[] {
  const result: Photo[] = [];
  const add = (
    map: Record<string, any>,
    cat: Exclude<Category, "Todos">,
    label: string
  ) => {
    Object.values(map).forEach((val) => {
      // Vite returns { default: "/path/to/img" } for eager imports of assets
      const url = typeof val === "string" ? val : val.default;
      if (url) result.push({ url, cat, label });
    });
  };
  add(ambienteImgs, "Ambiente", "Ambiente Escolar");
  add(auditorioImgs, "Auditório", "Auditório");
  add(labInfoImgs, "Lab. Informática", "Laboratório de Informática");
  add(labQuimImgs, "Lab. Química", "Laboratório de Química");
  return result;
}

const ALL_PHOTOS = buildPhotos();
const FILTERS: Category[] = [
  "Todos",
  "Ambiente",
  "Auditório",
  "Lab. Informática",
  "Lab. Química",
];

/* CSS keyframes para slide das fotos */
const SLIDE_STYLE = `
  @keyframes slideInRight  { from { opacity:0; transform: translateX(60px)  scale(0.96) } to { opacity:1; transform: translateX(0) scale(1) } }
  @keyframes slideInLeft   { from { opacity:0; transform: translateX(-60px) scale(0.96) } to { opacity:1; transform: translateX(0) scale(1) } }
  @keyframes slideOutLeft  { from { opacity:1; transform: translateX(0) scale(1) } to { opacity:0; transform: translateX(-60px) scale(0.96) } }
  @keyframes slideOutRight { from { opacity:1; transform: translateX(0) scale(1) } to { opacity:0; transform: translateX(60px)  scale(0.96) } }
`;

/* ── Lightbox ───────────────────────────────────────────── */
interface LightboxProps {
  photo: Photo;
  idx: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ photo, idx, total, onClose, onPrev, onNext }: LightboxProps) {
  const [phase, setPhase] = useState<"opening" | "open" | "closing">("opening");
  // "right" = avançando (próxima), "left" = voltando (anterior)
  const [slideDir, setSlideDir] = useState<"right" | "left" | null>(null);
  const [displayPhoto, setDisplayPhoto] = useState(photo);
  const [animKey, setAnimKey] = useState(0);

  // Transição de entrada do lightbox
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("open"));
    });
    return () => cancelAnimationFrame(t);
  }, []);

  // Atualiza foto com animação de slide
  useEffect(() => {
    setDisplayPhoto(photo);
    setAnimKey((k) => k + 1);
  }, [photo]);

  const handleClose = useCallback(() => {
    setPhase("closing");
    setTimeout(onClose, 280);
  }, [onClose]);

  const handlePrev = useCallback(() => {
    setSlideDir("left");
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback(() => {
    setSlideDir("right");
    onNext();
  }, [onNext]);

  // Teclado
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose, handlePrev, handleNext]);

  const backdropStyle: React.CSSProperties = {
    opacity: phase === "open" ? 1 : 0,
    transition: "opacity 0.28s ease",
  };

  const boxStyle: React.CSSProperties = {
    transform:
      phase === "open"
        ? "scale(1) translateY(0)"
        : "scale(0.88) translateY(12px)",
    opacity: phase === "open" ? 1 : 0,
    transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease",
  };

  // Animação de slide da imagem ao navegar
  const imgAnimation: React.CSSProperties =
    slideDir === "right"
      ? { animation: "slideInRight 0.32s cubic-bezier(0.25,0.46,0.45,0.94) both" }
      : slideDir === "left"
        ? { animation: "slideInLeft 0.32s cubic-bezier(0.25,0.46,0.45,0.94) both" }
        : {};

  return createPortal(
    <>
      <style>{SLIDE_STYLE}</style>
      <div
        role="dialog"
      aria-modal="true"
      aria-label={photo.label}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
      style={backdropStyle}
      onClick={handleClose}
    >
      {/* Fechar */}
      <button
        onClick={handleClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* Anterior */}
      <button
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        aria-label="Foto anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Imagem */}
      <div
        className="relative max-w-5xl w-full flex flex-col items-center gap-3 overflow-hidden"
        style={boxStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={animKey}
          src={displayPhoto.url}
          alt={displayPhoto.label}
          className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl"
          style={imgAnimation}
        />
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-5 py-1.5 text-sm text-white font-medium">
          {displayPhoto.label}&ensp;·&ensp;{idx + 1} / {total}
        </div>
      </div>

      {/* Próxima */}
      <button
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        aria-label="Próxima foto"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
      >
        <ChevronRight size={28} />
      </button>
    </div>
    </>,
    document.body
  );
}

/* ── Galeria ────────────────────────────────────────────── */
function Galeria() {
  const [filter, setFilter] = useState<Category>("Todos");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(16);

  const list =
    filter === "Todos"
      ? ALL_PHOTOS
      : ALL_PHOTOS.filter((p) => p.cat === filter);

  const open = useCallback((idx: number) => setLightboxIdx(idx), []);
  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () => setLightboxIdx((i) => (i === null ? 0 : (i - 1 + list.length) % list.length)),
    [list.length]
  );
  const next = useCallback(
    () => setLightboxIdx((i) => (i === null ? 0 : (i + 1) % list.length)),
    [list.length]
  );

  return (
    <Page>
      <PageHero
        eyebrow="Memórias da escola"
        title={
          <>
            Cada foto, uma{" "}
            <span className="gradient-text">história</span>.
          </>
        }
        subtitle="Explore os espaços da Escola KJK Kairala — ambientes, auditório, laboratórios e muito mais."
      />

      <section className="section-y">
        <div className="container-x">
          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setLightboxIdx(null);
                  setVisibleCount(16); // Reset on filter change
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  filter === f
                    ? "text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "border border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
                style={
                  filter === f
                    ? { background: "var(--gradient-brand)" }
                    : undefined
                }
              >
                {f}
              </button>
            ))}
            <span className="ml-auto text-sm text-muted-foreground">
              {list.length} foto{list.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid de fotos - Estilo Instagram (aspect-square) para melhor performance */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {list.slice(0, visibleCount).map((photo, idx) => (
              <div
                key={photo.url}
                className="group relative overflow-hidden rounded-2xl cursor-pointer ring-1 ring-border hover:ring-2 hover:ring-primary transition-all duration-300 hover:-translate-y-1 aspect-square"
                onClick={() => open(idx)}
              >
                <img
                  src={photo.url}
                  alt={photo.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 block bg-muted/50"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <ZoomIn size={36} className="text-white drop-shadow-lg" />
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute bottom-2 left-2 rounded-full bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.cat}
                </div>
              </div>
            ))}
          </div>

          {visibleCount < list.length && (
            <div className="mt-10 flex justify-center">
              <button 
                onClick={() => setVisibleCount(c => c + 16)}
                className="btn-accent px-8 py-3"
              >
                Carregar mais fotos
              </button>
            </div>
          )}

          {list.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              Nenhuma foto nesta categoria ainda.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox com portal + animação */}
      {lightboxIdx !== null && (
        <Lightbox
          photo={list[lightboxIdx]}
          idx={lightboxIdx}
          total={list.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </Page>
  );
}
