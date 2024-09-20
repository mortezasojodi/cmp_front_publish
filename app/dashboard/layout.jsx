"use client"

import SideBar from "@/components/dashboard/sidebar/sideBar";
import styles from "@/components/dashboard/services/services.module.css"
// import styles from "@/components/dashboard/dashboard.module.css"
import Header from "@/components/header/header";
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAllOperationalAddress } from "@/data/api/dashboard/operationalAddress/get_all";
import toast from "react-hot-toast";
import { AddressContext, AddressProvider, useAddress } from "@/components/address/address_context";
import { useLoading } from "@/components/loading/loading_context";
import { UnAuthorize } from "@/shared/core/either";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/shared/route/app_route";


export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { refreshAdr } = useAddress();
  const { setLoading } = useLoading();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const { replace } = useRouter();

  useEffect(() => {
    fetch();
  }, []);


  async function fetch() {
    setLoading(true);
    try {
      await refreshAdr();

    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={styles.container}>
      {/* <AddressProvider> */}
      <Header toggleMenu={toggleMenu} />
      <div className={styles.bottom}>
        <div className={styles.menu}>
          <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
      {/* </AddressProvider> */}
    </div>
  );
}

