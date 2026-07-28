import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { Sun, BookOpen, Coffee, Utensils, Sparkles, HeartHandshake, Activity, LogOut } from "lucide-react";

export const Route = createFileRoute("/ensino-integral")({
  component: EnsinoIntegral,
});

const routine = [
  { time: "07:00", icon: Sun, title: "Acolhida e entrada", text: "Início do dia com momento coletivo e organização das turmas." },
  { time: "07:30", icon: BookOpen, title: "Aulas da manhã", text: "Conteúdos curriculares com metodologias ativas." },
  { time: "09:30", icon: Coffee, title: "Intervalo", text: "Pausa para descanso, lanche e convivência." },
  { time: "10:00", icon: BookOpen, title: "Aulas e projetos", text: "Continuação dos componentes e trabalhos integradores." },
  { time: "12:00", icon: Utensils, title: "Almoço e convivência", text: "Refeição em comunidade e tempo para relaxar." },
  { time: "13:00", icon: Sparkles, title: "Clubes", text: "Atividades de criatividade, esporte, ciência e cultura." },
  { time: "14:00", icon: HeartHandshake, title: "Tutorias e estudo", text: "Acompanhamento individual, escuta e construção de metas." },
  { time: "14:45", icon: Activity, title: "Encerramento", text: "Avaliação do dia e organização para amanhã." },
  { time: "15:00", icon: LogOut, title: "Saída", text: "Fim do turno integral, com tranquilidade e segurança." },
];

function EnsinoIntegral() {
  return (
    <Page>
      <PageHero
        eyebrow="Tempo integral"
        title={<>Uma jornada completa, das <span className="gradient-text">7h às 15h</span>.</>}
        subtitle="No Ensino Médio Integral da Kairala, cada hora do dia é pensada para o aprendizado, a convivência e o desenvolvimento pessoal."
      />

      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { k: "8h/dia", v: "de vivência escolar" },
              { k: "+10", v: "clubes e oficinas" },
              { k: "1:1", v: "tutoria individual" },
            ].map((s) => (
              <div key={s.k} className="card-soft p-7 text-center">
                <div className="text-4xl font-black text-primary md:text-5xl">{s.k}</div>
                <div className="mt-1 text-sm font-medium text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-sm font-bold uppercase tracking-wider text-accent">Rotina do aluno</div>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Um dia na Kairala</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Da entrada à saída, cada momento foi pensado para equilibrar aprendizado, descanso e
              desenvolvimento humano.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {routine.map((r, i) => (
                <div
                  key={r.time}
                  className="card-soft p-6"
                  style={{ animation: `fade-up 0.5s ease-out ${i * 0.05}s both` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      <r.icon size={20} />
                    </div>
                    <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                      {r.time}
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
