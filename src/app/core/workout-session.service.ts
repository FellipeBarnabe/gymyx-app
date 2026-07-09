import { Injectable, signal } from '@angular/core';
import { WorkoutSession, WorkoutExercise, createSession } from './workout-session.model';

const STORAGE_KEY = 'gymyx_workout_history';

@Injectable({ providedIn: 'root' })
export class WorkoutSessionService {
  currentSession = signal<WorkoutSession | null>(null);
  history = signal<WorkoutSession[]>(this.loadHistory());

  private loadHistory(): WorkoutSession[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  startSession(grupoMuscular: string) {
    this.currentSession.set(createSession(grupoMuscular));
  }

  addExercise(exercise: WorkoutExercise) {
    const session = this.currentSession();
    if (!session) return;
    const updated = {
      ...session,
      exercicios: [...session.exercicios, exercise],
    };
    this.currentSession.set(updated);
  }

  finishSession(xpGanho: number, atributosGanhos: WorkoutSession['atributosGanhos']) {
    const session = this.currentSession();
    if (!session) return;
    const finished: WorkoutSession = {
      ...session,
      xpGanho,
      atributosGanhos,
    };
    const newHistory = [finished, ...this.history()];
    this.history.set(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    this.currentSession.set(null);
  }

  cancelSession() {
    this.currentSession.set(null);
  }
}
