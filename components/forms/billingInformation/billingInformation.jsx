import styles from "../billingInformation/billingInformation.module.css"

import { SiMastercard } from "react-icons/si";
import { SiVisa } from "react-icons/si";
import { CgInfo } from "react-icons/cg";
import { IoCardOutline } from "react-icons/io5";

import PaymentOptions from "../paymentOptions/paymentOptions";
import Switch from "../switch/switch";
import SignUpButtons from "../signUpButtons/signUpButtons";

const BillingInformation = (Click) => {

    const cardsData = [
        { id: 1, number: "4728 5963 2147 3098", type: "CreditCard", logo: "Лого банка 1" },
      ];

    return(
        <>
        <form className={styles.form} >
            {/* <div className={styles.formSection}>
                <label htmlFor="cardname" >Saved cards:</label>
                <PaymentOptions data={cardsData} id="cardname"></PaymentOptions>
            </div> */}

            <label>Card Information</label>
            <div className={styles.formSection}>
                <label  htmlFor="cardholderName">Cardholder name:</label>
                <input className={styles.inputInformation} placeholder="Enter name" type="text" id="cardholderName"  />
            </div>
            <div className={styles.formSection}>
                <label  htmlFor="cardNumber">Card Number:</label>
                    <div className={styles.inputWithButton}>
                    <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000"/>
                    <div className={styles.inputIconButton}>
                        <button type="submit"><SiMastercard size={26} style={{color:"rgba(76, 142, 59, 1)"}}/></button>
                        <button><SiVisa size={24} color='rgba(23, 43, 133, 1)' style={{ minWidth: '24px' }}/></button>
                    </div>
                </div>
            </div>
            <div className={styles.formSection}>
                <label  htmlFor="expiry">Expiry / CVC:</label>
                <div className={styles.twoInputs}>
                    <input className={styles.inputInformation} placeholder="MM/YY" type="text" id="expiry"  />
                    <input className={styles.inputInformation} placeholder="000" type="text" id="expiry"  />
                </div>
                
                </div>
                <div className={styles.agreementText}>
                    <Switch active={false}/> <span>Save card information</span>
                </div>

            <label>Billing Address</label>
            
           
            <div className={styles.formSection}>
                <label  htmlFor="address">Address:</label>
                <input className={styles.inputInformation} placeholder="Enter address" type="text" id="address"  />
            </div>
            <div className={styles.formSection}>
                <label  htmlFor="city">City:</label>
                <input className={styles.inputInformation} placeholder="Enter city" type="text" id="city"  />
            </div>
            <div className={styles.formSection}>
                <label  htmlFor="state">State:</label>
                <input className={styles.inputInformation} placeholder="Select state" type="text" id="state"  />
            </div>
            <div className={styles.formSection}>
                <label  htmlFor="zipcode">ZIP Code:</label>
                <input className={styles.inputInformation} placeholder="Enter code" type="text" id="zipcode"  />
            </div>
            <div className={styles.info}>
                <CgInfo style={{ minWidth: '18px' }}/>  
                <p className={styles.privacyPolicyText}>
                By clicking the button, you confirm that you have read and agree to Ecoenergy
                <a href=""> Terms of Service</a> and <a href="">Privacy Policy.</a>
                </p>
            </div>
            {/* <SignUpButtons nameOfButton={"Add Card"} onClick={Click} iconOfButton={<IoCardOutline size={'24'}/>}/> */}

        </form>
        </>
    );
};
export default BillingInformation;