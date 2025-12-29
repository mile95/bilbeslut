import { Component, Input } from '@angular/core';
import { PrivateLeasing, FuelType } from '../private-leasing.model';
import { DecimalPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-private-leasing-result',
  imports: [NgIf, DecimalPipe, NgClass],
  templateUrl: './private-leasing-result.html',
  styleUrl: './private-leasing-result.css',
})
export class PrivateLeasingResult {

  @Input({ required: true })
  privateLeasing!: PrivateLeasing;

  getfuelBadgeClass(): string {
    switch (this.privateLeasing['fuelType']) {
      case FuelType.Electric:
        return 'bg-blue-100 text-blue-700';
      case FuelType.Hybrid:
        return 'bg-green-100 text-green-700';
      case FuelType.Diesel:
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  }

}
