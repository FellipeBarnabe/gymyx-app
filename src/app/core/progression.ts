import { Character } from './character.model';
import { WorkoutExercise } from './workout-session.model';

export type WorkoutType = 'forca' | 'cardio' | 'descanso';

function diminishingGain(currentValue: number, baseGain: number): number {
  const factor = 1 / (1 + currentValue / 50);
  return Math.max(0.5, baseGain * factor);
}

const grupoParaAtributos: Record<string, { atributo: keyof Character; ganho: number }[]> = {
  Peito: [
    { atributo: 'strength', ganho: 3 },
    { atributo: 'endurance', ganho: 0.5 },
  ],
  Ombro: [
    { atributo: 'strength', ganho: 2 },
    { atributo: 'discipline', ganho: 0.5 },
  ],
  Tríceps: [{ atributo: 'strength', ganho: 2 }],
  Costas: [
    { atributo: 'strength', ganho: 3 },
    { atributo: 'endurance', ganho: 1 },
  ],
  Bíceps: [{ atributo: 'strength', ganho: 2 }],
  Antebraço: [{ atributo: 'strength', ganho: 1 }],
  Pernas: [
    { atributo: 'strength', ganho: 4 },
    { atributo: 'endurance', ganho: 2 },
  ],
  Abdômen: [
    { atributo: 'discipline', ganho: 1 },
    { atributo: 'recovery', ganho: 0.5 },
  ],
};

export function logWorkoutSession(
  grupoMuscular: string,
  exercicios: WorkoutExercise[],
  character: Character,
): {
  updatedCharacter: Character;
  xpGanho: number;
  atributosGanhos: {
    strength: number;
    endurance: number;
    discipline: number;
    nutrition: number;
    recovery: number;
  };
} {
  const updated: Character = { ...character };
  const atributosGanhos = {
    strength: 0,
    endurance: 0,
    discipline: 0,
    nutrition: 0,
    recovery: 0,
  };
  let xpGanho = 0;

  exercicios.forEach((ex) => {
    const subgrupo = ex.subgrupo;
    const mapeamento = grupoParaAtributos[subgrupo] ?? [
      { atributo: 'strength' as keyof Character, ganho: 1 },
    ];
    const multiplicadorCarga = ex.carga > 0 ? 1 + ex.carga / 100 : 1;

    mapeamento.forEach(({ atributo, ganho }) => {
      const ganhoReal = diminishingGain(updated[atributo] as number, ganho * multiplicadorCarga);
      (updated[atributo] as number) += ganhoReal;
      if (atributo in atributosGanhos) {
        atributosGanhos[atributo as keyof typeof atributosGanhos] += ganhoReal;
      }
    });

    xpGanho += Math.round(10 * ex.series * multiplicadorCarga);
  });

  updated.streakDays += 1;
  updated.discipline += diminishingGain(character.discipline, 1.5);
  updated.xp += xpGanho;

  if (updated.xp >= updated.level * 100) {
    updated.level += 1;
  }

  return { updatedCharacter: updated, xpGanho, atributosGanhos };
}

export function logWorkout(type: WorkoutType, character: Character): Character {
  const updated = { ...character };
  if (type === 'forca') {
    updated.strength += diminishingGain(character.strength, 3);
    updated.xp += 10;
  }
  if (type === 'cardio') {
    updated.endurance += diminishingGain(character.endurance, 3);
    updated.xp += 10;
  }
  if (type === 'descanso') {
    updated.recovery += diminishingGain(character.recovery, 2);
    updated.xp += 4;
  }
  updated.streakDays += 1;
  updated.discipline += diminishingGain(character.discipline, 1.5);
  if (updated.xp >= updated.level * 100) updated.level += 1;
  return updated;
}
