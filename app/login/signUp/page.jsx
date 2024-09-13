"use client";

import SignUpForm from "@/components/login/signUp";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from 'react'


export default function SignUP(props) {


    return <Suspense>
        <SignUPCm />
    </Suspense>;
}

const SignUPCm = () => {
    const searchParams = useSearchParams();

    const query = Object.fromEntries(searchParams.entries());
    var step = 1;
    if (query && query.step) step = parseInt(query.step);
    return (
        <SignUpForm currentstep={step} />

    )
}

