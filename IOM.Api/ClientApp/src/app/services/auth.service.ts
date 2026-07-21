import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthUser {
  token: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'iom_token';
  private readonly USER_KEY = 'iom_user';

  currentUser = signal<AuthUser | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<AuthUser> {
    return this.http.post<AuthUser>('/api/auth/login', { email, password }).pipe(
      tap(user => this.storeUser(user))
    );
  }

  register(name: string, email: string, password: string, confirmPassword: string): Observable<AuthUser> {
    return this.http.post<AuthUser>('/api/auth/register', { name, email, password, confirmPassword }).pipe(
      tap(user => this.storeUser(user))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'Admin';
  }

  canManageProducts(): boolean {
    const role = this.currentUser()?.role;
    return role === 'Admin' || role === 'Warehouse';
  }

  private storeUser(user: AuthUser): void {
    localStorage.setItem(this.TOKEN_KEY, user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
