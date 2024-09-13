"use client"
import styles from "./sideBar.module.css"
import MenuLink from "./menuLink/menuLink"
import ButtonChangeUser from "../buttonChangeUser/buttonChangeUser";
import Image from "next/image";

const menuItems = [
        {
          title: "Home",
          path: "/dashboard",
          // status: "red",
          status: "",
          quantity: 2,
          icon: "",
        },
        {
          title: "Services",
          path: "/dashboard/services",
          status: "",
          icon: "/sideIcons/white_services_icon.svg",
        },
        {
          title: "Request service",
          path: "/dashboard/services",
          status: "",
          icon: "/sideIcons/request_icon.svg",
        },
        {
          title: "Invoices and Payments",
          path: "/dashboard/invoices",
          // status: "yellow",
          status: "",
          quantity: 2,
          icon: "/sideIcons/invoices_icon.svg",
        },
        {
          title: "Inbox",
          path: "/dashboard/services",
          // status: "yellow",
          status: "",
          quantity: 2,
          icon: "",
        },
        {
          title: "Statistics",
          path: "/dashboard/services",
          status: "",
          icon: "/sideIcons/statistic_icon.svg",
        },
        {
          title: "Help",
          path: "/dashboard/services",
          status: "",
          icon: "/sideIcons/chat_icon.svg"
        },
  ];
  

export default function SideBar({isOpen, toggleMenu}) {
    return (
      <>
      <div className={`${styles.sideBar} ${isOpen ? styles.open : ''}`}>
            <nav>
                <ul className={styles.list}>
                    {menuItems.map((cat, index) => (
                        <MenuLink item={cat} key={index} />
                    ))}
                </ul>
            </nav>
            <div className={styles.mobileNavigation}>
              <div className={styles.navigSec}>
                  <button className={styles.notifiButton}>
                      <Image src="/heroicons_bell.svg" alt="jsdnchusld" width={'24'} height={'24'}/>
                  </button>
                  <Image src="/avatar.png" alt="avatar" width={54} height={54} />
                 
              </div>
              {/* <ButtonChangeUser /> */}
            </div>
        </div>
        <div className={`${styles.cover} ${isOpen ? styles.coverOpen : ''}`}
        onClick={toggleMenu}
    ></div>
      </>
      
  )
}