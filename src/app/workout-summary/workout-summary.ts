import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutSessionService } from '../core/workout-session.service';
import { WorkoutSession } from '../core/workout-session.model';

@Component({
  selector: 'app-workout-summary',
  standalone: true,
  imports: [],
  templateUrl: './workout-summary.html',
  styleUrl: './workout-summary.css',
})
export class WorkoutSummaryComponent implements OnInit {
  private router = inject(Router);
  private sessionService = inject(WorkoutSessionService);

  session: WorkoutSession | null = null;

  atributos = [
    { key: 'strength', label: 'Força' },
    { key: 'endurance', label: 'Resistência' },
    { key: 'discipline', label: 'Disciplina' },
    { key: 'nutrition', label: 'Nutrição' },
    { key: 'recovery', label: 'Recuperação' },
  ];

  ngOnInit() {
    const history = this.sessionService.history();
    if (history.length > 0) {
      this.session = history[0];
    } else {
      this.router.navigate(['/personagem']);
    }
  }

  get atributosGanhos() {
    if (!this.session) return [];
    return this.atributos
      .map((a) => ({
        label: a.label,
        ganho: this.session!.atributosGanhos[a.key as keyof typeof this.session.atributosGanhos],
      }))
      .filter((a) => a.ganho > 0);
  }

  continuar() {
    this.router.navigate(['/personagem']);
  }
}
