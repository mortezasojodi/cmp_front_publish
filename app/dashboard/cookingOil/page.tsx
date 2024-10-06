"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from 'react'
import { ServiceAppointmentEntity } from "@/domain/entity/service_appointment_entity";
import OilCollectionForm from "@/components/forms/oilCollectionForm"
import Title from "@/components/forms/title/title";
import FormFrame from "@/components/forms/formFrame/formFrame";

export default function CookingOil() {
    return (
        <Suspense>
            <AddServiceCm />
        </Suspense>
    );
}

const AddServiceCm = () => {
    const searchParams = useSearchParams();

    const query = Object.fromEntries(searchParams.entries());
    var model: ServiceAppointmentEntity | null;
    if (query && query.data) {
        model = JSON.parse(query.data);
    }
    return (
        <>
            <Title title={"Cooking Oil Collection"} icon={"/cooking_oil.svg"}></Title>
            <FormFrame>
                <OilCollectionForm entityModel={model} />
            </FormFrame>
        </>

    )
}