export interface Character {
  level: number;
  xp: number;
  strength: number; // Forca
  endurance: number; // Resistencia
  discipline: number; // Disciplina (streak)
  nutrition: number; // Nutricao
  recovery: number; // Recuperacao
  streakDays: number;
}

export const initialCharacter: Character = {
  level: 1,
  xp: 0,
  strength: 0,
  endurance: 0,
  discipline: 0,
  nutrition: 0,
  recovery: 0,
  streakDays: 0,
};
