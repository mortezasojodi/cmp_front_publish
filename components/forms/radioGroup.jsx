import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import styles from './radioGroup.module.css';

const RadioGroupDemo = () => (
  <form className={styles.form}>
    <RadioGroup.Root className={styles.RadioGroupRoot} defaultValue="default" aria-label="View density">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={styles.RadioGroupItem} value="default" id="r1">
          <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={styles.Label} htmlFor="r1">
          Default
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={styles.RadioGroupItem} value="comfortable" id="r2">
          <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={styles.Label} htmlFor="r2">
          Comfortable
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={styles.RadioGroupItem} value="compact" id="r3">
          <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={styles.Label} htmlFor="r3">
          Compact
        </label>
      </div>
    </RadioGroup.Root>
  </form>
);

export default RadioGroupDemo;