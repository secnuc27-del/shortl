import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Page } from "@/components/Layout";
import { getTurmaById } from "@/data/turmas";
import { Crown, Star, ArrowLeft, Users, BookOpen, Lightbulb, Calendar } from "lucide-react";

export const Route = createFileRoute("/turmas/$turmaId")({
  component: TurmaDetalhe,
  loader: ({ params }) => {
    const turma = getTurmaById(params.turmaId);
    if (!turma) throw notFound();
    return turma;
  },
});

function PhotoBlock({ label, hue, aspect = "21/9" }: { label: string; hue: number; aspect?: string }) {
  return (
    <div
      className="w-full rounded-2xl flex flex-col items-center justify-center gap-3 text-white/60 font-medium"
      style={{
        aspectRatio: aspect,
        background: `linear-gradient(135deg, oklch(0.40 0.16 ${hue}), oklch(0.25 0.20 ${(hue + 40) % 360}))`,
      }}
    >
      <div className="text-5xl opacity-60">📷</div>
      <div className="text-sm text-center px-6 max-w-xs opacity-70">{label}</div>
    </div>
  );
}

function TurmaDetalhe() {
  const turma = Route.useLoaderData();
  const router = useRouter();
  const goBack = () => router.history.back();
  const fromColor = `oklch(0.50 0.22 ${turma.hue})`;
  const toColor = `oklch(0.28 0.25 ${(turma.hue + 50) % 360})`;
  const accentColor = `oklch(0.72 0.18 ${turma.hue})`;

  return (
    <Page>
      {/* ── Barra de voltar ──────────────────────────── */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm px-4 py-3" style={{ animation: "fade-up 0.4s ease both" }}>
        <div className="container-x">
          <button
            onClick={goBack}
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary-soft hover:text-primary hover:shadow-md"
          >
            <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Todas as turmas
          </button>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-14 pb-16 text-white"
        style={{ background: `linear-gradient(150deg, ${fromColor}, ${toColor})` }}
      >
        {/* Orbes decorativos */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
        />
        <div
          className="pointer-events-none absolute left-1/3 bottom-0 h-64 w-64 rounded-full opacity-15 blur-3xl"
          style={{ background: accentColor }}
        />

        {/* Letra decorativa de fundo */}
        <span
          className="pointer-events-none absolute -right-4 bottom-0 select-none text-[20rem] font-black leading-none text-white/[0.06]"
          style={{ animation: "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
        >
          {turma.letra}
        </span>

        <div className="container-x relative z-10">
          {/* Título */}
          <div
            className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-2"
            style={{ animation: "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
          >
            Ensino Médio Integral
          </div>
          <h1
            className="text-7xl font-black tracking-tight drop-shadow-xl md:text-9xl"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}
          >
            {turma.ano}
            <span className="opacity-60 ml-1">Ano {turma.letra}</span>
          </h1>
          <p
            className="mt-3 max-w-lg text-base text-white/75"
            style={{ animation: "fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}
          >
            {turma.descricao}
          </p>
        </div>
      </section>

      {/* ── Conteúdo ──────────────────────────────────── */}
      <div className="container-x py-16 space-y-16">

        {/* Foto da turma */}
        <section style={{ animation: "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both" }}>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl text-white shadow-md" style={{ background: `linear-gradient(135deg, ${fromColor}, ${toColor})` }}>
              <Users size={18} />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-accent">Registro</div>
              <h2 className="text-2xl font-black">Foto da Turma</h2>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <PhotoBlock label={`Foto da Turma ${turma.ano} Ano ${turma.letra} — a ser adicionada`} hue={turma.hue} aspect="21/9" />
          </div>
        </section>

        {/* Líderes */}
        <section style={{ animation: "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.35s both" }}>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-50 text-amber-500 shadow-md ring-1 ring-amber-200">
              <Crown size={18} />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-accent">Representação</div>
              <h2 className="text-2xl font-black">Liderança da Turma</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Líder */}
            <div
              className="overflow-hidden rounded-3xl shadow-xl"
              style={{ animation: "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s both" }}
            >
              <div
                className="flex items-center gap-3 px-6 py-4"
                style={{ background: `linear-gradient(135deg, ${fromColor}, ${toColor})` }}
              >
                <Crown size={16} className="text-amber-300" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">Líder de Turma</span>
              </div>
              <div className="bg-card p-6">
                <div className="overflow-hidden rounded-2xl">
                  <PhotoBlock label="Foto do Líder — a ser adicionada" hue={turma.hue} aspect="1/1" />
                </div>
                <div className="mt-5">
                  <div className="text-xl font-black text-foreground">{turma.lider}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">Líder de Turma · {turma.ano} Ano {turma.letra}</div>
                </div>
              </div>
            </div>

            {/* Vice */}
            <div
              className="overflow-hidden rounded-3xl shadow-xl"
              style={{ animation: "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.48s both" }}
            >
              <div
                className="flex items-center gap-3 px-6 py-4"
                style={{ background: `linear-gradient(135deg, oklch(0.48 0.20 ${(turma.hue + 35) % 360}), oklch(0.28 0.24 ${(turma.hue + 65) % 360}))` }}
              >
                <Star size={16} className="text-yellow-300" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">Vice-Líder</span>
              </div>
              <div className="bg-card p-6">
                <div className="overflow-hidden rounded-2xl">
                  <PhotoBlock label="Foto do Vice-Líder — a ser adicionada" hue={(turma.hue + 35) % 360} aspect="1/1" />
                </div>
                <div className="mt-5">
                  <div className="text-xl font-black text-foreground">{turma.vice}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">Vice-Líder · {turma.ano} Ano {turma.letra}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Informações extras */}
        <section style={{ animation: "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s both" }}>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary shadow-md">
              <BookOpen size={18} />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-accent">Sobre a turma</div>
              <h2 className="text-2xl font-black">Informações</h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: BookOpen,  color: `${fromColor}20`, iconColor: fromColor, title: "Projeto da Turma", text: "Espaço para o projeto integrador — a ser preenchido." },
              { icon: Lightbulb, color: "oklch(0.97 0.04 80)", iconColor: "oklch(0.7 0.15 80)", title: "Clubes e Atividades", text: "Participação em clubes do semestre — a ser preenchido." },
              { icon: Calendar,  color: "oklch(0.97 0.04 145)", iconColor: "oklch(0.6 0.15 145)", title: "Agenda da Turma", text: "Eventos e datas importantes — a ser preenchido." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="card-soft p-6"
                style={{ animation: `fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${0.6 + i * 0.08}s both` }}
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl mb-4"
                  style={{ background: item.color, color: item.iconColor }}
                >
                  <item.icon size={22} />
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Botão de volta inferior */}
        <div
          className="pt-6 border-t border-border"
          style={{ animation: "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.75s both" }}
        >
          <button
            onClick={goBack}
            className="group inline-flex items-center gap-3 rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: `linear-gradient(135deg, ${fromColor}, ${toColor})` }}
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Voltar para todas as turmas
          </button>
        </div>
      </div>
    </Page>
  );
}
