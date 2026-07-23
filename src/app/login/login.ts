import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  erro = '';

  async loginGoogle() {
    this.loading = true;
    this.erro = '';
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/personagem']);
    } catch (e) {
      this.erro = 'Erro ao fazer login. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }
}
