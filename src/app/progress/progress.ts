import { Component, inject, computed } from '@angular/core';
import { CharacterService } from '../core/character';
import { WorkoutSessionService } from '../core/workout-session.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class ProgressComponent {
  private characterService = inject(CharacterService);
  private sessionService = inject(WorkoutSessionService);

  character = computed(() => this.characterService.character());
  history = computed(() => this.sessionService.history());

  atributos = [
    { key: 'strength', label: 'Força', cor: '#C9A227' },
    { key: 'endurance', label: 'Resistência', cor: '#2D9CDB' },
    { key: 'discipline', label: 'Disciplina', cor: '#27AE60' },
    { key: 'nutrition', label: 'Nutrição', cor: '#EB5757' },
    { key: 'recovery', label: 'Recuperação', cor: '#9B51E0' },
  ];

  getValor(key: string): number {
    return (this.character() as any)[key] ?? 0;
  }

  getWidth(key: string): number {
    return Math.min(this.getValor(key), 100);
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  get totalTreinos(): number {
    return this.history().length;
  }

  get streakDias(): number {
    return this.character().streakDays;
  }

  get nivel(): number {
    return this.character().level;
  }

  get xp(): number {
    return this.character().xp;
  }

  get xpProximoNivel(): number {
    return this.character().level * 100;
  }

  get xpPercent(): number {
    return Math.min((this.xp / this.xpProximoNivel) * 100, 100);
  }

  get recordes(): { exercicio: string; carga: number; data: string }[] {
    const map = new Map<string, { carga: number; data: string }>();
    this.history().forEach((session) => {
      session.exercicios.forEach((ex) => {
        if (ex.carga > 0) {
          const atual = map.get(ex.nome);
          if (!atual || ex.carga > atual.carga) {
            map.set(ex.nome, { carga: ex.carga, data: session.data });
          }
        }
      });
    });
    return Array.from(map.entries())
      .map(([exercicio, val]) => ({ exercicio, ...val }))
      .sort((a, b) => b.carga - a.carga);
  }
}
