import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService, Product, SaveProduct } from '../../services/product.service';
import { ItemService, SaveItem } from '../../services/item.service';
import { Supplier } from '../../services/supplier.service';
import { SupplierSearchComponent } from '../../components/supplier-search/supplier-search.component';

type ScanState = 'scan' | 'found' | 'notfound';

interface ScannedEntry {
  productName: string;
  quantity: number;
  time: Date;
}

@Component({
  selector: 'app-scan-in',
  standalone: true,
  imports: [FormsModule, SupplierSearchComponent, DatePipe],
  templateUrl: './scan-in.component.html'
})
export class ScanInComponent implements OnInit {
  state: ScanState = 'scan';
  scanValue = '';
  lastScannedBarcode = '';
  looking = false;
  error = '';
  warning = '';

  foundProduct: Product | null = null;

  // Quick-create (product not found) model
  newProduct: SaveProduct = { name: '', description: '', price: 0, quantity: 0, visibility: true, barcode: null, supplierId: '' };
  creatingProduct = false;

  // Item receiving model
  itemModel: { quantity: number; expirationDate: string | null } = { quantity: 1, expirationDate: null };
  savingItem = false;

  sessionLog: ScannedEntry[] = [];

  @ViewChild('scanInput') scanInputRef?: ElementRef<HTMLInputElement>;

  private productService = inject(ProductService);
  private itemService = inject(ItemService);

  // Rudimentary hardware-scanner detection: scanners emit characters much faster than a human types.
  private keyBuffer = '';
  private lastKeyTime = 0;

  ngOnInit(): void {
    this.focusScanInput();
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    // If the operator is legitimately using the scan input in 'scan' state, let its own handler manage it.
    if (this.state === 'scan' && event.target === this.scanInputRef?.nativeElement) {
      return;
    }

    const now = Date.now();
    const elapsed = now - this.lastKeyTime;
    this.lastKeyTime = now;

    if (elapsed > 75) {
      this.keyBuffer = '';
    }

    if (event.key === 'Enter') {
      const looksLikeScan = this.keyBuffer.length >= 3;
      this.keyBuffer = '';
      if (looksLikeScan && this.state !== 'scan') {
        // A barcode scan came in while a form was mid-fill; don't let it land in a focused field.
        event.preventDefault();
        event.stopPropagation();
        this.warning = 'A barcode was scanned but the current entry must be finished or cancelled first.';
      }
    } else if (event.key.length === 1) {
      this.keyBuffer += event.key;
    }
  }

  onScanSubmit(): void {
    const code = this.scanValue.trim();
    if (!code || this.state !== 'scan') {
      return;
    }
    this.warning = '';
    this.error = '';
    this.looking = true;
    this.lastScannedBarcode = code;

    this.productService.getByBarcode(code).subscribe({
      next: product => {
        this.foundProduct = product;
        this.itemModel = { quantity: 1, expirationDate: null };
        this.state = 'found';
        this.looking = false;
      },
      error: (err: HttpErrorResponse) => {
        this.looking = false;
        if (err.status === 404) {
          this.newProduct = { name: '', description: '', price: 0, quantity: 0, visibility: true, barcode: code, supplierId: '' };
          this.state = 'notfound';
        } else {
          this.error = 'Failed to look up barcode. Please try again.';
        }
      }
    });
  }

  onSupplierSelected(supplier: Supplier | null): void {
    this.newProduct.supplierId = supplier?.id ?? '';
  }

  createProduct(): void {
    this.error = '';
    if (!this.newProduct.supplierId) {
      this.error = 'Please select a supplier.';
      return;
    }
    this.creatingProduct = true;
    this.productService.create(this.newProduct).subscribe({
      next: product => {
        this.foundProduct = product;
        this.itemModel = { quantity: 1, expirationDate: null };
        this.state = 'found';
        this.creatingProduct = false;
      },
      error: err => {
        this.error = err.error?.message ?? 'Failed to create product.';
        this.creatingProduct = false;
      }
    });
  }

  saveItem(): void {
    if (!this.foundProduct) return;
    this.error = '';
    this.savingItem = true;
    const data: SaveItem = {
      productId: this.foundProduct.id,
      quantity: this.itemModel.quantity,
      expirationDate: this.itemModel.expirationDate || null
    };
    this.itemService.create(data).subscribe({
      next: () => {
        this.sessionLog.unshift({
          productName: this.foundProduct!.name,
          quantity: this.itemModel.quantity,
          time: new Date()
        });
        this.savingItem = false;
        this.resetToScan();
      },
      error: err => {
        this.error = err.error?.message ?? 'Failed to record item.';
        this.savingItem = false;
      }
    });
  }

  cancel(): void {
    this.resetToScan();
  }

  private resetToScan(): void {
    this.state = 'scan';
    this.scanValue = '';
    this.foundProduct = null;
    this.error = '';
    this.warning = '';
    this.focusScanInput();
  }

  private focusScanInput(): void {
    setTimeout(() => this.scanInputRef?.nativeElement.focus(), 0);
  }
}
