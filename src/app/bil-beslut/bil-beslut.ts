import { Component, OnInit } from '@angular/core';
import { PrivateLeasing } from './private-leasing/private-leasing.model';
import { PRIVATE_LEASING_OFFERS } from './private-leasing/private-leasing.data';
import { PrivateLeasingResult } from "./private-leasing/private-leasing-result/private-leasing-result";
import { NgFor } from '@angular/common';
import { Filter, ResultFilter } from "./result-filter/result-filter";
import { Header } from './header/header';

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

  ngOnInit(): void {
    this.results = PRIVATE_LEASING_OFFERS;
    this.applyFilter();
  }

  constructor() { }

  handleFilterChange(filter: Filter): void {
    this.filter = filter;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.filter) {
      console.log('Applying filter:', this.filter);
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
}
