export class LoginCommand {
  BusinessEmail: string;
  Password: string;
  constructor(
    BusinessEmail: string,
    Password: string,
  ) {
    this.BusinessEmail = BusinessEmail;
    this.Password = Password;

  }
}
