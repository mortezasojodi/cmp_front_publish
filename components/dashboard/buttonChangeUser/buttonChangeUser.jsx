import styles from './buttonChangeUser.module.css'
import { LuRefreshCw } from "react-icons/lu";

export default function ButtonChangeUser(){
    return(
        <>
        <button className={styles.changeButton}>change user <LuRefreshCw size={'24px'}/></button>
       </>
    )
}