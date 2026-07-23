import { Routes } from '@angular/router';
import { CharacterComponent } from './character/character';
import { WorkoutComponent } from './workout/workout';
import { ProfileComponent } from './profile/profile';
import { WorkoutSummaryComponent } from './workout-summary/workout-summary';
import { BodyMeasurementsComponent } from './body-measurements/body-measurements';
import { ProgressComponent } from './progress/progress';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'personagem', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'personagem', component: CharacterComponent },
  { path: 'treino', component: WorkoutComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'resumo', component: WorkoutSummaryComponent },
  { path: 'medidas', component: BodyMeasurementsComponent },
  { path: 'progresso', component: ProgressComponent },
];
