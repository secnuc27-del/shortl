import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { Calendar, ArrowRight, Star } from "lucide-react";
import eventsImg from "@/assets/events.jpg";

export const Route = createFileRoute("/eventos")({
  component: Eventos,
});

const events = [
  { title: "Feira Cultural", date: "12 de Maio", desc: "Apresentação de projetos integradores e culturas do mundo.", hue: 258 },
  { title: "Gincana Estudantil", date: "08 de Junho", desc: "Provas, desafios e muita energia entre as turmas.", hue: 22 },
  { title: "Mostra de Arte", date: "20 de Junho", desc: "Exposição dos clubes de desenho, fotografia e pintura.", hue: 280 },
  { title: "Festival de Música", date: "15 de Julho", desc: "Apresentações dos clubes de música e dança.", hue: 340 },
  { title: "Semana de Palestras", date: "03 a 07 de Agosto", desc: "Convidados, mesas-redondas e orientações de carreira.", hue: 200 },
  { title: "Olimpíadas Esportivas", date: "10 de Setembro", desc: "Modalidades coletivas e individuais na quadra.", hue: 30 },
  { title: "Datas Comemorativas", date: "Ao longo do ano", desc: "Celebrações que fortalecem a comunidade escolar.", hue: 160 },
  { title: "Mostra Científica", date: "22 de Outubro", desc: "Experimentos e iniciação científica do clube de ciências.", hue: 240 },
  { title: "Culminância dos Clubes", date: "05 de Dezembro", desc: "Encerramento do ano com apresentações de todos os clubes.", hue: 260 },
];

function Eventos() {
  return (
    <Page>
      <PageHero
        eyebrow="Agenda viva"
        title={<>Uma escola que <span className="gradient-text">acontece</span>.</>}
        subtitle="A Kairala realiza eventos durante todo o ano — momentos que celebram aprendizagem, cultura e comunidade."
      />

      {/* Featured */}
      <section className="section-y">
        <div className="container-x">
          <div className="text-sm font-bold uppercase tracking-wider text-accent">Eventos em destaque</div>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Não perca essas datas</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="card-soft relative overflow-hidden p-0">
              <img src={eventsImg} alt="Evento" width={1600} height={1000} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <Star size={12} /> Destaque
                </div>
                <h3 className="mt-3 text-2xl font-black md:text-3xl">Culminância dos Clubes 2025</h3>
                <p className="mt-1 text-white/85">05 de Dezembro • Encerramento do ano letivo com apresentações de todos os clubes.</p>
              </div>
            </div>
            <div className="grid gap-5">
              {events.slice(0, 2).map((e) => (
                <div key={e.title} className="card-soft p-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                    <Calendar size={14} /> {e.date}
                  </div>
                  <h4 className="mt-2 text-xl font-bold">{e.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                  <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent">
                    Ver mais <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All events */}
      <section className="section-y bg-muted/40">
        <div className="container-x">
          <h2 className="text-3xl font-black md:text-4xl">Agenda do ano</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e, i) => (
              <article
                key={e.title}
                className="card-soft overflow-hidden p-0"
                style={{ animation: `fade-up 0.5s ease-out ${i * 0.05}s both` }}
              >
                <div
                  className="h-32"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.6 0.2 ${e.hue}), oklch(0.4 0.18 ${(e.hue + 30) % 360}))`,
                  }}
                />
                <div className="p-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                    <Calendar size={14} /> {e.date}
                  </div>
                  <h3 className="mt-2 text-lg font-bold">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                  <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent">
                    Ver mais <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
