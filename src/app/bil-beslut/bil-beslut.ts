import { Component, computed, signal } from '@angular/core';
import { PrivateLeasing } from './private-leasing/private-leasing.model';
import { PrivateLeasingResult } from "./private-leasing/private-leasing-result/private-leasing-result";
import { NgFor } from '@angular/common';
import { Filter, ResultFilter } from "./result-filter/result-filter";
import { Header } from './header/header';
import { LeasingFetcher } from './leasing-fetcher';

@Component({
  selector: 'app-bil-beslut',
  imports: [PrivateLeasingResult, NgFor, ResultFilter, Header],
  templateUrl: './bil-beslut.html',
  styleUrl: './bil-beslut.css',
})
export class BilBeslut {

  results = signal<PrivateLeasing[]>([]);
  filteredResults = signal<PrivateLeasing[]>([]);
  loading = signal(false);
  filter = signal<Filter | null>(null);

  constructor(private leasingFetcher: LeasingFetcher) { }

  ngOnInit() {
    this.loadLeasing();
  }

  private loadLeasing() {
    this.loading.set(true);

    this.leasingFetcher.getLeasings().subscribe({
      next: data => {
        const mapped = data.map(dto => PrivateLeasing.fromDTO(dto));
        this.results.set(mapped);
        this.applyFilter();
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  handleFilterChange(filter: Filter) {
    this.filter.set(filter);
    this.applyFilter();
  }

  private applyFilter() {
    const filter = this.filter();
    const results = this.results();

    if (!filter) {
      this.filteredResults.set(results);
      return;
    }

    this.filteredResults.set(
      results
        .filter(r =>
          filter.fuelTypes.includes(r.fuelType) &&
          filter.brands.includes(r.brand)
        )
        .sort((a, b) => {
          const va = filter.sortValue === 'monthlyCost'
            ? a.getTotalMonthlyCost()
            : a.getTotalCostForFullLeaseInSek();
          const vb = filter.sortValue === 'monthlyCost'
            ? b.getTotalMonthlyCost()
            : b.getTotalCostForFullLeaseInSek();
          return filter.sortDirection === 'asc' ? va - vb : vb - va;
        })
    );
  }


  allUniqueBrands = computed(() => {
    return Array.from(new Set(this.results().map(r => r.brand)))
  })

}