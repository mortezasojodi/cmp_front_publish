
export class AddServiceAppointmentCommand {
    OperationalAddressId: number;
    // LocationCompanyId: number;
    ServiceTypeId: string;
    StartDate: Date;
    FrequencyType: number;
    constructor(
        OperationalAddressId: number,
        // LocationCompanyId: number,
        ServiceTypeId: string,
        StartDate: Date,
        FrequencyType: number
    ) {
        this.OperationalAddressId = OperationalAddressId;
        // this.LocationCompanyId = LocationCompanyId;
        this.ServiceTypeId = ServiceTypeId;
        this.StartDate = StartDate;
        this.FrequencyType = FrequencyType;
    }
}
