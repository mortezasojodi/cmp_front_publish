"use client";

import GreaseTrapForm from "@/components/forms/greaseTrapForm";
import Title from "@/components/forms/title/title";
import FormFrame from "@/components/forms/formFrame/formFrame";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function GreaseTrap() {
    return (
        <Suspense>
            <GreaseTrapCm />
        </Suspense>
    );
}

const GreaseTrapCm = () => {
    const searchParams = useSearchParams();

    const query = Object.fromEntries(searchParams.entries());
    var id: number | null;
    if (query && query.data) {
        id = JSON.parse(query.data);
    }
    return (
        <div className="pagecontent">
            <Title title={"Grease Trap Management"} icon={"/broom.svg"}></Title>
            <FormFrame>
                <GreaseTrapForm Id={id} />
            </FormFrame>
        </div>

    )
}