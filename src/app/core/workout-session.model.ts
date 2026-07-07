export interface WorkoutExercise {
  nome: string;
  equipamento: string;
  subgrupo: string;
  series: number;
  repeticoes: number;
  carga: number;
}

export interface WorkoutSession {
  id: string;
  data: string;
  grupoMuscular: string;
  exercicios: WorkoutExercise[];
  duracaoMin: number;
  xpGanho: number;
  atributosGanhos: {
    strength: number;
    endurance: number;
    discipline: number;
    nutrition: number;
    recovery: number;
  };
}

export function createSession(grupoMuscular: string): WorkoutSession {
  return {
    id: Date.now().toString(),
    data: new Date().toISOString(),
    grupoMuscular,
    exercicios: [],
    duracaoMin: 0,
    xpGanho: 0,
    atributosGanhos: {
      strength: 0,
      endurance: 0,
      discipline: 0,
      nutrition: 0,
      recovery: 0,
    },
  };
}
