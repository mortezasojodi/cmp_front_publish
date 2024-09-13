"use client"
import styles from "@/components/forms/paymentMethod.module.css";
import Image from "next/image";
import React, { useState } from 'react';
import { IoCardOutline } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import { CgInfo } from "react-icons/cg";


import FormFrame from "./formFrame/formFrame";
import PaymentOptions from "./paymentOptions/paymentOptions";
import SignUpButtons from "./signUpButtons/signUpButtons";
import BillingInformation from "./billingInformation/billingInformation";

export default function PaymentMethod(){
    const [selectedButton, setSelectedButton] = useState('card');

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const [showOtherCardForm, setShowOtherCardForm] = useState(false);

    const handleUseAnotherCard = () => {
        setShowOtherCardForm(true);
    };

    const cardsData = [
        { id: 1, number: "4728 5963 2147 3098", type: "CreditCard", logo: "Лого банка 1" },
        { id: 2, number: "8512 7436 2098 5173", type: "DebitCard", logo: "Лого банка 2" },
      ];

    return (
        <div>
          <div className={styles.container}>
            <button className={`${styles.selectedButton} ${selectedButton === 'card' ? styles.active : ''}`} onClick={() => handleButtonClick('card')}>
              <IoCardOutline size={'24'}/>Card
            </button>
            <button  className={`${styles.selectedButton} ${selectedButton === 'paypal' ? styles.active : ''}`} onClick={() => handleButtonClick('paypal')}>
                <Image width={'82'} height={'20'} src={"/pay_pal_logo.png"} alt="pay pal"/>
            </button>
        </div>
        <FormFrame>
            {showOtherCardForm ? (
                <BillingInformation Click={handleUseAnotherCard}/>
            ) : (
            <div className={styles.paymentMethod}>
                <label className={styles.label} id="paymentMethod">Payment Method:</label>
                <div className={styles.rightSide}>
                <PaymentOptions id="paymentMethod" data={cardsData}/>
                <button className={styles.addNewCard} onClick={handleUseAnotherCard}>
                    <GoPlusCircle size={"24"}/> use another card
                </button>
                <div className={styles.info}>
                    <CgInfo style={{ minWidth: '18px' }}/>  
                    <p className={styles.privacyPolicyText}>
                    By clicking the button, you confirm that you have read and agree to Ecoenergy
                    <a href=""> Terms of Service</a> and <a href="">Privacy Policy.</a>
                    </p>
                </div>
                <SignUpButtons nameOfButton={"pay"} iconOfButton={<IoCardOutline size={'24'}/>}/>
                </div>
            </div>
            )}
        </FormFrame>
        </div>
      );
}