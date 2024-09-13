import AddNewAddressForm from "@/components/forms/addNewAddress";
import FormFrame from "@/components/forms/formFrame/formFrame"
import Title from "@/components/forms/title/title"

export default function NewAddressPage(){
    return (
        <>
        <Title title={"Add New Address"} icon={"/emergency_serc_icon.svg"}></Title>
        <FormFrame>
            <AddNewAddressForm/>
        </FormFrame>
        </>
    );
}
