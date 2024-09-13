"use client"
import styles from "@/components/dashboard/dashboard.module.css";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from 'react';

const addresses = [
    { name: "San Diego International Airport", address: "3665 N Harbor Dr, San Diego, CA 92101"},
    { name: "Philadelphia", address: "8000 Essington Ave, Philadelphia, PA 19153"},
    { name: "San Antonio", address: "9800 Airport Blvd, San Antonio, TX 78216" },
    { name: "San Diego", address: "3225 N Harbor Dr, San Diego, CA 92101"}
];
export default function Dashboard(){

    const [delayedNavigation, setDelayedNavigation] = useState(false);

    const {push} = useRouter();

    const handleClick = (id) => {
        console.log("Clicked ID:", id);

        push('/dashboard/services');
        setDelayedNavigation(true);
        // setTimeout(() => {
        //     location.href = '/dashboard/services';
        // }, 2000); // 3 секунды задержки
    };

    const addNewAdderss = () => {
        push('/dashboard/newAddress');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
            <h1>Manage your Locations</h1>
            <button className={styles.newButtom} onClick={addNewAdderss}>ADD NEW ADDRESS</button>
            </div>
            <div>
                {addresses.map((address, index) => (
                    <div
                        key={index}
                        className={styles.addressItem}
                        onClick={() => handleClick(index)}
                    >
                        <span>{address.name}</span>
                        <p className={styles.addressInfo}>{address.address}</p> 
                    </div>
                ))}
            </div>
        </div>
    );
}
