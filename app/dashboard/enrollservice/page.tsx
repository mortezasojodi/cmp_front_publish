"use client";

import Title from "@/components/forms/title/title";
import FormFrame from "@/components/forms/formFrame/formFrame";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import React from "react";
import EnrollServiceForm from "@/components/forms/enrollServiceForm";

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

    if (query) {
        type = (query.type);
        if (query.data)
            id = JSON.parse(query.data);

    }

    function getTitle() {
        switch (type) {
            case "Cooking_Oil_Collection":
                return "Cooking Oil Collection";
            case "Grease_Trap_Management":
                return "Grease Trap Management";
            case "Hydro_Line_Jetting":
                return "Hydro Line Jetting";
            case "Kitchen_Hood_Cleaning":
                return "Kitchen Hood Cleaning";
            case "Power_Washing":
                return "Power Washing";
            case "Extra_Services":
                return "Extra Services";

            default:
                return "";
        }
    }

    return (
        <>
            <Title title={getTitle()} icon={"/broom.svg"}></Title>
            <FormFrame>
                <EnrollServiceForm Id={id} type={type} />
            </FormFrame>
        </>

    )
}