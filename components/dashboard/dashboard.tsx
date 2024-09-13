"use client";
import styles from "@/components/dashboard/dashboard.module.css";

import { OperationalAddressEntity } from "@/domain/entity/operational_address_entity";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddress } from "../address/address_context";


export default function Dashboard() {
  const [delayedNavigation, setDelayedNavigation] = useState(false);
  const { addresses } = useAddress();

  const { push } = useRouter();

  const handleClick = (id) => {
    console.log("Clicked ID:", id);

    push("/dashboard/services", undefined);
    // setDelayedNavigation(true);

  };

  const addNewAdderss = () => {
    push("/dashboard/newAddress", undefined);
  };



  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Manage your Locations</h1>
        <button className={styles.newButtom} onClick={addNewAdderss}>
          ADD NEW ADDRESS
        </button>
      </div>
      <div>
        {addresses.map((address, index) => (
          <div
            key={index}
            className={styles.addressItem}
            onClick={() => handleClick(index)}
          >
            <span>{address.FirstName} {address.LastName}</span>
            <p className={styles.addressInfo}>{address.Address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
