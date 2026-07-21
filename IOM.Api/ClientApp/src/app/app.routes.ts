import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', loadComponent: () => import('./pages/products/products-list.component').then(m => m.ProductsListComponent) },
      { path: 'products/create', loadComponent: () => import('./pages/products/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'products/edit/:id', loadComponent: () => import('./pages/products/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'users', canActivate: [adminGuard], loadComponent: () => import('./pages/users/users-list.component').then(m => m.UsersListComponent) },
      { path: 'users/edit/:id', canActivate: [adminGuard], loadComponent: () => import('./pages/users/user-edit.component').then(m => m.UserEditComponent) },
      { path: 'access-denied', loadComponent: () => import('./pages/access-denied/access-denied.component').then(m => m.AccessDeniedComponent) },
    ]
  },
  { path: '**', redirectTo: '' }
];
