
import styles from "./header.module.css"
import Image from "next/image";
import { IoLogInOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ButtonChangeUser from "../dashboard/buttonChangeUser/buttonChangeUser";
import MainLogo from "../mainLogo";
import Link from "next/link";
import { AppConfig } from "@/shared/app_config";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/shared/route/app_route";
import ShoppingCardIcon from "../dashboard/shoppingCard/shopping_card_icon";



export default function Header({ toggleMenu }) {

    const { replace } = useRouter();

    return (
        <div className={styles.container}>
            <button className={styles.menuButton} onClick={toggleMenu}>
                <RxHamburgerMenu size={35} />
            </button>
            <MainLogo />
            <div className={styles.navigSec}>
                <div className={styles.changeButtonDiv}>
                    {/* <ButtonChangeUser/> */}
                    <ShoppingCardIcon />
                    <button className={styles.notifiButton}>
                        <Image src="/heroicons_bell.svg" alt="notifications" width={'24'} height={'24'} />
                    </button>
                    <Link href={`${APP_ROUTES.EditProfile}`}>
                        <Image src="/avatar.png" alt="avatar" width={54} height={54} />
                    </Link>
                </div>
                <IoLogInOutline color="rgba(246, 197, 23, 1)" size={'30px'} onClick={() => AppConfig.logOut(replace)} />
            </div>

        </div>
    )
}