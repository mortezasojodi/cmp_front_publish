import React from 'react';
import PaymentForm from '../login/paymentForm';
import Title from './title';
// import styles from './Payment.module.css'; 

const Step4 = ({ onBack, onRegistrationSuccess }) => {
  return (
    <>
      <Title title={"Billing Details"} />
      <PaymentForm onBack={onBack} onRegistrationSuccess={onRegistrationSuccess} />
    </>
  );
};

export default Step4;
