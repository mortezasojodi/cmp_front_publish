import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import styles from './signUp.module.css';

const NextButton = ({ onClick }) => {
  return (
    <button className={styles.nextButton} type='submit' onClick={onClick}>
      next step <IoIosArrowRoundForward size={"24"} style={{ color: "white", minWidth: '24px' }} />
    </button>
  );
};

export default NextButton;
