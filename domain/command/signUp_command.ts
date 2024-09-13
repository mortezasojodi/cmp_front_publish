export class SignUpCommand {
  companyName: string;
  primaryFirstName: string;
  primaryLastName: string;
  PrimaryPhonNumber: string;
  businessEmail: string;
  position: string;
  secondaryFirstName: string;
  secondaryLastName: string;
  secondaryPhoneNumber: string;
  referredBy: string;
  accountNumber: string;
  password: string;
  rePassword: string;
  type: number;

  constructor(
    companyName: string,
    primaryFirstName: string,
    primaryLastName: string,
    PrimaryPhonNumber: string,
    businessEmail: string,
    position: string,
    secondaryFirstName: string,
    secondaryLastName: string,
    secondaryPhoneNumber: string,
    referredBy: string,
    accountNumber: string,
    password: string,
    rePassword: string,
    type: number
  ) {
    this.companyName = companyName;
    this.primaryFirstName = primaryFirstName;
    this.primaryLastName = primaryLastName;
    this.PrimaryPhonNumber = PrimaryPhonNumber;
    this.businessEmail = businessEmail;
    this.position = position;
    this.secondaryFirstName = secondaryFirstName;
    this.secondaryLastName = secondaryLastName;
    this.secondaryPhoneNumber = secondaryPhoneNumber;
    this.referredBy = referredBy;
    this.accountNumber = accountNumber;
    this.password = password;
    this.rePassword = rePassword;
    this.type = type;
  }
}
