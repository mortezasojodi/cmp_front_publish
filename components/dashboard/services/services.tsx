'use client'
import styles from "./services.module.css"
import { TbShip } from "react-icons/tb";
import { LiaBroomSolid } from "react-icons/lia";
import { BsSoundwave } from "react-icons/bs";
import { SlChemistry } from "react-icons/sl";
import { TbWashTumbleDry } from "react-icons/tb";
import { GrServices } from "react-icons/gr";
import { FaRegFileAlt } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";

import Link from "next/link";
import Image from "next/image";
import LocationSelect from "@/components/dashboard/locationSelect/locationSelect";
import React, { useEffect, useState } from "react";
import { ServiceAppointmentEntity } from "@/domain/entity/service_appointment_entity";
import { getAllServiceAppointmentApi } from "@/data/api/service_appointment/get_all_service_appointment_api";
import { useAddress } from "@/components/address/address_context";
import { useLoading } from "@/components/loading/loading_context";
import { useRouter } from "next/navigation";



export default function Services() {

    const { selectedAddresses } = useAddress();
    const [services, setservices] = useState<ServiceAppointmentEntity[]>([]);
    const [items, setItems] = useState([]);
    const { push } = useRouter();

    const { setLoading } = useLoading();
    useEffect(() => {
        if (selectedAddresses) {
            fetchService();
        }
    }, [selectedAddresses]);

    async function fetchService() {
        try {
            setLoading(true);
            var result = await getAllServiceAppointmentApi(selectedAddresses.Id);
            result.fold(
                (error) => {
                },
                (data) => {
                    setservices(data);
                    setItems(generateList(data));
                }
            );
        } finally {
            setLoading(false);
        }
    }

    function onRoute(item) {
        if (item.staff)
            push(`${item.buttonRoad}?type=${item.type}&data=${item.staff.Id}`, undefined);
        else
            push(`${item.buttonRoad}?type=${item.type}`);

    }

    function generateList(data: ServiceAppointmentEntity[]) {
        const Cooking_Oil_Collection = data.find(appointment => appointment.ServiceTypeId === 1);
        const Grease_Trap_Management = data.find(appointment => appointment.ServiceTypeId === 2);
        const Hydro_Line_Jetting = data.find(appointment => appointment.ServiceTypeId === 3);
        const Kitchen_Hood_Cleaning = data.find(appointment => appointment.ServiceTypeId === 4);
        const Power_Washing = data.find(appointment => appointment.ServiceTypeId === 5);
        const Extra_Services = data.find(appointment => appointment.ServiceTypeId === 6);

        return [{
            icon: <TbShip size={"36"} />,
            title: "Cooking Oil Collection",
            staff: Cooking_Oil_Collection,
            status: (Cooking_Oil_Collection) ? "enrolled" : "Sign Up",
            // buttonRoad: "/dashboard/cookingOil",
            buttonRoad: "/dashboard/enrollservice",
            type: "Cooking_Oil_Collection",
        },
        {
            icon: <LiaBroomSolid size={"36"} />,
            title: "Grease Trap Management",
            staff: Grease_Trap_Management,
            status: (Grease_Trap_Management) ? "enrolled" : "Sign Up",
            // buttonRoad: "/dashboard/greaseTrap",
            buttonRoad: "/dashboard/enrollservice",
            type: "Grease_Trap_Management",

        },
        {
            icon: <BsSoundwave size={"36"} />,
            title: "Hydro Line Jetting",
            staff: Hydro_Line_Jetting,
            status: (Hydro_Line_Jetting) ? "enrolled" : "Sign Up",
            // buttonRoad: "/dashboard/forms/grease_trap_ma",
            buttonRoad: "/dashboard/enrollservice",
            type: "Hydro_Line_Jetting",

        },
        {
            icon: <SlChemistry size={"36"} />,
            title: "Kitchen Hood Cleaning",
            staff: Kitchen_Hood_Cleaning,
            status: (Kitchen_Hood_Cleaning) ? "enrolled" : "Sign Up",
            // buttonRoad: "/dashboard/forms/grease_trap_ma",
            buttonRoad: "/dashboard/enrollservice",
            type: "Kitchen_Hood_Cleaning",

        },
        {
            icon: <TbWashTumbleDry size={"36"} />,
            title: "Power Washing",
            staff: Power_Washing,
            status: (Power_Washing) ? "enrolled" : "Sign Up",
            // buttonRoad: "/dashboard/forms/grease_trap_ma",
            buttonRoad: "/dashboard/enrollservice",
            type: "Power_Washing",
        },
        {
            icon: <GrServices size={"36"} />,
            title: "Extra Services",
            staff: Extra_Services,
            status: (Extra_Services) ? "enrolled" : "Sign Up",
            // buttonRoad: "/dashboard/forms/grease_trap_ma",
            buttonRoad: "/dashboard/enrollservice",
            type: "Extra_Services",
        },]
    }




    return (
        <>
            <div className={styles.wrapper} >

                <div className={styles.sectLocation}>
                    <Image src="/fluent_location-regular.svg" alt="location icon" width={36} height={36} style={{ width: 'auto', height: 'auto' }} />
                    <LocationSelect />
                </div>
                <div className={styles.scrollStaff}>
                    <div className={styles.mainText}>
                        <Image src="/services_icon.svg" alt="group" width={36} height={36} loading="lazy" />
                        <h1>My services</h1>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.cardsContainer}>
                            {items.map((item, index) => (
                                <div className={styles.card} key={index}>
                                    <div className={styles.mainInfo}>
                                        <div className={styles.iconStyle}>
                                            {item.icon}
                                            <p>{item.title}</p>
                                        </div>
                                        {item.status === "Sign Up" ? null : (
                                            <><div className={styles.smallStaff}>
                                                Frequency: <p>{item.staff.FrequencyType}x yr</p>
                                            </div><div className={styles.smallStaff}>
                                                    Start date: <p>{new Date(item.staff.StartDate).toLocaleDateString()}</p>
                                                </div></>
                                        )}
                                    </div>
                                    <div >
                                        <div className={styles.subsButtom} key={index} onClick={() => onRoute(item)}>{item.status}
                                            {item.status === "enrolled" ? <FaRegFileAlt size={17} /> : <IoLogInOutline size={24} />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.emergencyService}>
                <Link key="unique_key" href="/dashboard/emergency" className={`${styles.emerButton} ${styles.subsButtom}`}>
                    Emergency Service
                    <Image src="/emergency_serc_icon.svg" width={25} height={25} alt="emergency" />
                </Link>
            </div>
        </>
    )
}
