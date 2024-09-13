// components/PaymentOptions.js

import React, { useState } from 'react';
import styles from './paymentOptions.module.css';
import { SiVisa } from "react-icons/si";


const PaymentOptions = ({ data }) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(data[0].number);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

 
  const hideCardNumber = (number) => {
    if (number.length > 4) {
      const lastFourDigits = number.slice(-4);
      return '*'.repeat(number.length - 4) + lastFourDigits;
    } else {
      return number;
    }
  };

  return (
    <div className={styles.container}>
      {data.map((option, index) => (
          <label
            key={index}
            className={`${styles.paymentOption} ${selectedOption === option.number ? styles.selected : ''}`}
            htmlFor={`option-${index}`}
            onClick={() => handleOptionChange(option.number)} >
          <div className={styles.label}>
          <SiVisa size={24} color='rgba(23, 43, 133, 1)' style={{ minWidth: '24px' }}/>
            <div className={styles.cardInformation}>
              <div>{option.type}</div>
              <p>{hideCardNumber(option.number)}</p>
            </div>
          </div>
          <input
            type="radio"
            id={`option-${index}`}
            name="payment-option"
            value={option.number}
            className={styles.input}
            checked={selectedOption === option.number}
            onChange={() => handleOptionChange(option.number)}
          />
        </label>
      ))}
    </div>
  );
};

export default PaymentOptions;