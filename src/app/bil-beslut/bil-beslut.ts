import { Component, OnInit } from '@angular/core';
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
export class BilBeslut implements OnInit {

  results: PrivateLeasing[] = [];
  filteredResults: PrivateLeasing[] = [];
  filter: Filter | null = null;

  constructor(private leasingFetcher: LeasingFetcher) { }

  ngOnInit(): void {
    this.loadLeasing();
  }

  private loadLeasing(): void {
    this.leasingFetcher.getLeasings().subscribe({
      next: data => {
        this.results = data.map(dto => PrivateLeasing.fromDTO(dto));
        this.applyFilter();
      },
      error: err => {
        console.error('Failed to load leasing offers', err);
      },
    });
  }

  handleFilterChange(filter: Filter): void {
    this.filter = filter;
    if (this.results.length > 0) this.applyFilter();
  }

  private applyFilter(): void {
    if (this.filter) {
      this.filteredResults = this.results.filter(r =>
        this.filter!.fuelTypes.includes(r.fuelType) &&
        this.filter!.brands.includes(r.brand));

      this.filteredResults.sort((a, b) => {
        const valueA = this.filter!.sortValue === 'monthlyCost' ? a.getTotalMonthlyCost() : a.getTotalCostForFullLeaseInSek();
        const valueB = this.filter!.sortValue === 'monthlyCost' ? b.getTotalMonthlyCost() : b.getTotalCostForFullLeaseInSek();
        if (this.filter!.sortDirection === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      });
    } else {
      this.filteredResults = this.results;
      console.log('No filter applied, showing all results.');
    }
  }

  getAllUniqueBrands(): string[] {
    if (!this.results) return []
    return Array.from(new Set(this.results.map(r => r.brand)))
  }

}
