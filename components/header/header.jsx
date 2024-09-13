
import styles from "./header.module.css"
import Image from "next/image";
import { IoLogInOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ButtonChangeUser from "../dashboard/buttonChangeUser/buttonChangeUser";
import MainLogo from "../mainLogo";
import { Link } from "react-router-dom";



export default function Header({toggleMenu}){

    return (
        <div className={styles.container}>
            <button className={styles.menuButton} onClick={toggleMenu}>
                <RxHamburgerMenu size={35} />
            </button>
            <MainLogo/>
            <div className={styles.navigSec}>
                <div className={styles.changeButtonDiv}>
                {/* <ButtonChangeUser/> */}
                    <button className={styles.notifiButton}>
                        <Image src="/heroicons_bell.svg" alt="notifications" width={'24'} height={'24'}/>
                    </button>
                    <a href="/dashboard/profileEdit">
                        <Image src="/avatar.png" alt="avatar" width={54} height={54} />
                    </a>
                </div>
                <IoLogInOutline color="rgba(246, 197, 23, 1)" size={'30px'}/>
            </div>
            
        </div>
    )
}