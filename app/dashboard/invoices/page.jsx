import InvoicesTable from "@/components/dashboard/invoicesTable/invoicesTable"
import Title from "@/components/forms/title/title"

export default function Invoices(){
    return(
        <>
            <Title title={"Invoices and Payments"} icon={"/invoices_and_payments_logo.svg"}/>
            <InvoicesTable/>
        </>
    )
}