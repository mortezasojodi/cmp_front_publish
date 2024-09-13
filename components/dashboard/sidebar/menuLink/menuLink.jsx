"use client"

import Link from "next/link"
import styles from "./menuLink.module.css"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { GoHome } from "react-icons/go";
import { GoInbox } from "react-icons/go";

export default function MenuLinks({item}){

    const pathname = usePathname()

    return (
        <li className={styles.cat} key={item.index}>
            <Link href={item.path} className={`${styles.container} ${pathname == item.path && styles.active}` }>

                
            {item.icon ? <Image src={item.icon} width={24} height={24} alt="icon"/> : (item.title === "Home" ? <GoHome size={24} /> : <GoInbox size={"24"}/>)}
                
                <div className={styles.categoryText}>{item.title}</div>
                
                {item.status === "" ? null : (
                    <div className={`${styles.statusCircle} ${item.status === "red" ? styles.warning : styles.message}`}>
                    {item.quantity}
                    </div>
                )}
            </Link>
        </li>
    )
}