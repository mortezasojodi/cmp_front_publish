export class AddShoppingCardCommand {
    OperationalAddressId: number;
    // ServiceTypeId: string;
    ServicePriceId: string;
    StartDate: Date;
    FrequencyType: string;
    ServiceId: string;
    // AddressName: string;
    // PriceName: string;
    constructor(
        OperationalAddressId: number,
        // ServiceTypeId: string,
        ServicePriceId: string,
        StartDate: Date,
        FrequencyType: string,
        ServiceId: string,
        // AddressName: string,
        // PriceName: string
    ) {
        this.OperationalAddressId = OperationalAddressId;
        // this.ServiceTypeId = ServiceTypeId;
        this.ServicePriceId = ServicePriceId;
        this.StartDate = StartDate;
        this.FrequencyType = FrequencyType;
        this.ServiceId = ServiceId;
        // this.AddressName = AddressName;
        // this.PriceName = PriceName;
    }
}