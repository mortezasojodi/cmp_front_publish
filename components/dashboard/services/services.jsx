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

const itemList = [
    {
        icon: <TbShip size={"36"}/>,
        title: "Cooking Oil Collection",
        staff: {
            frequency: "8",
            NextService: "9 / 2 / 2024"
        },
        status: "enrolled",
        buttonRoad: "/dashboard/cookingOil",
    },
    {
        icon: <LiaBroomSolid  size={"36"}/>,
        title: "Grease Trap Management",
        staff: "null",
        status: "Sign Up",
        buttonRoad: "/dashboard/greaseTrap",

    },
    {
        icon: <BsSoundwave  size={"36"}/>,
        title: "Hydro Line Jetting",
        staff: {
            frequency: 12,
            NextService: "9 / 2 / 2024"
        },
        status: "enrolled",     
        // buttonRoad: "/dashboard/forms/grease_trap_ma",
        buttonRoad: "",

    },  

    {
        icon: <SlChemistry  size={"36"}/>,
        title: "Kitchen Hood Cleaning",
        staff: "null",
        status: "Sign Up",
        // buttonRoad: "/dashboard/forms/grease_trap_ma",
        buttonRoad: "",

    },
    {
        icon: <TbWashTumbleDry  size={"36"}/>,
        title: "Power Washing",
        staff: "null",
        status: "Sign Up",        
        // buttonRoad: "/dashboard/forms/grease_trap_ma",
        buttonRoad: "",
    },

    {
        icon: <GrServices  size={"36"}/>,
        title: "Extra Services",
        staff: "null",
        status: "Sign Up",
        // buttonRoad: "/dashboard/forms/grease_trap_ma",
        buttonRoad: "",
    },
]

export default function Services(){

    return(
        <>
         <div className={styles.wrapper} >
            
            <div className={styles.sectLocation}>
                    <Image src="/fluent_location-regular.svg" alt="location icon" width={36} height={36}  style={{ width: 'auto', height: 'auto' }}/>
                    <LocationSelect/>
            </div>
            <div className={styles.scrollStaff}>
                <div className={styles.mainText}>
                    <Image src="/services_icon.svg" alt="group" width={36} height={36} loading="lazy" />
                    <h1>My services</h1>
                </div>
                <div className={styles.main}>
                    <div className={styles.cardsContainer}>
                        {itemList.map((item, index) => (
                            <div className={styles.card} key={index}>
                                <div className={styles.mainInfo}>
                                    <div className={styles.iconStyle}>
                                        {item.icon} 
                                        <p>{item.title}</p>
                                    </div>
                                    {item.status === "Sign Up" ? null : (
                                    <><div className={styles.smallStaff}>
                                            Frequency: <p>{item.staff.frequency}x yr</p>
                                        </div><div className={styles.smallStaff}>
                                                Next service: <p>{item.staff.NextService}</p>
                                            </div></>
                                    )}
                                    </div>
                                <div >
                                    <Link className={styles.subsButtom} key={index} href={item.buttonRoad}>{item.status}
                                    {item.status === "enrolled" ? <FaRegFileAlt size={17} /> : <IoLogInOutline size={24} />}
                                    </Link>
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
                    <Image src="/emergency_serc_icon.svg" width={25} height={25} alt="emergency"/>
                </Link>
        </div>
        </>
    )
}
