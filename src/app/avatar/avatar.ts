import { Component, inject, computed } from '@angular/core';
import { CharacterService } from '../core/character';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class AvatarComponent {
  private characterService = inject(CharacterService);

  // Normaliza atributo entre 0 e 1 (max 100)
  private norm(value: number): number {
    return Math.min(value, 100) / 100;
  }

  // Dimensões do corpo baseadas nos atributos
  body = computed(() => {
    const c = this.characterService.character();
    const str = this.norm(c.strength);
    const end = this.norm(c.endurance);
    const dis = this.norm(c.discipline);
    const nut = this.norm(c.nutrition);
    const rec = this.norm(c.recovery);

    return {
      // Cabeça
      headSize: 36 + dis * 4,

      // Pescoço
      neckWidth: 18 + str * 8,

      // Ombros
      shoulderWidth: 80 + str * 40,

      // Peito
      chestWidth: 60 + str * 30,
      chestHeight: 50 + str * 20,

      // Braços
      armWidth: 10 + str * 10,
      armLength: 70 + str * 10,

      // Abdômen
      abdomenWidth: 40 + (1 - nut) * 20,
      abdomenHeight: 40 + end * 10,

      // Pernas
      legWidth: 18 + end * 12,
      legLength: 80 + end * 10,

      // Cores
      skinColor: this.skinColor(rec),
      muscleColor: this.muscleColor(str),
      outlineColor: '#1F2D50',
    };
  });

  private skinColor(recovery: number): string {
    // Vai de tom acinzentado (cansado) pra tom saudável (recuperado)
    const r = Math.round(210 + recovery * 20);
    const g = Math.round(160 + recovery * 30);
    const b = Math.round(120 + recovery * 10);
    return `rgb(${r},${g},${b})`;
  }

  private muscleColor(strength: number): string {
    const r = Math.round(180 + strength * 30);
    const g = Math.round(120 + strength * 20);
    const b = Math.round(90 + strength * 10);
    return `rgb(${r},${g},${b})`;
  }

  get b() {
    return this.body();
  }

  // Centro do SVG
  cx = 100;
  headY = 30;

  get neckY() {
    return this.headY + this.b.headSize + 2;
  }
  get shoulderY() {
    return this.neckY + 16;
  }
  get chestY() {
    return this.shoulderY + 4;
  }
  get abdomenY() {
    return this.chestY + this.b.chestHeight;
  }
  get legY() {
    return this.abdomenY + this.b.abdomenHeight;
  }
}
