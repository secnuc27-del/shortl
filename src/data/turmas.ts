export type Turma = {
  id: string;
  ano: string;
  letra: string;
  hue: number;
  lider: string;
  vice: string;
  descricao: string;
};

export const turmas: Turma[] = [
  { id: "1a", ano: "1º", letra: "A", hue: 218, lider: "Ana Clara Silva", vice: "Bruno Mendes", descricao: "Turma do 1º Ano A — acolhimento, integração e descoberta do Ensino Médio Integral." },
  { id: "1b", ano: "1º", letra: "B", hue: 228, lider: "Carla Souza", vice: "Diego Ferreira", descricao: "Turma do 1º Ano B — construindo laços e iniciando a jornada do Ensino Médio." },
  { id: "1c", ano: "1º", letra: "C", hue: 238, lider: "Eduarda Lima", vice: "Felipe Costa", descricao: "Turma do 1º Ano C — criatividade, energia e entusiasmo desde o início." },
  { id: "2a", ano: "2º", letra: "A", hue: 8,   lider: "Gabriela Rocha", vice: "Henrique Alves", descricao: "Turma do 2º Ano A — aprofundamento dos saberes e protagonismo estudantil." },
  { id: "2b", ano: "2º", letra: "B", hue: 18,  lider: "Isabela Nunes", vice: "João Pedro Reis", descricao: "Turma do 2º Ano B — projetos integradores e desenvolvimento de liderança." },
  { id: "2c", ano: "2º", letra: "C", hue: 28,  lider: "Karen Oliveira", vice: "Lucas Martins", descricao: "Turma do 2º Ano C — inovação, pesquisa e cultura escolar ativa." },
  { id: "3a", ano: "3º", letra: "A", hue: 256, lider: "Mariana Torres", vice: "Nicolas Borges", descricao: "Turma do 3º Ano A — foco no ENEM, projeto de vida e conquistas." },
  { id: "3b", ano: "3º", letra: "B", hue: 268, lider: "Olívia Pinto", vice: "Pedro Henrique", descricao: "Turma do 3º Ano B — determinação, união e preparação para o futuro." },
  { id: "3c", ano: "3º", letra: "C", hue: 280, lider: "Rebeca Castro", vice: "Samuel Dias", descricao: "Turma do 3º Ano C — a culminância de uma trajetória de crescimento e conquistas." },
];

export function getTurmaById(id: string): Turma | undefined {
  return turmas.find((t) => t.id === id);
}

export const grupos = [
  { ano: "1º Ano", cor: "from-blue-600 to-blue-800", turmas: turmas.filter((t) => t.ano === "1º") },
  { ano: "2º Ano", cor: "from-red-500 to-red-700",   turmas: turmas.filter((t) => t.ano === "2º") },
  { ano: "3º Ano", cor: "from-purple-600 to-purple-800", turmas: turmas.filter((t) => t.ano === "3º") },
];
