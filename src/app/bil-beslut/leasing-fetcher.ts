import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type FuelType = 'ELECTRIC' | 'PETROL' | 'DIESEL' | 'HYBRID';

export class PrivateLeasingDTO {

  constructor(
    readonly brand: string,
    readonly model: string,
    readonly trim: string,
    readonly fuel_type: string,
    readonly winter_tires_cost: number,
    readonly base_cost: number,
    readonly standard_period: number,
    readonly standard_milage: number,
    readonly source_url: string,
    readonly image_url: string
  ) { }
}

@Injectable({
  providedIn: 'root',
})
export class LeasingFetcher {
  private readonly baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getLeasings(): Observable<PrivateLeasingDTO[]> {
    return this.http.get<PrivateLeasingDTO[]>(
      `${this.baseUrl}/leasing/`
    );
  }

}
