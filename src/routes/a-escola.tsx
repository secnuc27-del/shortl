import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import buildingImg from "@/assets/school-building.jpg";
import logoOficial from "@/assets/logo-oficial.png";
import logoTransparente from "@/assets/logo-transparente.png";
import kairalaPhoto from "@/assets/kairala-jose-kairala.webp";
import { getSchoolAge } from "@/lib/school";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut } from "lucide-react";

/* ── Lightbox com zoom para logos ───────────────────────── */
function LogoLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [phase, setPhase] = useState<"in" | "open" | "out">("in");
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleClose = useCallback(() => {
    setPhase("out");
    setTimeout(onClose, 260);
  }, [onClose]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [handleClose]);

  const isOpen = phase === "open";

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-6"
      style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.26s ease" }}
      onClick={handleClose}
    >
      {/* Botão fechar */}
      <button
        onClick={handleClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* Hint zoom */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs text-white/70">
        {zoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
        {zoomed ? "Clique para reduzir" : "Clique na logo para ampliar"}
      </div>

      {/* Imagem */}
      <div
        className="relative flex items-center justify-center"
        style={{
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.88) translateY(16px)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.26s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="object-contain drop-shadow-2xl"
          style={{
            maxHeight: "80vh",
            maxWidth: "90vw",
            transform: zoomed ? "scale(2)" : "scale(1)",
            cursor: zoomed ? "zoom-out" : "zoom-in",
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            transformOrigin: "center center",
          }}
          onClick={() => setZoomed((z) => !z)}
        />
      </div>
    </div>,
    document.body
  );
}


export const Route = createFileRoute("/a-escola")({
  component: AEscola,
});

const timeline = [
  {
    year: "1969",
    title: "Fundação da Escola Normal",
    text: "Em 3 de julho de 1969, nasce a Escola Normal Kairala José Kairala, destinada à formação de professores. As primeiras aulas aconteceram em espaços cedidos pelo Grupo Escolar Getúlio Vargas e pela Igreja Católica.",
  },
  {
    year: "1970",
    title: "Sede própria inaugurada",
    text: "Em 30 de outubro de 1970, a escola inaugura sua sede própria, tornando-se a primeira escola estadual construída em alvenaria no município de Brasiléia.",
  },
  {
    year: "Décadas seguintes",
    title: "Formação de gerações",
    text: "A KJK consolida-se como referência educacional no Alto Acre, formando gerações de professores, técnicos e profissionais por meio dos cursos de Magistério, Contabilidade e outras modalidades.",
  },
  {
    year: "2018",
    title: "Ensino Médio em Tempo Integral",
    text: "A escola adere ao modelo de Ensino Médio em Tempo Integral, fortalecendo uma proposta pedagógica centrada na formação humana integral, com excelência acadêmica, protagonismo juvenil e preparação para o mundo do trabalho.",
  },
  {
    year: "Hoje",
    title: "Referência no Alto Acre",
    text: "Com mais de 55 anos de história, a KJK atende exclusivamente o Ensino Médio em Tempo Integral, com componentes inovadores como Projeto de Vida, Clubes de Protagonismo, Tutoria Educacional e Formação Técnica e Profissional.",
  },
];



function AEscola() {
  const [openLogo, setOpenLogo] = useState<{ src: string; alt: string } | null>(null);

  return (
    <Page>
      <PageHero
        eyebrow="Nossa identidade"
        title={<>Uma escola com história, propósito e gente que faz acontecer.</>}
        subtitle="Há mais de 55 anos transformando vidas pela educação no Alto Acre."
      />

      <section className="section-y">
        <div className="container-x grid gap-10 md:grid-cols-2 md:items-center lg:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <img
              src={buildingImg}
              alt="Fachada da escola"
              width={1600}
              height={1000}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
            />
            <div className="absolute -bottom-5 -right-3 hidden items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:flex transition-transform hover:-translate-y-1">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-3xl font-black text-primary">
                {getSchoolAge()}
              </div>
              <div className="pr-3 leading-tight">
                <div className="text-sm font-bold uppercase tracking-wider text-foreground">Anos de</div>
                <div className="text-sm font-medium text-muted-foreground">história</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src={logoOficial}
              alt="Brasão Oficial Escola Kairala José Kairala"
              className="mb-6 h-32 md:h-40 lg:h-48 w-auto object-contain drop-shadow-lg"
            />
            <div className="text-sm font-bold uppercase tracking-wider text-accent">A história</div>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Uma trajetória construída por gerações.
            </h2>
            <p className="mt-4 text-muted-foreground">
              A Escola Estadual de Ensino Médio em Tempo Integral Kairala José Kairala (KJK) é muito
              mais que uma instituição de ensino. É um patrimônio da educação acreana, um espaço de
              transformação social e um símbolo da esperança de milhares de jovens do Alto Acre.
            </p>
            <p className="mt-3 text-muted-foreground">
              Localizada em Brasiléia, a escola nasceu do sonho coletivo de oferecer educação pública
              de qualidade. Hoje, aliando excelência acadêmica, protagonismo juvenil, inovação,
              cultura de paz e formação técnica, a KJK forma cidadãos capazes de transformar a
              sociedade.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <div className="text-sm font-bold uppercase tracking-wider text-accent">O nome que carregamos</div>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Kairala José Kairala</h2>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex justify-center">
                <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
                  <img
                    src={kairalaPhoto}
                    alt="Kairala José Kairala"
                    className="h-64 w-44 object-cover object-top md:h-72 md:w-52"
                  />
                </div>
              </div>
              <div>
                <p className="mt-2 text-muted-foreground md:mt-5">
                  A escola leva o nome de Kairala José Kairala, comerciante, homem público acreano e
                  senador da República, cuja trajetória foi marcada pelo compromisso com o desenvolvimento
                  do Acre. Sua morte, em dezembro de 1963, durante um episódio histórico ocorrido no
                  plenário do Senado Federal, transformou seu nome em símbolo de respeito e memória para
                  o povo acreano.
                </p>
                <p className="mt-3 text-muted-foreground">
                  Ao homenageá-lo, a escola perpetua valores como compromisso público, coragem e
                  dedicação à sociedade — valores que seguem vivos em cada estudante que passa por nossas
                  salas.
                </p>
                <blockquote className="mt-6 rounded-2xl border border-border bg-card p-5 text-left shadow-[var(--shadow-card)]">
                  <p className="text-base font-semibold italic leading-relaxed md:text-lg">
                    "Kairala José Kairala. Uma história construída com educação, compromisso e
                    transformação. Um legado que inspira o presente e prepara o futuro."
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="text-sm font-bold uppercase tracking-wider text-accent">Linha do tempo</div>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Marcos da nossa caminhada</h2>

          <div className="relative mt-10 pl-8 md:pl-0">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-border md:left-1/2" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className={`relative grid gap-4 md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="md:text-right">
                    <div className="card-soft inline-block p-5">
                      <div className="text-xs font-bold uppercase tracking-wider text-accent">{t.year}</div>
                      <h3 className="mt-1 text-lg font-bold">{t.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-[-21px] top-6 h-3 w-3 rounded-full bg-primary ring-4 ring-background md:left-1/2 md:-translate-x-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-soft)", opacity: 0.5 }} />
        <div className="container-x">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
              <button
                onClick={() => setOpenLogo({ src: logoOficial, alt: "Brasão Oficial da Escola" })}
                className="group cursor-zoom-in focus:outline-none"
                aria-label="Ver brasão em tela cheia"
              >
                <img
                  src={logoOficial}
                  alt="Brasão Oficial da Escola"
                  className="h-36 md:h-48 w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
              </button>
              <div className="w-16 h-px sm:w-px sm:h-28 bg-border/80" />
              <button
                onClick={() => setOpenLogo({ src: logoTransparente, alt: "Logo Escola de Tempo Integral" })}
                className="group cursor-zoom-in focus:outline-none"
                aria-label="Ver logo em tela cheia"
              >
                <img
                  src={logoTransparente}
                  alt="Logo Escola de Tempo Integral"
                  className="h-36 md:h-48 w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            </div>
            <div className="text-sm font-bold uppercase tracking-wider text-accent">Nosso compromisso</div>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Tradição que abraça o futuro.</h2>
            <div className="mt-8 space-y-4 text-base text-muted-foreground leading-relaxed md:text-[17px]">
              <p>
                Duas marcas, uma única missão. O brasão oficial carrega a nossa tradição,
                representando as mais de cinco décadas de história de uma instituição pioneira
                na educação do Alto Acre.
              </p>
              <p>
                Ao seu lado, a marca do Ensino em Tempo Integral simboliza a inovação, o
                cuidado humano e o protagonismo juvenil. Juntas, elas contam quem somos:
                uma escola que tem profundo orgulho de suas raízes e legado, mas que se
                reinventa todos os dias para formar cidadãos éticos, críticos e prontos
                para construir uma nova sociedade.
              </p>
            </div>
          </div>
        </div>
      </section>
      {openLogo && (
        <LogoLightbox
          src={openLogo.src}
          alt={openLogo.alt}
          onClose={() => setOpenLogo(null)}
        />
      )}
    </Page>
  );
}
