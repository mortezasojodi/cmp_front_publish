import React, { useState } from "react";
import styles from "./locationSelect.module.css";
import { useAddress } from "@/components/address/address_context";


export default function LocationSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const { addresses, selectedAddresses, setSelectedAddresses } = useAddress();

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedAddresses(value);
    setIsOpen(false);
    console.log(value);
  };

  return (
    <div className={styles.dropDownContainer}>
      <div className={styles.dropDownHeader} onClick={toggling}>
        <div>
          <h1>Location - {selectedAddresses?.Name}</h1>
          <p>{selectedAddresses?.Address}</p>
        </div>
        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.86603 6.5C4.48113 7.16667 3.51887 7.16667 3.13397 6.5L0.535899 2C0.150999 
            1.33334 0.632124 0.500001 1.40192 0.500001L6.59808 0.500001C7.36788 0.500001 7.849 1.33333 
            7.4641 2L4.86603 6.5Z" fill="#1F2229" /></svg>
      </div>
      {isOpen && (
        <div className={styles.dropDownListContainer}>
          <ul className={styles.dropDownList}>
            {addresses.map(option => (
              <li className={styles.listItem} onClick={onOptionClicked(option)} key={Math.random()}>
                {option.Name} - {selectedAddresses?.Address}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
