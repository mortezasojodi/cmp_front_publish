import React from 'react';
import styles from './signUp.module.css';

const StepIndicator = ({ step }) => {
  const steps = [1, 2, 3, 4];
  return (
    <div className={styles.stepsContainer}>
      {steps.map(s => (
        <React.Fragment key={s}>
          {s > 1 && <div className={`${styles.spacer} ${step >= s - 1 && step === s ? styles.spacerActive : ''}`}/>}
          <div className={`${styles.stepIndicator} ${step === s ? styles.intermediate : step >= s ? styles.active : ''}`}>
            {s}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
