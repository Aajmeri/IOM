import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="row justify-content-center mt-5">
      <div class="col-md-6 text-center">
        <div class="error-page">
          <h2 class="headline text-danger">403</h2>
          <div class="error-content">
            <h3><i class="fas fa-exclamation-triangle text-danger"></i> Access Denied</h3>
            <p>You do not have permission to view this page.</p>
            <a routerLink="/products" class="btn btn-primary">Back to Products</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AccessDeniedComponent {}
