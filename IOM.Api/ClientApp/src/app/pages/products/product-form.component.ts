import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, SaveProduct } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  isEdit = false;
  productId = '';
  model: SaveProduct = { name: '', description: '', price: 0, quantity: 0, visibility: true };
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
          this.model = { name: p.name, description: p.description, price: p.price, quantity: p.quantity, visibility: p.visibility };
          this.loading = false;
        },
        error: () => { this.error = 'Product not found.'; this.loading = false; }
      });
    }
  }

  submit(): void {
    this.error = '';
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
