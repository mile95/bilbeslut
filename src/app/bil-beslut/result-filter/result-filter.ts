import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit, Output, input, effect } from '@angular/core';
import { FuelType } from '../private-leasing/private-leasing.model';
import { EventEmitter } from '@angular/core';


export class Filter {
  constructor(
    readonly fuelTypes: FuelType[],
    readonly brands: string[],
    readonly sortValue: 'monthlyCost' | 'totalCost' = 'monthlyCost',
    readonly sortDirection: 'asc' | 'desc' = 'asc'
  ) { }
}

@Component({
  selector: 'app-result-filter',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './result-filter.html',
  styleUrl: './result-filter.css',
})
export class ResultFilter {

  @Output() filterChange = new EventEmitter<Filter>();
  brands = input.required<string[]>();



  readonly alternatives: { name: string, enabled: boolean }[] = [
    { name: 'Privatleasing', enabled: true },
  ];

  readonly fuelTypes = Object.values(FuelType);
  readonly sortOptions: { value: 'monthlyCost', label: string }[] = [
    { value: 'monthlyCost', label: 'Månadskostnad' },
  ];
  readonly sortDirections: { value: 'asc' | 'desc', label: string }[] = [
    { value: 'asc', label: 'Lägst först' },
    { value: 'desc', label: 'Högst först' },
  ];


  readonly selectedFuelTypes: Set<FuelType> = new Set<FuelType>();
  readonly selectedBrands: Set<string> = new Set<string>();
  currentSort: string = 'monthlyCost';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {
    this.initSelectedFuelTypes();
    effect(() => {
      const brands = this.brands();

      for (const brand of brands) {
        if (!this.selectedBrands.has(brand)) {
          this.selectedBrands.add(brand);
        }
      }
    });

  }


  private initSelectedFuelTypes(): void {
    this.selectedFuelTypes.clear();
    for (const fuelType of Object.values(FuelType)) {
      this.selectedFuelTypes.add(fuelType);
    }
  }

  private initSelectedBrands(brands: string[]): void {
    this.selectedBrands.clear();
    for (const brand of brands) {
      this.selectedBrands.add(brand);
    }
  }


  toggleFuelType(fuelType: FuelType): void {
    if (this.selectedFuelTypes.has(fuelType)) {
      this.selectedFuelTypes.delete(fuelType);
    } else {
      this.selectedFuelTypes.add(fuelType);
    }
    this.onFilterChange();
  }

  toggleBrand(brand: string): void {
    if (this.selectedBrands.has(brand)) {
      this.selectedBrands.delete(brand);
    } else {
      this.selectedBrands.add(brand);
    }
    this.onFilterChange();
  }



  setSort(sort: string) {
    this.currentSort = sort;
    this.onSortChange({ target: { value: sort } });
  }

  setSortDirection(direction: 'asc' | 'desc') {
    this.sortDirection = direction;
    this.onSortDirectionChange({ target: { value: direction } });
  }


  onSortChange(event: any): void {
    const value = event.target.value as 'monthlyCost' | 'totalCost';
    this.currentSort = value;
    this.onFilterChange();
  }

  onSortDirectionChange(event: any): void {
    const value = event.target.value as 'asc' | 'desc';
    this.sortDirection = value;
    this.onFilterChange();
  }

  onBrandChange(event: Event): void {
    const select = event.target as HTMLSelectElement | null;
    if (!select) return;

    const brand = select.value;

    if (!brand) {
      // Reset to ALL brands from input
      this.selectedBrands.clear();
      for (const b of this.brands()) {
        this.selectedBrands.add(b);
      }
    } else {
      this.toggleBrand(brand);
    }

    this.onFilterChange();
  }


  onFilterChange(): void {
    this.filterChange.emit(
      new Filter(
        Array.from(this.selectedFuelTypes),
        Array.from(this.selectedBrands),
        this.currentSort as 'monthlyCost' | 'totalCost',
        this.sortDirection
      )
    );
  }

  getBrandIcon(brand: string): string {
    const map: Record<string, string> = {
      Volkswagen: 'brands/volkswagen.svg',
      Volvo: 'brands/volvo.svg',
      Audi: 'brands/audi.svg',
      Skoda: 'brands/skoda.svg',
      Tesla: 'brands/tesla.svg',
      Toyota: 'brands/toyota.svg',
      Citroën: 'brands/citroen.svg',
    };

    return map[brand] ?? 'brands/default-car.svg';
  }

}
