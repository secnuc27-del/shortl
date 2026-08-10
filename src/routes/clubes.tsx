import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import imgLigaOlimpica from "@/assets/clubes/Liga Olimpica.jpeg";
import imgArenaIdeias from "@/assets/clubes/arena ideias.jpeg";
import imgArtDraw from "@/assets/clubes/artes.jpeg";
import imgTheGoat from "@/assets/clubes/basquete.jpeg";
import imgBelezaMovimento from "@/assets/clubes/beleza em movimento.jpeg";
import imgEssenciaFeminina from "@/assets/clubes/beleza feminina.jpeg";
import imgCarimbo from "@/assets/clubes/dança.jpeg";
import imgMeuFuturo from "@/assets/clubes/ene.jpeg";
import imgLuzArte from "@/assets/clubes/fotografia.jpeg";
import imgPingPong from "@/assets/clubes/pingpong.jpeg";
import imgPodClass from "@/assets/clubes/podcast.jpeg";
import imgLendas from "@/assets/clubes/rpg.jpeg";
import imgTeatro from "@/assets/clubes/teatro.jpeg";
import imgVoceImporta from "@/assets/clubes/voce importa.jpeg";
import imgEliteVolei from "@/assets/clubes/volei.jpeg";
import imgXadrez from "@/assets/clubes/xadres.jpeg";

export const Route = createFileRoute("/clubes")({
  component: Clubes,
});

const clubs = [
  { name: "Liga Olímpica", img: imgLigaOlimpica, tag: "Conhecimento", desc: "Conhecimento que inspira, desafios que transformam. Olimpíadas acadêmicas de Matemática, Física, Química e Biologia." },
  { name: "Arena de Ideias", img: imgArenaIdeias, tag: "Debate & Cidadania", desc: "Sua voz tem poder. Debates sobre temas atuais, rodas de conversa e protagonismo juvenil." },
  { name: "Art Draw", img: imgArtDraw, tag: "Arte & Expressão", desc: "Transforme ideias em traços. Desenho, ilustração, mangá, caricatura e técnicas artísticas." },
  { name: "The Goat — Basquete", img: imgTheGoat, tag: "Esporte", desc: "Basquete é mais que um jogo, é escolha, foco e superação. Treine, aprenda e evolua junto." },
  { name: "Beleza em Movimento", img: imgBelezaMovimento, tag: "Dança & Cultura", desc: "Dançamos, expressamos, cultivamos e transformamos. Nossa cultura, nossa história, nossos passos." },
  { name: "Essência Feminina", img: imgEssenciaFeminina, tag: "Empoderamento", desc: "Um espaço de acolhimento, diálogo e transformação para todas. Cuidar de si é o primeiro passo." },
  { name: "Carimbó das Flores", img: imgCarimbo, tag: "Cultura Popular", desc: "Nossa cultura dança conosco! Dança folclórica, ritmos regionais e valorização das raízes amazônicas." },
  { name: "Meu Futuro", img: imgMeuFuturo, tag: "ENEM & Projeto de Vida", desc: "Estudar hoje é construir o futuro que sonhamos amanhã. Revisões coletivas, simulados e motivação." },
  { name: "Luz & Arte", img: imgLuzArte, tag: "Fotografia", desc: "Enxergar. Sentir. Registrar. Transformar. Um clube para quem vê o mundo com outros olhos." },
  { name: "Ping Pong KJK", img: imgPingPong, tag: "Esporte", desc: "Movimento, estratégia e diversão. Cada jogada te leva mais longe — dentro e fora da quadra." },
  { name: "Pod Class", img: imgPodClass, tag: "Comunicação", desc: "Dá voz às suas ideias! Crie podcasts, entreviste, debata e compartilhe — sua voz transforma." },
  { name: "Lendas & Reinos KJK", img: imgLendas, tag: "RPG & Narrativas", desc: "Crie seu personagem, viva grandes aventuras. Clube de RPG onde toda grande aventura começa com uma boa história." },
  { name: "Arte em Cena", img: imgTeatro, tag: "Teatro", desc: "Venha viver a magia do teatro! Atuação, criação de histórias e apresentações para toda a escola." },
  { name: "Você Importa", img: imgVoceImporta, tag: "Saúde Mental", desc: "Um espaço de acolhimento, escuta, empatia e ação pela saúde mental. Sua voz tem valor." },
  { name: "Elite Vôlei", img: imgEliteVolei, tag: "Esporte", desc: "Quadra, foco e trabalho em equipe. Mais que um time, uma família que treina, aprende e supera." },
  { name: "Xadrez — Império Royally", img: imgXadrez, tag: "Estratégia", desc: "Pense. Planeje. Jogue. Evolua. O xadrez é mais que um jogo — é uma ferramenta para a vida." },
];

/* ── Keyframes de slide ─────────────────────────────────── */
const SLIDE_STYLE = `
  @keyframes slideInRight  { from { opacity:0; transform: translateX(60px)  scale(0.96) } to { opacity:1; transform: translateX(0) scale(1) } }
  @keyframes slideInLeft   { from { opacity:0; transform: translateX(-60px) scale(0.96) } to { opacity:1; transform: translateX(0) scale(1) } }
`;

/* ── Lightbox ───────────────────────────────────────────── */
interface LightboxProps {
  club: (typeof clubs)[0];
  idx: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ club, idx, total, onClose, onPrev, onNext }: LightboxProps) {
  const [phase, setPhase] = useState<"opening" | "open" | "closing">("opening");
  const [slideDir, setSlideDir] = useState<"right" | "left" | null>(null);
  const [displayed, setDisplayed] = useState(club);
  const [animKey, setAnimKey] = useState(0);

  // Animação de entrada do lightbox
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("open"));
    });
    return () => cancelAnimationFrame(t);
  }, []);

  // Atualiza imagem com slide ao navegar
  useEffect(() => {
    setDisplayed(club);
    setAnimKey((k) => k + 1);
  }, [club]);

  const handleClose = useCallback(() => {
    setPhase("closing");
    setTimeout(onClose, 260);
  }, [onClose]);

  const handlePrev = useCallback(() => {
    setSlideDir("left");
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback(() => {
    setSlideDir("right");
    onNext();
  }, [onNext]);

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
    transition: "opacity 0.26s ease",
  };

  const boxStyle: React.CSSProperties = {
    transform: phase === "open" ? "scale(1) translateY(0)" : "scale(0.9) translateY(16px)",
    opacity: phase === "open" ? 1 : 0,
    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.26s ease",
  };

  const imgAnim: React.CSSProperties =
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
        aria-label={displayed.name}
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
          aria-label="Clube anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Conteúdo */}
        <div
          className="relative max-w-lg w-full flex flex-col items-center gap-4 overflow-hidden"
          style={boxStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            key={animKey}
            src={displayed.img}
            alt={displayed.name}
            className="max-h-[78vh] w-full rounded-2xl object-contain shadow-2xl"
            style={imgAnim}
          />
          {/* Info */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="rounded-full bg-white/15 backdrop-blur-sm px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
              {displayed.tag}
            </span>
            <p className="text-white font-semibold text-base">{displayed.name}</p>
            <p className="text-white/70 text-sm max-w-sm">{displayed.desc}</p>
            <p className="text-white/40 text-xs mt-1">{idx + 1} / {total}</p>
          </div>
        </div>

        {/* Próxima */}
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          aria-label="Próximo clube"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </>,
    document.body
  );
}

/* ── Clubes ─────────────────────────────────────────────── */
function Clubes() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const open = useCallback((idx: number) => setLightboxIdx(idx), []);
  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () => setLightboxIdx((i) => (i === null ? 0 : (i - 1 + clubs.length) % clubs.length)),
    []
  );
  const next = useCallback(
    () => setLightboxIdx((i) => (i === null ? 0 : (i + 1) % clubs.length)),
    []
  );

  return (
    <Page>
      <PageHero
        eyebrow="Protagonismo Juvenil"
        title={<>Clubes que dão <span className="gradient-text">vida</span> à escola.</>}
        subtitle="Espaços de descoberta, criação e protagonismo. Aqui o aluno aprende fazendo, criando e compartilhando."
      />

      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clubs.map((c, i) => (
              <article
                key={c.name}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                style={{ animation: `scale-in 0.4s ease-out ${i * 0.04}s both` }}
                onClick={() => open(i)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay com lupa */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                      <ZoomIn size={36} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <span className="inline-block rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {c.tag}
                  </span>
                  <h3 className="mt-2 text-base font-bold leading-tight">{c.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div
            className="relative mt-16 overflow-hidden rounded-3xl p-8 text-primary-foreground sm:p-10 md:p-14"
            style={{ background: "var(--gradient-accent)" }}
          >
            <Sparkles className="absolute right-8 top-8 text-white/40" size={100} />
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                Protagonismo Juvenil
              </div>
              <h3 className="mt-4 text-2xl font-black sm:text-3xl md:text-5xl">
                A criatividade também faz parte da aprendizagem.
              </h3>
              <p className="mt-4 text-white/90 md:text-lg">
                Nos clubes, os alunos descobrem talentos, fortalecem vínculos e exercitam o
                protagonismo. Cada culminância é uma celebração do que aprenderam — juntos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {lightboxIdx !== null && (
        <Lightbox
          club={clubs[lightboxIdx]}
          idx={lightboxIdx}
          total={clubs.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </Page>
  );
}
