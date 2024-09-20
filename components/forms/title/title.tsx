"use client"
import styles from "@/components/forms/title/title.module.css";
import Image from "next/image";

export default function Title({ title, icon, onPress = null }) {
  return (
    <div className={styles.title}>
      {icon && (
        <div onClick={() => (onPress ? onPress() : null)} style={{ cursor: "pointer" }}>
          <Image src={icon} width={36} height={36} alt="broom" />
        </div>
      )}
      <h1>{title}</h1>
    </div>
  );
}
