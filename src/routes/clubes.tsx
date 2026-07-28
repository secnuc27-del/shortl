import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { Sparkles } from "lucide-react";

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

function Clubes() {
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
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-lg"
                style={{ animation: `scale-in 0.4s ease-out ${i * 0.04}s both` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
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
    </Page>
  );
}
