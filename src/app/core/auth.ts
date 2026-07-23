import { Injectable, signal } from '@angular/core';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleProvider } from './firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User | null>(null);
  loading = signal<boolean>(true);

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.currentUser.set(user);
      this.loading.set(false);
    });
  }

  async loginWithGoogle(): Promise<void> {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  get isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  get userId(): string | null {
    return this.currentUser()?.uid ?? null;
  }

  get userName(): string | null {
    return this.currentUser()?.displayName ?? null;
  }

  get userPhoto(): string | null {
    return this.currentUser()?.photoURL ?? null;
  }
}
