"use client";

import Title from "@/components/forms/title/title";
import FormFrame from "@/components/forms/formFrame/formFrame";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import React from "react";
import EnrollServiceForm from "@/components/forms/enrollServiceForm";
import { ServiceItemConst } from "@/shared/constants/service_item_const";
import { useAddress } from "@/components/address/address_context";
import TitleBack from "@/components/forms/title/title_back";

export default function EnrollService() {
    return (
        <Suspense>
            <EnrollServiceCm />
        </Suspense>
    );
}

const EnrollServiceCm = () => {
    const searchParams = useSearchParams();
    const query = Object.fromEntries(searchParams.entries());
    var type: string;
    var id: number | null;
    var serviceId: string;

    if (query) {
        type = (query.type);
        serviceId = query.serviceId;
        if (query.data)
            id = JSON.parse(query.data);
    }

    const { selectedAddresses } = useAddress();
    useEffect(() => {
    }, [selectedAddresses]);


    return (
        <div className="pagecontent">
            <TitleBack title={`${type} - ${selectedAddresses ? selectedAddresses.Name : ''}`} icon={"/broom.svg"} />
            <FormFrame>
                <EnrollServiceForm Id={id} serviceId={serviceId} />
            </FormFrame>
        </div>

    )
}