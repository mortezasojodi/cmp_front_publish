import styles from '@/components/login/login.module.css'
import MainLogo from '@/components/mainLogo';
import Image from "next/image";

export default function Layout({ children }) {
    return (
      <div className={styles.container}>
        <div className={styles.sideBg}>
            <MainLogo/>
            {/* <Image alt="main logo" src="/main_logo.png " width="210" height="54" priority={true}/> */}
        </div>
        <div className={styles.content}>
          <div className={styles.loginPageContainer}>
            {children}
          </div>
        </div>
      </div>
    );
  }
  