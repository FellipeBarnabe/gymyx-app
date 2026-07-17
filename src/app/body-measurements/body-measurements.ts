import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService, BodyMeasurement } from '../core/profile.service';

@Component({
  selector: 'app-body-measurements',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './body-measurements.html',
  styleUrl: './body-measurements.css',
})
export class BodyMeasurementsComponent {
  private profileService = inject(ProfileService);
  private router = inject(Router);

  form = {
    bracoDireito: 0,
    bracoEsquerdo: 0,
    triceps: 0,
    peito: 0,
    coxa: 0,
    panturrilha: 0,
    gluteos: 0,
  };

  ultimaMedida = this.profileService.getUltimaMedida();

  salvar() {
    const medida: BodyMeasurement = {
      data: new Date().toISOString(),
      ...this.form,
    };
    this.profileService.addMedida(medida);
    this.router.navigate(['/personagem']);
  }

  voltar() {
    this.router.navigate(['/personagem']);
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
