import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../core/character';
import { AuthService } from '../core/auth';
import { AvatarComponent } from '../avatar/avatar';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [RouterLink, AvatarComponent],
  templateUrl: './character.html',
  styleUrl: './character.css',
})
export class CharacterComponent {
  characterService = inject(CharacterService);
  authService = inject(AuthService);

  get xpPercent(): number {
    const c = this.characterService.character();
    return Math.min((c.xp / (c.level * 100)) * 100, 100);
  }
}
