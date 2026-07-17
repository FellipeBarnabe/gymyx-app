import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService, UserProfile } from '../core/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private router = inject(Router);

  form: UserProfile = {
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

  ngOnInit() {
    const saved = this.profileService.profile();
    if (saved.fichaPreenchida) {
      this.form = { ...saved };
    }
  }

  salvar() {
    this.form.fichaPreenchida = true;
    this.profileService.update(this.form);
    this.router.navigate(['/personagem']);
  }

  pular() {
    this.router.navigate(['/personagem']);
  }
}
