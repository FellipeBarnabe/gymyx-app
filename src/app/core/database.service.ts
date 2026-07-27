import { Injectable, inject } from '@angular/core';
import { ref, set, get, onValue } from 'firebase/database';
import { db } from './firebase.config';
import { AuthService } from './auth';
import { Character, initialCharacter } from './character.model';
import { UserProfile, initialProfile } from './profile.service';
import { WorkoutSession } from './workout-session.model';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private authService = inject(AuthService);

  private get uid(): string | null {
    return this.authService.userId;
  }

  // PERSONAGEM
  async saveCharacter(character: Character): Promise<void> {
    if (!this.uid) return;
    await set(ref(db, `users/${this.uid}/character`), character);
  }

  async loadCharacter(): Promise<Character> {
    if (!this.uid) return initialCharacter;
    const snapshot = await get(ref(db, `users/${this.uid}/character`));
    return snapshot.exists() ? snapshot.val() : initialCharacter;
  }

  // PERFIL
  async saveProfile(profile: UserProfile): Promise<void> {
    if (!this.uid) return;
    await set(ref(db, `users/${this.uid}/profile`), profile);
  }

  async loadProfile(): Promise<UserProfile> {
    if (!this.uid) return initialProfile;
    const snapshot = await get(ref(db, `users/${this.uid}/profile`));
    return snapshot.exists() ? snapshot.val() : initialProfile;
  }

  // HISTÓRICO DE TREINOS
  async saveWorkoutHistory(history: WorkoutSession[]): Promise<void> {
    if (!this.uid) return;
    await set(ref(db, `users/${this.uid}/workoutHistory`), history);
  }

  async loadWorkoutHistory(): Promise<WorkoutSession[]> {
    if (!this.uid) return [];
    const snapshot = await get(ref(db, `users/${this.uid}/workoutHistory`));
    return snapshot.exists() ? snapshot.val() : [];
  }
}
