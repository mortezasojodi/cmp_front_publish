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


  const handleClick = (model: OperationalAddressEntity) => {


    push(`/dashboard/newAddress?data=${JSON.stringify(model)}`, undefined);
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
        {addresses.map((address: OperationalAddressEntity, index) => (
          <div
            key={index}
            className={styles.addressItem}
            onClick={() => handleClick(address)}
          >
            <span>{address.Address}</span>
            <p className={styles.addressInfo}>{address.Lat + " , " + address.Long}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
