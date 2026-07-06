import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../core/character';
import { logWorkout, WorkoutType } from '../core/progression';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [],
  templateUrl: './workout.html',
  styleUrl: './workout.css',
})
export class WorkoutComponent {
  private characterService = inject(CharacterService);
  private router = inject(Router);

  log(type: WorkoutType) {
    const updated = logWorkout(type, this.characterService.character());
    this.characterService.update(updated);
    this.router.navigate(['/personagem']);
  }
}
