import { Injectable, signal, inject, effect } from '@angular/core';
import { DatabaseService } from './database.service';
import { AuthService } from './auth';

export interface BodyMeasurement {
  data: string;
  bracoDireito: number;
  bracoEsquerdo: number;
  triceps: number;
  peito: number;
  coxa: number;
  panturrilha: number;
  gluteos: number;
}

export interface UserProfile {
  nome: string;
  idade: number;
  peso: number;
  altura: number;
  objetivo: 'hipertrofia' | 'emagrecimento' | 'condicionamento';
  experiencia: 'iniciante' | 'intermediario' | 'avancado';
  frequenciaSemanal: number;
  fichaPreenchida: boolean;
  medidasHistorico: BodyMeasurement[];
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
  medidasHistorico: [],
};

const STORAGE_KEY = 'gymyx_profile';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private db = inject(DatabaseService);
  private authService = inject(AuthService);

  profile = signal<UserProfile>(this.loadFromStorage());

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.syncFromCloud();
      }
    });
  }

  private loadFromStorage(): UserProfile {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialProfile;
    const parsed = JSON.parse(saved);
    if (!parsed.medidasHistorico) parsed.medidasHistorico = [];
    return parsed;
  }

  private async syncFromCloud() {
    const cloudProfile = await this.db.loadProfile();
    this.profile.set(cloudProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudProfile));
  }

  update(updated: UserProfile) {
    this.profile.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    this.db.saveProfile(updated);
  }

  addMedida(medida: BodyMeasurement) {
    const current = this.profile();
    const updated: UserProfile = {
      ...current,
      medidasHistorico: [medida, ...current.medidasHistorico],
    };
    this.update(updated);
  }

  getUltimaMedida(): BodyMeasurement | null {
    const historico = this.profile().medidasHistorico;
    return historico.length > 0 ? historico[0] : null;
  }

  getPenultimaMedida(): BodyMeasurement | null {
    const historico = this.profile().medidasHistorico;
    return historico.length > 1 ? historico[1] : null;
  }

  clear() {
    this.profile.set(initialProfile);
    localStorage.removeItem(STORAGE_KEY);
  }
}
