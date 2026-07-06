import { Routes } from '@angular/router';
import { CharacterComponent } from './character/character';
import { WorkoutComponent } from './workout/workout';

export const routes: Routes = [
  { path: '', redirectTo: 'personagem', pathMatch: 'full' },
  { path: 'personagem', component: CharacterComponent },
  { path: 'treino', component: WorkoutComponent },
];
