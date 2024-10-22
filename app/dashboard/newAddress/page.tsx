"use client";

import SignUpForm from "@/components/login/signUp";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from 'react'
import AddNewAddressForm from "@/components/forms/addNewAddress";
import FormFrame from "@/components/forms/formFrame/formFrame"
import TitleBack from "@/components/forms/title/title_back"
import { OperationalAddressEntity } from "@/domain/entity/operational_address_entity";

export default function NewAddressPage() {




    return (
        <Suspense>
            <AddNewAddressFormCm />
        </Suspense>
    );
}


const AddNewAddressFormCm = () => {
    const searchParams = useSearchParams();

    const query = Object.fromEntries(searchParams.entries());
    var model: OperationalAddressEntity | null;
    if (query && query.data) {
        model = JSON.parse(query.data);
    }
    return (
        <div className="pagecontent">
            <TitleBack title={"Add New Address"} icon={"/emergency_serc_icon.svg"}></TitleBack>
            <FormFrame>
                <AddNewAddressForm entityModel={model} />
            </FormFrame>
        </div>

    )
}