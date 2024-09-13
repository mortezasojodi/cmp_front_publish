import { MdSearch } from 'react-icons/md'
import styles from './search.module.css'

export default function Search({placeholder}){
    return (
        <div className={styles.container}>
            <MdSearch/>
            <input type="text" placepolder={placeholder} className={styles.input} />
        </div>
    )
}