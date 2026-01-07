import { PrivateLeasingDTO } from "../leasing-fetcher";

export class PrivateLeasing {
    constructor(
        readonly brand: string,
        readonly model: string,
        readonly trim: string,
        readonly baseCost: number,
        readonly fuelType: FuelType,
        readonly standardPeriod: number,
        readonly standardMilage: number,
        readonly serviceCost: number,
        readonly insuranceCost: number,
        readonly winterTiresCost: number,
        readonly taxCost: number,
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
            0,
            this.estimateInsuranceCost(dto),
            dto.winter_tires_cost,
            this.estimateTaxCostPerMonth(dto),
            dto.source_url,
            dto.image_url,
            this.estimateFuelOrElectricityCost(dto)
        )
    };

    private static estimateFuelOrElectricityCost(dto: PrivateLeasingDTO): number {
        const kmPerMonth = (dto.standard_milage * 10) / 12;

        const ft = FuelType[dto.fuel_type as keyof typeof FuelType]

        switch (ft) {
            case FuelType.Electric:
                return Math.round((18 / 100) * kmPerMonth * 2.5);

            case FuelType.Petrol:
                return Math.round((6.5 / 100) * kmPerMonth * 19.5);

            case FuelType.Diesel:
                return Math.round((5.5 / 100) * kmPerMonth * 21.0);

            case FuelType.Hybrid:
                return Math.round((4.0 / 100) * kmPerMonth * 19.5);

            default:
                return 0;
        }
    }


    private static estimateInsuranceCost(
        dto: PrivateLeasingDTO
    ): number {

        let base = 450;

        switch (FuelType[dto.fuel_type as keyof typeof FuelType]) {
            case FuelType.Electric:
                base = 350;
                break;
            case FuelType.Hybrid:
                base = 400;
                break;
            case FuelType.Diesel:
                base = 500;
                break;
        }

        const totalCarPrice = dto.base_cost * dto.standard_period;
        const priceFactor =
            Math.max(0, totalCarPrice - 300_000) / 100_000;

        return Math.round(base + priceFactor * 50);
    }

    private static estimateTaxCostPerMonth(
        dto: PrivateLeasingDTO
    ): number {

        const ft = FuelType[dto.fuel_type as keyof typeof FuelType]

        if (ft === FuelType.Electric) return 0;

        let yearlyBase: number;

        switch (ft) {
            case FuelType.Hybrid:
                yearlyBase = 600;
                break;
            case FuelType.Petrol:
                yearlyBase = 4200;
                break;
            case FuelType.Diesel:
                yearlyBase = 6000;
                break;
        }

        const estimatedCarValue = dto.base_cost * 36;

        if (estimatedCarValue > 450_000) {
            yearlyBase += 1_200;
        } else if (estimatedCarValue > 350_000) {
            yearlyBase += 600;
        }

        return Math.round(yearlyBase / 12);
    }



    public getTotalMonthlyCost(): number {
        return this.baseCost +
            this.insuranceCost +
            this.winterTiresCost +
            this.taxCost +
            this.serviceCost +
            this.estimatedFuelOrElectricity;
    }


    public getTotalCostForFullLeaseInSek(): number {
        return (this.getTotalMonthlyCost() * this.standardPeriod);
    }

}


export enum FuelType {
    Petrol = 'Bensin',
    Diesel = 'Diesel',
    Electric = 'El',
    Hybrid = 'Hybrid'
}