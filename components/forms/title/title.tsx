import styles from "@/components/forms/title/title.module.css";
import Image from "next/image";



export default function Title({ title, icon, onPress = null }) {
  return (
    <div className={styles.title}>
      {icon && <Image src={icon} width={"36"} height={"36"} alt="broom" onClick={() => (onPress) ? onPress() : null} />}
      <h1>{title}</h1>
    </div>
  );
}


