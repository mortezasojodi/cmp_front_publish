import Link from "next/link";
import styles from "@/components/forms/signUpButtons/signUpButtons.module.css"
import { IoLogInOutline } from "react-icons/io5";
import { AiOutlineStop } from "react-icons/ai";
import { MdDone } from "react-icons/md";




export default function SignUpButtons({ nameOfButton, iconOfButton, status, Click }) {
    return (
        <div className={styles.container}>
            <Link className={styles.cancel} href="/dashboard/services">cancel</Link>
            <button className={`${styles.signUp} ${status === "cancel" && styles.cancelService}`} onClick={Click} href={''}>
                {nameOfButton}
                {status === "cancel" ? <AiOutlineStop size={22} /> : status === "save" ? <MdDone size={24} /> : iconOfButton}
                {/* {status === "cansel" && <Dialog isOpen={isOpen} onClose={handleCloseDialog}>
                    <CanselServiceForm/>
                </Dialog>} */}
            </button>
        </div>

    )
}


export function EditProfileButtons({ nameOfButton, iconOfButton, status }) {
    return (
        <div className={styles.container}>
            <Link className={styles.cancel} href="/dashboard/services">cancel</Link>
            <button type="submit" className={`${styles.signUp}  ${status === "cancel" && styles.cancelService}`} href={''}>
                {nameOfButton}
                {status === "cancel" ? <AiOutlineStop size={22} /> : status === "save" ? <MdDone size={24} /> : iconOfButton}
                {/* {status === "cansel" && <Dialog isOpen={isOpen} onClose={handleCloseDialog}>
                    <CanselServiceForm/>
                </Dialog>} */}
            </button>
        </div>

    )
}

{/* <IoLogInOutline size={24} /> */ }