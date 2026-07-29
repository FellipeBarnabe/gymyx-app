import { Component, inject, effect } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);
  private authService = inject(AuthService);

  currentUrl = '';

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.currentUrl = e.url;
    });

    effect(() => {
      const loading = this.authService.loading();
      const user = this.authService.currentUser();

      if (!loading && !user) {
        this.router.navigate(['/login']);
      }
    });
  }

  get isLoginPage(): boolean {
    return this.currentUrl === '/login' || this.currentUrl === '/';
  }
}
