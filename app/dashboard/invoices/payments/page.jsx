import Title from "@/components/forms/title/title"
import PaymentMethod from "@/components/forms/paymentMethod";

export default function PaymentsPage(){
    return(
        <>
            <Title title={"Payment Method"} icon={"/invoices_and_payments_logo.svg"}/>
            <PaymentMethod/>
        </>
    )
}