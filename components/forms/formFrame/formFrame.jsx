import styles from "@/components/forms/formFrame/formFrame.module.css"


export default function FormFrame({ children}){
    return(
        <div className={styles.container}>
            {children}
        </div>

    )
}