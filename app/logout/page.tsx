"use client";

import { AppConfig } from '@/shared/app_config';
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react'

const logoutPage = () => {
    const { replace } = useRouter();

    useEffect(() => {
        AppConfig.logOut(replace);
    }, []);
    return (
        <div></div>
    )
}

export default logoutPage