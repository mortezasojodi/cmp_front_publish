'use client'
import styles from "@/components/forms/title/title.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoArrowBack, } from "react-icons/io5";



export default function TitleBack({ title, icon }) {
    const { back } = useRouter();
    return (
        <div className={styles.titleBack}>
            {<IoArrowBack size={25} onClick={() => back()} />}
            {icon && <Image src={icon} width={36} height={36} alt="broom" />}
            <h1>{title}</h1>
        </div>
    );
}


