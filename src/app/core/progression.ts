import { Character } from './character.model';

export type WorkoutType = 'forca' | 'cardio' | 'descanso';

// Ganho menor a cada nivel mais alto do atributo (efeito de saturacao)
function diminishingGain(currentValue: number, baseGain: number): number {
  const factor = 1 / (1 + currentValue / 50);
  return Math.max(0.5, baseGain * factor);
}

export function logWorkout(type: WorkoutType, character: Character): Character {
  const updated: Character = { ...character };

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

  // Disciplina cresce so com consistencia (streak), nao com volume
  updated.streakDays += 1;
  updated.discipline += diminishingGain(character.discipline, 1.5);

  // Sobe de nivel a cada 100 XP
  if (updated.xp >= updated.level * 100) {
    updated.level += 1;
  }

  return updated;
}
