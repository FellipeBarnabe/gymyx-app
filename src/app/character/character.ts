import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../core/character';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './character.html',
  styleUrl: './character.css',
})
export class CharacterComponent {
  characterService = inject(CharacterService);
}
