import styles from "@/components/forms/title/title.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoArrowBack, } from "react-icons/io5";



export default function TitleBack({ title, icon }) {
    const { back } = useRouter();
    return (
        <div className={styles.titleBack}>
            {icon && <IoArrowBack size={25} onClick={() => back()} />}
            <h1>{title}</h1>
        </div>
    );
}


