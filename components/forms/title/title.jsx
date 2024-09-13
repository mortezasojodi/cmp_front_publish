import styles from "@/components/forms/title/title.module.css"
import Image from "next/image"

export default function Title({title, icon}){
    return(
    <div className={styles.title}>
        <Image src={icon} width={"36"}  height={"36"} alt="broom" />
        <h1>{title}</h1>
    </div>
    )
}