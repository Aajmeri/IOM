import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService, UpdateUser } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  userId = '';
  email = '';
  model: UpdateUser = { name: '', role: 'Client', active: true };
  error = '';
  loading = false;
  saving = false;
  roles = ['Admin', 'Warehouse', 'Client'];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.loading = true;
    this.userService.getById(this.userId).subscribe({
      next: u => {
        this.email = u.email;
        this.model = { name: u.name, role: u.role ?? 'Client', active: u.active };
        this.loading = false;
      },
      error: () => { this.error = 'User not found.'; this.loading = false; }
    });
  }

  submit(): void {
    this.error = '';
    this.saving = true;
    this.userService.update(this.userId, this.model).subscribe({
      next: () => this.router.navigate(['/users']),
      error: err => {
        this.error = err.error?.message ?? 'Failed to save user.';
        this.saving = false;
      }
    });
  }
}
