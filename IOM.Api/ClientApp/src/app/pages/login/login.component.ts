import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  error = '';
  loading = false;

  private auth = inject(AuthService);
  private router = inject(Router);
  private basket = inject(BasketService);

  submit(): void {
    this.error = '';
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.basket.reset();
        this.router.navigate([this.auth.isClient() ? '/shop' : '/products']);
      },
      error: err => {
        this.error = err.error?.message ?? 'Invalid email or password.';
        this.loading = false;
      }
    });
  }
}
