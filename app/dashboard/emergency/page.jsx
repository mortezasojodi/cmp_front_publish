import EmergencyServiceForm from "@/components/forms/emergencyServiceForm"
import FormFrame from "@/components/forms/formFrame/formFrame"
import Title from "@/components/forms/title/title"



export default function emergencyService() {
    return (
        <div className="pagecontent">
            <Title title={"Emergency Service"} icon={"/emergency_serc_icon.svg"}></Title>
            <FormFrame>
                <EmergencyServiceForm />
            </FormFrame>
        </div>
    )
}