export class EditProfileCommand {
    companyName: string;
    primaryFirstName: string;
    primaryLastName: string;
    PrimaryPhonNumber: string;
    position: string;
    secondaryFirstName: string;
    secondaryLastName: string;
    secondaryPhoneNumber: string;


    constructor(
        companyName: string,
        primaryFirstName: string,
        primaryLastName: string,
        PrimaryPhonNumber: string,
        position: string,
        secondaryFirstName: string,
        secondaryLastName: string,
        secondaryPhoneNumber: string,
    ) {
        this.companyName = companyName;
        this.primaryFirstName = primaryFirstName;
        this.primaryLastName = primaryLastName;
        this.PrimaryPhonNumber = PrimaryPhonNumber;
        this.position = position;
        this.secondaryFirstName = secondaryFirstName;
        this.secondaryLastName = secondaryLastName;
        this.secondaryPhoneNumber = secondaryPhoneNumber;

    }
}
