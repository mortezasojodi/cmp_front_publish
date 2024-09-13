export class OtherCompanyLocationCommand {
  Name: string;
  Lat: number;
  Long: number;
  Capacity: string;
  Comment: string;
  PrimaryFirstName: string;
  PrimaryLastName: string;
  PrimaryPhonNumber: string;
  OperationalAddressId: number;
  Type: number;

  constructor(
    Name: string,
    Lat: number,
    Long: number,
    Capacity: string,
    Comment: string,
    PrimaryFirstName: string,
    PrimaryLastName: string,
    PrimaryPhonNumber: string,
    OperationalAddressId: number,
    Type: number
  ) {
    this.Name = Name;
    this.Lat = Lat;
    this.Long = Long;
    this.Capacity = Capacity;
    this.Comment = Comment;
    this.PrimaryFirstName = PrimaryFirstName;
    this.PrimaryLastName = PrimaryLastName;
    this.PrimaryPhonNumber = PrimaryPhonNumber;
    this.OperationalAddressId = OperationalAddressId;
    this.Type = Type;
  }
}
