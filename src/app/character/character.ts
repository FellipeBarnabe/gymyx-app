import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../core/character';
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
}
