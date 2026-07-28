import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { grupos } from "@/data/turmas";
import type { Turma } from "@/data/turmas";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/turmas/")({
  component: TurmasList,
});

const anoColors: Record<string, { from: string; to: string; accent: string }> = {
  "1º Ano": { from: "oklch(0.52 0.22 230)", to: "oklch(0.30 0.26 248)", accent: "oklch(0.72 0.18 210)" },
  "2º Ano": { from: "oklch(0.55 0.24 22)",  to: "oklch(0.32 0.26 8)",   accent: "oklch(0.72 0.18 35)"  },
  "3º Ano": { from: "oklch(0.50 0.22 278)", to: "oklch(0.28 0.26 295)", accent: "oklch(0.72 0.18 260)" },
};

function TurmaCard({ turma, index, anoNome }: { turma: Turma; index: number; anoNome: string }) {
  const colors = anoColors[anoNome];
  return (
    <Link
      to="/turmas/$turmaId"
      params={{ turmaId: turma.id }}
      className="group relative block overflow-hidden rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/30"
      style={{ animation: `fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s both` }}
    >
      {/* Card principal com sombra animada */}
      <div
        className="relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)]"
        style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.25)" }}
      >
        {/* Fundo gradiente */}
        <div
          className="relative h-56 w-full overflow-hidden"
          style={{ background: `linear-gradient(140deg, ${colors.from}, ${colors.to})` }}
        >
          {/* Orbe de luz no hover */}
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
            style={{ background: colors.accent }}
          />

          {/* Shimmer line */}
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-[200%]" />

          {/* Letra decorativa */}
          <span
            className="absolute -right-3 bottom-0 select-none text-[10rem] font-black leading-none text-white/10 transition-all duration-500 group-hover:text-white/18 group-hover:scale-110 origin-bottom-right"
          >
            {turma.letra}
          </span>

          {/* Conteúdo central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div
              className="text-5xl font-black tracking-tight drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
            >
              {turma.ano}
              <span className="text-3xl font-semibold opacity-75"> Ano</span>
            </div>
            <div className="mt-1.5 text-xl font-bold tracking-[0.2em] opacity-90 drop-shadow">
              TURMA {turma.letra}
            </div>
          </div>

          {/* Badge ano */}
          <div className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            Ensino Médio Integral
          </div>
        </div>

        {/* Botão inferior */}
        <div
          className="flex items-center justify-between px-6 py-4 transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, ${colors.from}18, ${colors.to}28)`,
            borderTop: `1px solid ${colors.from}30`,
          }}
        >
          <span
            className="text-sm font-bold transition-colors duration-300"
            style={{ color: colors.from }}
          >
            Conheça a turma
          </span>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          >
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function TurmasList() {
  return (
    <Page>
      <PageHero
        eyebrow="Vida escolar"
        title={<>Cada turma, uma comunidade. Cada ano, uma jornada.</>}
        subtitle="Conheça as turmas do Ensino Médio Integral da Kairala — clique para ver fotos, líder e vice-líder."
      />

      <section className="section-y">
        <div className="container-x space-y-20">
          {grupos.map((grupo) => {
            const colors = anoColors[grupo.ano];
            return (
              <div key={grupo.ano} style={{ animation: "fade-up 0.5s ease-out both" }}>
                {/* Cabeçalho do grupo */}
                <div className="mb-8 flex items-center gap-5">
                  <div
                    className="rounded-2xl px-6 py-2.5 text-white font-black text-base shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                  >
                    {grupo.ano}
                  </div>
                  <div
                    className="h-px flex-1 opacity-30"
                    style={{ background: `linear-gradient(to right, ${colors.from}, transparent)` }}
                  />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {grupo.turmas.map((turma, i) => (
                    <TurmaCard key={turma.id} turma={turma} index={i} anoNome={grupo.ano} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Page>
  );
}
