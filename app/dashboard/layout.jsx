"use client"
  import SideBar from "@/components/dashboard/sidebar/sideBar";
  import styles from "@/components/dashboard/services/services.module.css"
  // import styles from "@/components/dashboard/dashboard.module.css"
  import Header from "@/components/header/header";
  import React, { useState } from 'react';


  export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    
    return (
      <div className={styles.container}>
        <Header toggleMenu={toggleMenu}/>
        <div className={styles.bottom}>
          <div className={styles.menu}>
              <SideBar isOpen={isOpen} toggleMenu={toggleMenu}/>
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    );
  }

