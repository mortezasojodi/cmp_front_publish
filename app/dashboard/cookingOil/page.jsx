import OilCollectionForm from "@/components/forms/oilCollectionForm"
import Title from "@/components/forms/title/title";
import FormFrame from "@/components/forms/formFrame/formFrame";


export default function CookingOil(){
    return(
        <>
        <Title title={"Cooking Oil Collection"} icon={"/cooking_oil.svg"}></Title>
        <FormFrame>
            <OilCollectionForm/>
        </FormFrame>
       </>
    )
}