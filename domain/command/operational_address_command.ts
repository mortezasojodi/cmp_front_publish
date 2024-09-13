export class OperationalAddressCommand {
    Address: string;
    CrossStreet: string;
    County: string;
    LocationPhone: string;
    BusinessId: number;
    FirstName: string;
    LastName: string;
    Lat: number;
    Long: number;
    constructor(
        Address: string,
        CrossStreet: string,
        County: string,
        LocationPhone: string,
        BusinessId: number,
        FirstName: string,
        LastName: string,
        Lat: number,
        Long: number
    ) {
        this.Address = Address;
        this.CrossStreet = CrossStreet;
        this.County = County;
        this.LocationPhone = LocationPhone;
        this.BusinessId = BusinessId;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Lat = Lat;
        this.Long = Long;
    }
}
