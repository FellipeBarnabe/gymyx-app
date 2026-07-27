import { Injectable, signal, inject } from '@angular/core';
import { Character, initialCharacter } from './character.model';
import { DatabaseService } from './database.service';
import { AuthService } from './auth';
import { effect } from '@angular/core';

const STORAGE_KEY = 'gymyx_character';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private db = inject(DatabaseService);
  private authService = inject(AuthService);

  character = signal<Character>(this.loadFromStorage());

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.syncFromCloud();
      }
    });
  }

  private loadFromStorage(): Character {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCharacter;
  }

  private async syncFromCloud() {
    const cloudCharacter = await this.db.loadCharacter();
    this.character.set(cloudCharacter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudCharacter));
  }

  update(updated: Character) {
    this.character.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    this.db.saveCharacter(updated);
  }
}
