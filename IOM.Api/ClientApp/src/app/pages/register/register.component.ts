import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;

  private auth = inject(AuthService);
  private router = inject(Router);
  private basket = inject(BasketService);

  submit(): void {
    this.error = '';
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    this.loading = true;
    this.auth.register(this.name, this.email, this.password, this.confirmPassword).subscribe({
      next: () => {
        this.basket.reset();
        this.router.navigate([this.auth.isClient() ? '/shop' : '/products']);
      },
      error: err => {
        this.error = err.error?.message ?? 'Registration failed.';
        this.loading = false;
      }
    });
  }
}
