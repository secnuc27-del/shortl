import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import tutoringImg from "@/assets/tutoring.jpg";
import { Compass, Ear, Target, TrendingUp, HandHeart } from "lucide-react";

export const Route = createFileRoute("/tutorias")({
  component: Tutorias,
});

const cards = [
  { icon: Compass, title: "Acompanhamento", text: "Cada aluno tem um tutor que acompanha sua jornada acadêmica e pessoal." },
  { icon: HandHeart, title: "Apoio escolar", text: "Reforço, organização dos estudos e estratégias de aprendizagem." },
  { icon: Target, title: "Construção de metas", text: "Objetivos de curto, médio e longo prazo definidos com o aluno." },
  { icon: Ear, title: "Escuta", text: "Espaço seguro para falar, ser ouvido e se sentir acolhido." },
  { icon: TrendingUp, title: "Desenvolvimento", text: "Habilidades socioemocionais e projeto de vida em prática." },
];

function Tutorias() {
  return (
    <Page>
      <PageHero
        eyebrow="Cuidar para formar"
        title={<>Quando cada aluno é <span className="gradient-text">visto</span>, a escola transforma.</>}
        subtitle="A tutoria é o coração da Kairala. Um espaço de escuta, orientação e parceria para o crescimento de cada estudante."
      />

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <img src={tutoringImg} alt="Tutoria" width={1600} height={1000} loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[var(--shadow-card)]" />
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-accent">O que é a tutoria</div>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Um olhar próximo para cada jornada.</h2>
            <p className="mt-4 text-muted-foreground">
              Mais do que aulas, oferecemos um vínculo. Cada tutor acompanha um grupo de alunos
              ao longo do ano, criando espaço para conversas, planejamentos e construção conjunta
              de objetivos.
            </p>
            <p className="mt-3 text-muted-foreground">
              A tutoria fortalece a autonomia, o pertencimento e a confiança — pilares essenciais
              para o sucesso acadêmico e para a vida.
            </p>
          </div>
        </div>

        <div className="container-x mt-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map((c, i) => (
              <div
                key={c.title}
                className="card-soft p-6"
                style={{ animation: `fade-up 0.5s ease-out ${i * 0.08}s both` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                  <c.icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
