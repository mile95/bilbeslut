import { PrivateLeasingDTO } from "../leasing-fetcher";

export class PrivateLeasing {
    constructor(
        readonly brand: string,
        readonly model: string,
        readonly trim: string,
        readonly leaseBaseMonthlyCostInSek: number,
        readonly fuelType: FuelType,
        readonly standardDurationInMonths: number,
        readonly standardMileagePerYearInKm: number,
        readonly serviceCostPerMonthInSek: number,
        readonly insuranceCostPerMonthInSek: number,
        readonly winterTiresMonthlyCostInSek: number,
        readonly sourceUrl: string,
        readonly imageUrl: string | null,
        readonly estimatedFuelOrElectricity: number,
    ) { }

    public static fromDTO(dto: PrivateLeasingDTO): PrivateLeasing {
        return new PrivateLeasing(
            dto.brand,
            dto.model,
            dto.trim,
            dto.base_cost,
            FuelType[dto.fuel_type as keyof typeof FuelType],
            dto.standard_period,
            dto.standard_milage,
            Math.floor(Math.random() * 400) + 200,
            Math.floor(Math.random() * 500) + 300,
            dto.winter_tires_cost,
            dto.source_url,
            dto.image_url,
            Math.floor(Math.random() * 800) + 200
        )
    };

    public getTotalMonthlyCost(): number {
        return this.leaseBaseMonthlyCostInSek +
            this.insuranceCostPerMonthInSek +
            this.winterTiresMonthlyCostInSek +
            this.getTaxCostPerMonth() +
            this.serviceCostPerMonthInSek +
            this.estimatedFuelOrElectricity;
    }


    public getTotalCostForFullLeaseInSek(): number {
        return (this.getTotalMonthlyCost() * this.standardDurationInMonths);
    }

    public getFullTaxCostPerYearInSek(): number {
        switch (this.fuelType) {
            case FuelType.Electric:
                return 360;
            case FuelType.Hybrid:
                return 1080;
            case FuelType.Diesel:
                return 2160;
            default:
                return 1560;
        }
    }

    public getTaxCostPerMonth(): number {
        return this.getFullTaxCostPerYearInSek() / 12;
    }
}


export enum FuelType {
    Petrol = 'Bensin',
    Diesel = 'Diesel',
    Electric = 'El',
    Hybrid = 'Hybrid'
}