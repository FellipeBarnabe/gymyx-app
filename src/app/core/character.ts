import { Injectable, signal } from '@angular/core';
import { Character, initialCharacter } from './character.model';

const STORAGE_KEY = 'gymyx_character';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  character = signal<Character>(this.loadFromStorage());

  private loadFromStorage(): Character {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCharacter;
  }

  update(updated: Character) {
    this.character.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}
