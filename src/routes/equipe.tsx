import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";

export const Route = createFileRoute("/equipe")({
  component: Equipe,
});

const team = {
  Gestão: [
    { name: "Mariana Kairala", role: "Diretora geral", desc: "Liderança pedagógica há mais de 20 anos." },
    { name: "Ricardo Andrade", role: "Vice-diretor", desc: "Gestão administrativa e relações institucionais." },
  ],
  Coordenação: [
    { name: "Lúcia Mendes", role: "Coordenadora pedagógica", desc: "Acompanha currículo, projetos e formação docente." },
    { name: "Felipe Tavares", role: "Coordenador de turno", desc: "Organização da rotina integral e acolhimento." },
    { name: "Joana Reis", role: "Coordenadora de clubes", desc: "Articulação das atividades criativas e culturais." },
  ],
  Professores: [
    { name: "Ana Lima", role: "Língua Portuguesa", desc: "Mediação literária e produção textual." },
    { name: "Carlos Souza", role: "Matemática", desc: "Resolução de problemas e olimpíadas." },
    { name: "Rafael Costa", role: "Biologia", desc: "Iniciação científica e laboratório." },
    { name: "Bianca Tavares", role: "História", desc: "Pensamento crítico e cidadania." },
    { name: "Pedro Alves", role: "Física", desc: "Experimentação e projetos integradores." },
    { name: "Júlia Borges", role: "Química", desc: "Práticas de laboratório e contexto cotidiano." },
    { name: "Helena Dias", role: "Filosofia & Sociologia", desc: "Projeto de vida e ética." },
    { name: "Marcos Pinto", role: "Educação Física", desc: "Esportes, saúde e cultura corporal." },
  ],
};

function avatarGradient(seed: number) {
  return `linear-gradient(135deg, oklch(0.65 0.18 ${(seed * 47) % 360}), oklch(0.4 0.2 ${(seed * 73) % 360}))`;
}

function Equipe() {
  let idx = 0;
  return (
    <Page>
      <PageHero
        eyebrow="Quem faz a Kairala"
        title={<>Pessoas que <span className="gradient-text">ensinam</span> e cuidam.</>}
        subtitle="Uma equipe comprometida com a formação integral de cada estudante."
      />

      <section className="section-y">
        <div className="container-x space-y-14">
          {Object.entries(team).map(([group, people]) => (
            <div key={group}>
              <div className="text-sm font-bold uppercase tracking-wider text-accent">{group}</div>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">{group}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {people.map((p) => {
                  const i = idx++;
                  return (
                    <article key={p.name} className="card-soft p-6 text-center">
                      <div
                        className="mx-auto grid h-20 w-20 place-items-center rounded-full text-2xl font-black text-white shadow-[var(--shadow-soft)]"
                        style={{ background: avatarGradient(i + 1) }}
                      >
                        {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <h3 className="mt-4 text-base font-bold">{p.name}</h3>
                      <div className="text-xs font-semibold text-accent">{p.role}</div>
                      <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
