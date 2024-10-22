
export class AddServiceAppointmentCommand {
    OperationalAddressId: number;
    // LocationCompanyId: number;
    // ServiceTypeId: string;
    ServicePriceId: string;
    StartDate: Date;
    FrequencyType: string;
    ServiceId: string;
    constructor(
        OperationalAddressId: number,
        // LocationCompanyId: number,
        // ServiceTypeId: string,
        ServicePriceId: string,
        StartDate: Date,
        FrequencyType: string,
        ServiceId: string
    ) {
        this.OperationalAddressId = OperationalAddressId;
        // this.LocationCompanyId = LocationCompanyId;
        // this.ServiceTypeId = ServiceTypeId;
        this.ServicePriceId = ServicePriceId;
        this.StartDate = StartDate;
        this.FrequencyType = FrequencyType;
        this.ServiceId = ServiceId;
    }
}
