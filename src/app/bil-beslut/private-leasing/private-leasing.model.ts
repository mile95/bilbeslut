export class PrivateLeasing {
    constructor(
        readonly brand: string,
        readonly model: string,
        readonly trim: string,
        readonly leaseBaseMonthlyCostInSek: number,
        readonly fuelType: FuelType,
        readonly standardDurationInMonths: number,
        readonly standardMileagePerYearInKm: number,
        readonly otherMileAge: MileageAndCost[],
        readonly serviceIncluded: boolean,
        readonly insuranceCostPerMonthInSek: number,
        readonly winterTiresMonthlyCostInSek: number,
        readonly sourceUrl: string
    ) { }

    public getTotalMonthlyCost(): number {
        return this.leaseBaseMonthlyCostInSek +
            this.insuranceCostPerMonthInSek +
            this.winterTiresMonthlyCostInSek;
    }

    public getTotalCostForFullLeaseInSek(): number {
        return (this.getTotalMonthlyCost() * this.standardDurationInMonths) + this.getFullTaxCostPerYearInSek() * (this.standardDurationInMonths / 12);
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
}

export class MileageAndCost {
    constructor(
        public readonly mileagePerYearInKm: number,
        public readonly monthlyCostInSek: number
    ) { }
}

export enum FuelType {
    Petrol = 'Petrol',
    Diesel = 'Diesel',
    Electric = 'Electric',
    Hybrid = 'Hybrid'
}