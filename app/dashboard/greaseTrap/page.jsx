import GreaseTrapForm from "@/components/forms/greaseTrapForm";
import Title from "@/components/forms/title/title";
import FormFrame from "@/components/forms/formFrame/formFrame";

export default function GreaseTrap(){
    return(
       <>
        <Title title={"Grease Trap Management"} icon={"/broom.svg"}></Title>
        <FormFrame>
            <GreaseTrapForm/>
        </FormFrame>
       </>
    )
}