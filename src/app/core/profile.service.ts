import { Injectable, signal } from '@angular/core';

export interface UserProfile {
  nome: string;
  idade: number;
  peso: number;
  altura: number;
  objetivo: 'hipertrofia' | 'emagrecimento' | 'condicionamento';
  experiencia: 'iniciante' | 'intermediario' | 'avancado';
  frequenciaSemanal: number;
  fichaPreenchida: boolean;
}

export const initialProfile: UserProfile = {
  nome: '',
  idade: 0,
  peso: 0,
  altura: 0,
  objetivo: 'hipertrofia',
  experiencia: 'iniciante',
  frequenciaSemanal: 3,
  fichaPreenchida: false,
};

const STORAGE_KEY = 'gymyx_profile';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  profile = signal<UserProfile>(this.loadFromStorage());

  private loadFromStorage(): UserProfile {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialProfile;
  }

  update(updated: UserProfile) {
    this.profile.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  clear() {
    this.profile.set(initialProfile);
    localStorage.removeItem(STORAGE_KEY);
  }
}
