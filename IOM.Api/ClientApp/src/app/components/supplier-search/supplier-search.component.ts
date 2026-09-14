import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Supplier, SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './supplier-search.component.html'
})
export class SupplierSearchComponent implements OnInit, OnChanges, OnDestroy {
  @Input() initialSupplierId: string | null = null;
  @Input() initialSupplierName: string | null = null;
  @Input() placeholder = 'Search suppliers…';
  @Input() required = false;
  @Input() disabled = false;

  @Output() selected = new EventEmitter<Supplier | null>();

  query = '';
  results: Supplier[] = [];
  showDropdown = false;
  searching = false;
  selectedSupplier: Supplier | null = null;

  private supplierService = inject(SupplierService);
  private queryChanges = new Subject<string>();
  private sub?: Subscription;

  ngOnInit(): void {
    this.applyInitial();

    this.sub = this.queryChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => {
        if (!q || q.trim().length === 0) {
          this.searching = false;
          return [];
        }
        this.searching = true;
        return this.supplierService.search(q, 20);
      })
    ).subscribe({
      next: results => {
        this.results = results;
        this.searching = false;
        this.showDropdown = true;
      },
      error: () => {
        this.results = [];
        this.searching = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialSupplierId'] || changes['initialSupplierName']) {
      this.applyInitial();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onInput(): void {
    this.selectedSupplier = null;
    this.selected.emit(null);
    this.queryChanges.next(this.query);
  }

  onFocus(): void {
    if (this.results.length > 0) {
      this.showDropdown = true;
    }
  }

  onBlur(): void {
    // Delay so a click on a dropdown option registers before we hide it.
    setTimeout(() => this.showDropdown = false, 200);
  }

  choose(supplier: Supplier): void {
    this.selectedSupplier = supplier;
    this.query = supplier.name;
    this.results = [];
    this.showDropdown = false;
    this.selected.emit(supplier);
  }

  private applyInitial(): void {
    if (this.initialSupplierId && this.initialSupplierName) {
      this.selectedSupplier = { id: this.initialSupplierId, name: this.initialSupplierName, active: true };
      this.query = this.initialSupplierName;
    }
  }
}
