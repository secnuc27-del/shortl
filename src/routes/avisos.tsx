import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { AlertTriangle, Calendar, FileText, Users, Bell, BookOpen } from "lucide-react";

export const Route = createFileRoute("/avisos")({
  component: Avisos,
});

const urgent = [
  { title: "Reunião de pais — 3º ano", date: "Sexta, 14 de Março • 19h", text: "Encontro obrigatório para alinhar o calendário do ENEM e preparação final." },
];

const notices = [
  { icon: FileText, tag: "Provas", title: "Cronograma de provas bimestrais", date: "A partir de 18/03", text: "Confira o cronograma de provas do bimestre para todas as turmas." },
  { icon: Users, tag: "Reuniões", title: "Reunião de pais — 1º e 2º ano", date: "21 de Março, 19h", text: "Apresentação do plano pedagógico e devolutivas." },
  { icon: Calendar, tag: "Calendário", title: "Recesso de feriado nacional", date: "29 de Março", text: "Não haverá aulas. Retorno na segunda seguinte, em horário normal." },
  { icon: Bell, tag: "Comunicado", title: "Novo cardápio de almoço", date: "Atualizado", text: "Cardápio revisado pela nutricionista, disponível na recepção." },
  { icon: BookOpen, tag: "Aviso", title: "Inscrições nos clubes", date: "Até 25/03", text: "Período para escolha e ajustes dos clubes do semestre." },
  { icon: FileText, tag: "Eventos", title: "Feira Cultural 2025", date: "12 de Maio", text: "Tema deste ano: Culturas do Mundo. Confira as orientações por turma." },
];

function Avisos() {
  return (
    <Page>
      <PageHero
        eyebrow="Mural da escola"
        title={<>Avisos, comunicados e <span className="gradient-text">calendário</span>.</>}
        subtitle="Fique por dentro de tudo o que acontece na Kairala."
      />

      <section className="section-y">
        <div className="container-x space-y-10">
          {urgent.length > 0 && (
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                <AlertTriangle size={14} /> Urgente
              </div>
              <div className="mt-3 space-y-3">
                {urgent.map((u) => (
                  <div key={u.title} className="rounded-2xl border-l-4 border-accent bg-accent/5 p-6 shadow-[var(--shadow-soft)]">
                    <h3 className="text-lg font-bold">{u.title}</h3>
                    <div className="text-xs font-semibold text-accent">{u.date}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{u.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-black md:text-3xl">Comunicados recentes</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {notices.map((n, i) => (
                <article
                  key={n.title}
                  className="card-soft p-6"
                  style={{ animation: `fade-up 0.5s ease-out ${i * 0.05}s both` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      <n.icon size={20} />
                    </div>
                    <div className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {n.tag}
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-bold">{n.title}</h3>
                  <div className="text-xs font-semibold text-accent">{n.date}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{n.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
