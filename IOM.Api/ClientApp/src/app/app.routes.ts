import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { clientGuard } from './guards/client.guard';
import { staffGuard } from './guards/staff.guard';
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
      { path: 'products', canActivate: [staffGuard], loadComponent: () => import('./pages/products/products-list.component').then(m => m.ProductsListComponent) },
      { path: 'products/create', canActivate: [staffGuard], loadComponent: () => import('./pages/products/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'products/edit/:id', canActivate: [staffGuard], loadComponent: () => import('./pages/products/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'scan', canActivate: [staffGuard], loadComponent: () => import('./pages/scan-in/scan-in.component').then(m => m.ScanInComponent) },
      { path: 'suppliers', canActivate: [staffGuard], loadComponent: () => import('./pages/suppliers/suppliers-list.component').then(m => m.SuppliersListComponent) },
      { path: 'suppliers/create', canActivate: [staffGuard], loadComponent: () => import('./pages/suppliers/supplier-form.component').then(m => m.SupplierFormComponent) },
      { path: 'suppliers/edit/:id', canActivate: [staffGuard], loadComponent: () => import('./pages/suppliers/supplier-form.component').then(m => m.SupplierFormComponent) },
      { path: 'orders', canActivate: [staffGuard], loadComponent: () => import('./pages/shipping-orders/shipping-orders.component').then(m => m.ShippingOrdersComponent) },
      { path: 'schedule', canActivate: [staffGuard], loadComponent: () => import('./pages/deliveries/delivery-schedule.component').then(m => m.DeliveryScheduleComponent) },
      { path: 'deliveries', canActivate: [staffGuard], loadComponent: () => import('./pages/deliveries/deliveries.component').then(m => m.DeliveriesComponent) },
      { path: 'users', canActivate: [adminGuard], loadComponent: () => import('./pages/users/users-list.component').then(m => m.UsersListComponent) },
      { path: 'users/edit/:id', canActivate: [adminGuard], loadComponent: () => import('./pages/users/user-edit.component').then(m => m.UserEditComponent) },
      { path: 'order-approvals', canActivate: [staffGuard], loadComponent: () => import('./pages/order-approvals/order-approvals.component').then(m => m.OrderApprovalsComponent) },
      { path: 'order-approvals/:id', canActivate: [staffGuard], loadComponent: () => import('./pages/order-approvals/order-detail.component').then(m => m.OrderDetailComponent) },
      { path: 'shop', canActivate: [clientGuard], loadComponent: () => import('./pages/shop/shop-products.component').then(m => m.ShopProductsComponent) },
      { path: 'shop/basket', canActivate: [clientGuard], loadComponent: () => import('./pages/shop/shop-basket.component').then(m => m.ShopBasketComponent) },
      { path: 'shop/schedule', canActivate: [clientGuard], loadComponent: () => import('./pages/shop/shop-schedule.component').then(m => m.ShopScheduleComponent) },
      { path: 'shop/checkout', canActivate: [clientGuard], loadComponent: () => import('./pages/shop/shop-checkout.component').then(m => m.ShopCheckoutComponent) },
      { path: 'shop/orders', canActivate: [clientGuard], loadComponent: () => import('./pages/shop/shop-orders.component').then(m => m.ShopOrdersComponent) },
      { path: 'shop/orders/:id/pay', canActivate: [clientGuard], loadComponent: () => import('./pages/shop/shop-pay.component').then(m => m.ShopPayComponent) },
      { path: 'shop/orders/:id/receipt', canActivate: [clientGuard], loadComponent: () => import('./pages/shop/shop-receipt.component').then(m => m.ShopReceiptComponent) },
      { path: 'access-denied', loadComponent: () => import('./pages/access-denied/access-denied.component').then(m => m.AccessDeniedComponent) },
    ]
  },
  { path: '**', redirectTo: '' }
];
