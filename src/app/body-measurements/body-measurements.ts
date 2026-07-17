import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService, BodyMeasurement } from '../core/profile.service';
import { CharacterService } from '../core/character';
import { calcularBoostMedidas } from '../core/progression';

@Component({
  selector: 'app-body-measurements',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './body-measurements.html',
  styleUrl: './body-measurements.css',
})
export class BodyMeasurementsComponent {
  private profileService = inject(ProfileService);
  private characterService = inject(CharacterService);
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
  boostsGerados: { label: string; atributo: string; ganho: number }[] = [];
  mostrarBoosts = false;

  salvar() {
    const medida: BodyMeasurement = {
      data: new Date().toISOString(),
      ...this.form,
    };

    const penultima = this.profileService.getUltimaMedida();
    this.profileService.addMedida(medida);

    if (penultima) {
      const { updatedCharacter, boosts } = calcularBoostMedidas(
        medida,
        penultima,
        this.characterService.character(),
      );
      this.characterService.update(updatedCharacter);
      this.boostsGerados = boosts;
      this.mostrarBoosts = boosts.length > 0;

      if (boosts.length > 0) return;
    }

    this.router.navigate(['/personagem']);
  }

  continuar() {
    this.router.navigate(['/personagem']);
  }

  voltar() {
    this.router.navigate(['/personagem']);
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
