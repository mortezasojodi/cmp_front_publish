"use client"
import styles from "./paymentForm.module.css"

import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import Image from "next/image";
import { SiMastercard } from "react-icons/si";
import { SiVisa } from "react-icons/si";
import { CgInfo } from "react-icons/cg";
import { IoCardOutline } from "react-icons/io5";

// import PaymentOptions from "@/comments/forms/paymentOptions/paymentOptions";
import Switch from '@/components/forms/switch/switch';
import RegistationSuccessModal from '../signUp/registrationSuccessModule'
// import SignUpButtons from "../signUpButtons/signUpButtons";

import { submitBillingInformation } from "@/app/utils/apiService"; 

const PaymentForm = ({ onBack, onRegistrationSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedButton, setSelectedButton] = useState('card');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const response = await submitBillingInformation(data, selectedButton);

    if (response.Success) {
        console.log("submit Billing Information");
      onRegistrationSuccess();
    } else {
      console.error('Failed to submit billing information:', response.Message);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <button 
          className={`${styles.selectedButton} ${selectedButton === 'card' ? styles.active : ''}`} 
          onClick={() => handleButtonClick('card')}
        >
          <IoCardOutline size={'24'}/>Card
        </button>
        <button  
          className={`${styles.selectedButton} ${selectedButton === 'paypal' ? styles.active : ''}`} 
          onClick={() => handleButtonClick('paypal')}
        >
          <Image width={'82'} height={'20'} src={"/pay_pal_logo.png"} alt="pay pal"/>
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>Card Information</label>
        <div className={styles.formSection}>
          <label htmlFor="cardholderName">Cardholder name:</label>
          <input
            className={`${styles.inputInformation} ${errors.cardholderName ? styles.inputError : ''}`}
            placeholder="Enter name"
            type="text"
            id="cardholderName"
            {...register('cardholderName', { required: 'Cardholder name is required' })}
          />
        </div>
        
        <div className={styles.formSection}>
          <label htmlFor="cardNumber">Card Number:</label>
          <div className={`${styles.inputWithButton} ${errors.cardNumber ? styles.inputError : ''}`}>
            <input
              type="text"
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              {...register('cardNumber', { required: 'Card number is required', pattern: { value: /^\d+$/ } })}
            />
            <div className={styles.inputIconButton}>
              <button type="button"><SiMastercard size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
              <button type="button"><SiVisa size={24} color='rgba(23, 43, 133, 1)' style={{ minWidth: '24px' }} /></button>
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor="expiry">Expiry / CVC:</label>
          <div className={styles.twoInputs}>
            <input
              className={`${styles.inputInformation} ${errors.expiry ? styles.inputError : ''}`}
              placeholder="MM/YY"
              type="text"
              id="expiry"
              {...register('expiry', { required: 'Expiry date is required'})}
            />
            <input
              className={`${styles.inputInformation} ${errors.cvc ? styles.inputError : ''}`}
              placeholder="000"
              type="text"
              id="cvc"
              {...register('cvc', { required: 'CVC is required', pattern: { value: /^\d+$/ } })}
            />
          </div>
        </div>
        <div className={styles.agreementText}>
          <Switch active={false} /> <span>Save card information</span>
        </div>
        <label>Billing Address</label>
        <div className={styles.formSection}>
          <label htmlFor="address">Address:</label>
          <input
            className={`${styles.inputInformation} ${errors.address ? styles.inputError : ''}`}
            placeholder="Enter address"
            type="text"
            id="address"
            {...register('address', { required: 'Address is required' })}
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="city">City:</label>
          <input
            className={`${styles.inputInformation} ${errors.city ? styles.inputError : ''}`}
            placeholder="Enter city"
            type="text"
            id="city"
            {...register('city', { required: 'City is required' })}
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="state">State:</label>
          <input
            className={`${styles.inputInformation} ${errors.state ? styles.inputError : ''}`}
            placeholder="Select state"
            type="text"
            id="state"
            {...register('state', { required: 'State is required' })}
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="zipcode">ZIP Code:</label>
          <input
            className={`${styles.inputInformation} ${errors.zipcode ? styles.inputError : ''}`}
            placeholder="Enter code"
            type="text"
            id="zipcode"
            {...register('zipcode', { required: 'ZIP code is required', pattern: { value: /^\d+$/ } })}
          />
        </div>
        <div className={styles.info}>
          <CgInfo style={{ minWidth: '18px' }} />
          <p className={styles.privacyPolicyText}>
            By clicking the button, you confirm that you have read and agree to Ecoenergy
            <a href=""> Terms of Service</a> and <a href="">Privacy Policy.</a>
          </p>
        </div>
        <div className={styles.submitButtons}>
          <button className={styles.cancel} type='button' onClick={onBack}>Back</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
