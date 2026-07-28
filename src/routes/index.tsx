import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/Layout";
import {
  GraduationCap,
  Sparkles,
  CalendarDays,
  HeartHandshake,
  ArrowRight,
  Clock,
  BookOpen,
  Users,
} from "lucide-react";
import schoolBuilding from "@/assets/school-building.jpg";
import eventsImg from "@/assets/events.jpg";
import tutoringImg from "@/assets/tutoring.jpg";
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
import { getSchoolAge } from "@/lib/school";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const highlights = [
  { icon: Clock, title: "Tempo Integral", text: "Jornada de 7h às 15h com aulas, tutorias, projetos e clubes." },
  { icon: Sparkles, title: "Clubes de Protagonismo", text: "Espaços de criatividade, liderança e desenvolvimento pessoal." },
  { icon: CalendarDays, title: "Eventos e Culminâncias", text: "Feiras culturais, gincanas, mostras e apresentações ao longo do ano." },
  { icon: HeartHandshake, title: "Tutoria Educacional", text: "Acompanhamento individual para construção de metas e projeto de vida." },
  { icon: GraduationCap, title: "Pós-Médio", text: "Preparação para o ENEM, vestibulares e o mundo do trabalho." },
];

const clubImgs = [
  imgLigaOlimpica, imgArenaIdeias, imgArtDraw, imgTheGoat,
  imgBelezaMovimento, imgEssenciaFeminina, imgCarimbo, imgMeuFuturo,
  imgLuzArte, imgPingPong, imgPodClass, imgLendas,
  imgTeatro, imgVoceImporta, imgEliteVolei, imgXadrez,
];

function ClubSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % clubImgs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
        {clubImgs.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Clube KJK"
            className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          />
        ))}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {clubImgs.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "1.5rem" : "0.375rem",
                background: i === current ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold">Clubes de Protagonismo</h3>
        <p className="mt-1 text-sm text-muted-foreground">Espaços de criatividade e liderança juvenil.</p>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <Page>
      <section className="relative isolate overflow-hidden">
        <img
          src={schoolBuilding}
          alt="Fachada da Escola Kairala José Kairala"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="hero-overlay absolute inset-0 -z-10" />

        <div className="container-x flex min-h-[80vh] flex-col justify-center py-20 text-white">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Brasiléia • Alto Acre
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl animate-[fade-up_0.8s_ease-out]">
            Escola{" "}
            <span className="bg-gradient-to-r from-white to-[oklch(0.85_0.18_26)] bg-clip-text text-transparent">
              Kairala José Kairala
            </span>
          </h1>
          <p className="mt-4 text-lg font-semibold text-white/95 sm:text-xl md:text-2xl animate-[fade-up_0.9s_ease-out]">
            Ensino Médio em Tempo Integral
          </p>
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base md:text-lg animate-[fade-up_1s_ease-out]">
            Há mais de {getSchoolAge()} anos formando jovens no Alto Acre. Uma escola pública, de verdade,
            com projeto de vida, protagonismo e compromisso com o futuro.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-[fade-up_1.1s_ease-out]">
            <Link to="/a-escola" className="btn-accent">
              Conheça a escola <ArrowRight size={18} />
            </Link>
            <Link to="/eventos" className="btn-ghost">
              Ver eventos
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 sm:gap-3 text-white/90">
            {[
              { k: `${getSchoolAge()} anos`, v: "de história" },
              { k: "7h–15h", v: "Integral" },
              { k: "Brasiléia", v: "Alto Acre" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-white/20 bg-white/5 p-3 sm:p-4 backdrop-blur">
                <div className="text-lg font-black sm:text-xl md:text-2xl whitespace-nowrap">{s.k}</div>
                <div className="mt-0.5 text-[10px] text-white/75 sm:text-xs md:text-sm whitespace-nowrap">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-accent">O que a KJK oferece</div>
              <h2 className="mt-2 max-w-2xl text-3xl font-black md:text-4xl">
                Uma formação completa, do primeiro ao terceiro ano.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              A KJK vai além dos conteúdos. Aqui, cada estudante constrói seu projeto de vida com apoio
              real de professores, tutores e toda a comunidade escolar.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className="card-soft group p-6"
                style={{ animation: `fade-up 0.5s ease-out ${i * 0.08}s both` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <h.icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container-x">
          <div className="text-sm font-bold uppercase tracking-wider text-accent">A escola em imagens</div>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Veja o que acontece aqui dentro.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ClubSlideshow />

            <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
              <div className="overflow-hidden">
                <img
                  src={eventsImg}
                  alt="Eventos e Culminâncias"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold">Eventos e Culminâncias</h3>
                <p className="mt-1 text-sm text-muted-foreground">Momentos de apresentação, cultura e celebração.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] sm:col-span-2 lg:col-span-1">
              <div className="overflow-hidden">
                <img
                  src={tutoringImg}
                  alt="Tutoria Educacional"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold">Tutoria Educacional</h3>
                <p className="mt-1 text-sm text-muted-foreground">Acompanhamento individual e construção de metas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x section-y">
        <div
          className="relative overflow-hidden rounded-3xl p-8 text-primary-foreground sm:p-10 md:p-14"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                {getSchoolAge()} anos de história
              </div>
              <h3 className="mt-4 text-2xl font-black sm:text-3xl md:text-4xl">
                Uma escola pública que transforma vidas.
              </h3>
              <p className="mt-3 max-w-xl text-white/85">
                Fundada em 1969, a KJK é patrimônio da educação acreana. Hoje, como escola de tempo
                integral, forma jovens críticos, éticos e protagonistas de suas próprias histórias.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/a-escola" className="btn-accent">
                  Nossa história
                </Link>
                <Link to="/turmas" className="btn-ghost">
                  Ver as turmas
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, label: "Comunidade" },
                { icon: BookOpen, label: "Aprendizagem" },
                { icon: Sparkles, label: "Protagonismo" },
                { icon: HeartHandshake, label: "Acolhimento" },
              ].map((it) => (
                <div key={it.label} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <it.icon size={20} />
                  <div className="mt-2 text-sm font-semibold">{it.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-6" />
    </Page>
  );
}
