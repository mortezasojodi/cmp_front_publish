'use client'
import styles from "./services.module.css"
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
import { ServiceEntity } from "@/domain/entity/service_entity";
import { getAllServiceApi } from "@/data/api/service/get_all_service_api";



export default function Services() {

    const { selectedAddresses } = useAddress();
    const [appointmentservices, setAppointmentservices] = useState<ServiceAppointmentEntity[]>([]);
    const [services, setservices] = useState<ServiceEntity[]>([]);

    const [items, setItems] = useState<ServiceEntity[]>([]);
    const { push } = useRouter();

    const { setLoading } = useLoading();
    useEffect(() => {
        if (selectedAddresses) {
            fetchAppointmentService();
        }
    }, [selectedAddresses]);

    async function fetchAppointmentService() {
        try {
            setLoading(true);
            var result = await getAllServiceAppointmentApi(selectedAddresses.Id);
            result.fold(
                (error) => {
                    setLoading(false);
                },
                (data) => {
                    setAppointmentservices(data);
                    fetchService(data);
                }
            );
        } finally {
        }
    }

    async function fetchService(serviceAppointment: ServiceAppointmentEntity[]) {
        try {
            setLoading(true);
            var result = await getAllServiceApi();
            result.fold(
                (error) => {
                },
                (data) => {
                    setItems((data));
                }
            );
        } finally {
            setLoading(false);
        }
    }


    function onRoute(item: ServiceEntity, serviceappoitnment: ServiceAppointmentEntity) {
        if (serviceappoitnment)
            push(`/dashboard/enrollservice?data=${serviceappoitnment.Id}&serviceId=${item._id}&type=${item.name}`, undefined);
        else
            push(`/dashboard/enrollservice?serviceId=${item._id}&type=${item.name}`);

    }

    function existService(service: ServiceEntity[], id: string): boolean {
        return service.find(appointment => appointment._id === id) != null;
    }

    // function generateList(data: ServiceAppointmentEntity[], service: ServiceEntity[]) {
    //     // const Cooking_Oil_Collection = data.find(appointment => appointment.ServiceTypeId === ServiceItemConst.Cooking_Oil_Collection);
    //     // const Grease_Trap_Management = data.find(appointment => appointment.ServiceTypeId === ServiceItemConst.Grease_Trap_Management);
    //     // const Hydro_Line_Jetting = data.find(appointment => appointment.ServiceTypeId === ServiceItemConst.Hydro_Line_Jetting);
    //     // const Kitchen_Hood_Cleaning = data.find(appointment => appointment.ServiceTypeId === ServiceItemConst.Kitchen_Hood_Cleaning);
    //     // const Power_Washing = data.find(appointment => appointment.ServiceTypeId === ServiceItemConst.Power_Washing);
    //     // const Extra_Services = data.find(appointment => appointment.ServiceTypeId === ServiceItemConst.Extra_Services);

    //     // const Cooking_Oil_Collection = data.find(appointment => appointment.ServiceTypeId === 1);
    //     // const Grease_Trap_Management = data.find(appointment => appointment.ServiceTypeId === 2);
    //     // const Hydro_Line_Jetting = data.find(appointment => appointment.ServiceTypeId === 3);
    //     // const Kitchen_Hood_Cleaning = data.find(appointment => appointment.ServiceTypeId === 4);
    //     // const Power_Washing = data.find(appointment => appointment.ServiceTypeId === 5);
    //     // const Extra_Services = data.find(appointment => appointment.ServiceTypeId === 6);




    //     // return [

    //     //     {
    //     //         enable: existService(service, ServiceItemConst.Cooking_Oil_Collection),
    //     //         icon: <TbShip size={"36"} />,
    //     //         title: "Cooking Oil Collection",
    //     //         staff: Cooking_Oil_Collection,
    //     //         status: (Cooking_Oil_Collection) ? "enrolled" : "Sign Up",
    //     //         // buttonRoad: "/dashboard/cookingOil",
    //     //         serviceId: ServiceItemConst.Cooking_Oil_Collection,
    //     //         buttonRoad: "/dashboard/enrollservice",
    //     //         type: "Cooking_Oil_Collection",
    //     //     },
    //     //     {
    //     //         enable: existService(service, ServiceItemConst.Grease_Trap_Management),
    //     //         icon: <LiaBroomSolid size={"36"} />,
    //     //         title: "Grease Trap Management",
    //     //         staff: Grease_Trap_Management,
    //     //         status: (Grease_Trap_Management) ? "enrolled" : "Sign Up",
    //     //         // buttonRoad: "/dashboard/greaseTrap",
    //     //         serviceId: ServiceItemConst.Grease_Trap_Management,
    //     //         buttonRoad: "/dashboard/enrollservice",
    //     //         type: "Grease_Trap_Management",

    //     //     },
    //     //     {
    //     //         enable: existService(service, ""),
    //     //         icon: <BsSoundwave size={"36"} />,
    //     //         title: "Hydro Line Jetting",
    //     //         staff: Hydro_Line_Jetting,
    //     //         status: (Hydro_Line_Jetting) ? "enrolled" : "Sign Up",
    //     //         // buttonRoad: "/dashboard/forms/grease_trap_ma",
    //     //         buttonRoad: "/dashboard/enrollservice",
    //     //         type: "Hydro_Line_Jetting",

    //     //     },
    //     //     {
    //     //         enable: existService(service, ""),
    //     //         icon: <SlChemistry size={"36"} />,
    //     //         title: "Kitchen Hood Cleaning",
    //     //         staff: Kitchen_Hood_Cleaning,
    //     //         status: (Kitchen_Hood_Cleaning) ? "enrolled" : "Sign Up",
    //     //         // buttonRoad: "/dashboard/forms/grease_trap_ma",
    //     //         buttonRoad: "/dashboard/enrollservice",
    //     //         type: "Kitchen_Hood_Cleaning",

    //     //     },
    //     //     {
    //     //         enable: existService(service, ""),
    //     //         icon: <TbWashTumbleDry size={"36"} />,
    //     //         title: "Power Washing",
    //     //         staff: Power_Washing,
    //     //         status: (Power_Washing) ? "enrolled" : "Sign Up",
    //     //         // buttonRoad: "/dashboard/forms/grease_trap_ma",
    //     //         buttonRoad: "/dashboard/enrollservice",
    //     //         type: "Power_Washing",
    //     //     },
    //     //     {
    //     //         enable: existService(service, ""),
    //     //         icon: <GrServices size={"36"} />,
    //     //         title: "Extra Services",
    //     //         staff: Extra_Services,
    //     //         status: (Extra_Services) ? "enrolled" : "Sign Up",
    //     //         // buttonRoad: "/dashboard/forms/grease_trap_ma",
    //     //         buttonRoad: "/dashboard/enrollservice",
    //     //         type: "Extra_Services",
    //     //     },]
    // }


    function hasRegistered(service: ServiceEntity): ServiceAppointmentEntity {
        return appointmentservices.find(e => e.ServiceCrmId == service._id);
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
                            {items.map((item, index) => {
                                var serviceAppoitnemtn = hasRegistered(item)
                                var status = serviceAppoitnemtn != null
                                return (
                                    <div className={styles.card} key={index}>
                                        <div className={styles.mainInfo}>
                                            <div className={styles.iconStyle}>
                                                {item.image}
                                                <p>{item.name}</p>
                                            </div>
                                            {!status ? null : (
                                                <><div className={styles.smallStaff}>
                                                    Frequency: <p>{serviceAppoitnemtn.FrequencyType}x yr</p>
                                                </div><div className={styles.smallStaff}>
                                                        Start date: <p>{new Date(serviceAppoitnemtn.StartDate).toLocaleDateString()}</p>
                                                    </div></>
                                            )}
                                        </div>
                                        <div >
                                            <div className={styles.subsButtom} key={index} onClick={() => onRoute(item, serviceAppoitnemtn)}>{status ? "enrolled" : "Sign Up"}
                                                {status ? <FaRegFileAlt size={17} /> : <IoLogInOutline size={24} />}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
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
