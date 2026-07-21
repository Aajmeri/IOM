import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService, User } from '../../services/user.service';

declare const $: any;

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  loading = true;
  error = '';

  private userService = inject(UserService);

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.initDataTable();
  }

  load(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: users => {
        this.users = users;
        this.loading = false;
        setTimeout(() => this.initDataTable(), 0);
      },
      error: () => {
        this.error = 'Failed to load users.';
        this.loading = false;
      }
    });
  }

  delete(id: string): void {
    if (!confirm('Delete this user?')) return;
    this.userService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Failed to delete user.')
    });
  }

  roleBadge(role: string): string {
    switch (role) {
      case 'Admin': return 'badge-danger';
      case 'Warehouse': return 'badge-warning';
      default: return 'badge-info';
    }
  }

  private initDataTable(): void {
    if (typeof $ === 'undefined') return;
    const table = $('#usersTable');
    if (table.length && !$.fn.DataTable.isDataTable('#usersTable')) {
      table.DataTable({
        pagingType: 'full_numbers',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
        responsive: true,
        language: { search: '_INPUT_', searchPlaceholder: 'Search users' }
      });
    }
  }
}
