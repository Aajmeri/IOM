import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, SaveProduct } from '../../services/product.service';
import { Supplier } from '../../services/supplier.service';
import { SupplierSearchComponent } from '../../components/supplier-search/supplier-search.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, RouterLink, SupplierSearchComponent],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  isEdit = false;
  productId = '';
  model: SaveProduct = { name: '', description: '', price: 0, quantity: 0, visibility: true, barcode: null, supplierId: '' };
  initialSupplierId: string | null = null;
  initialSupplierName: string | null = null;
  error = '';
  loading = false;
  saving = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.isEdit = !!this.productId;
    if (this.isEdit) {
      this.loading = true;
      this.productService.getById(this.productId).subscribe({
        next: p => {
          this.model = {
            name: p.name,
            description: p.description,
            price: p.price,
            quantity: p.quantity,
            visibility: p.visibility ?? true,
            barcode: p.barcode ?? null,
            supplierId: p.supplierId ?? ''
          };
          this.initialSupplierId = p.supplierId ?? null;
          this.initialSupplierName = p.supplierName ?? null;
          this.loading = false;
        },
        error: () => { this.error = 'Product not found.'; this.loading = false; }
      });
    }
  }

  onSupplierSelected(supplier: Supplier | null): void {
    this.model.supplierId = supplier?.id ?? '';
  }

  submit(): void {
    this.error = '';
    if (!this.model.supplierId) {
      this.error = 'Please select a supplier.';
      return;
    }
    this.saving = true;
    const onSuccess = () => this.router.navigate(['/products']);
    const onError = (err: any) => {
      this.error = err.error?.message ?? 'Failed to save product.';
      this.saving = false;
    };

    if (this.isEdit) {
      this.productService.update(this.productId, this.model).subscribe({ next: onSuccess, error: onError });
    } else {
      this.productService.create(this.model).subscribe({ next: onSuccess, error: onError });
    }
  }
}
