import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SupplierService, SaveSupplier } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './supplier-form.component.html'
})
export class SupplierFormComponent implements OnInit {
  isEdit = false;
  supplierId = '';
  model: SaveSupplier = { name: '' };
  error = '';
  loading = false;
  saving = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private supplierService = inject(SupplierService);

  ngOnInit(): void {
    this.supplierId = this.route.snapshot.params['id'];
    this.isEdit = !!this.supplierId;
    if (this.isEdit) {
      this.loading = true;
      this.supplierService.getById(this.supplierId).subscribe({
        next: s => {
          this.model = { name: s.name };
          this.loading = false;
        },
        error: () => { this.error = 'Supplier not found.'; this.loading = false; }
      });
    }
  }

  submit(): void {
    this.error = '';
    this.saving = true;
    const onSuccess = () => this.router.navigate(['/suppliers']);
    const onError = (err: any) => {
      this.error = err.error?.message ?? 'Failed to save supplier.';
      this.saving = false;
    };

    if (this.isEdit) {
      this.supplierService.update(this.supplierId, this.model).subscribe({ next: onSuccess, error: onError });
    } else {
      this.supplierService.create(this.model).subscribe({ next: onSuccess, error: onError });
    }
  }
}
