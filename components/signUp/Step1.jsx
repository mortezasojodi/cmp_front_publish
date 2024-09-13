'use client';
import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import styles from './signUp.module.css';
import Title from './title';
import NextButton from './nextButton';
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { PiWarningCircle } from "react-icons/pi";
import { registerCompany } from '@/app/utils/apiService';

const Step1 = ({ onNext }) => {
  const { register, handleSubmit, control, watch, formState: { errors }} = useFormContext();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // Check if the password fields are valid
  const isPasswordValid = password && !errors.password;
  const isConfirmPasswordValid = confirmPassword && password === confirmPassword;

  const onSubmit = async (data) => {
    if (password && !showConfirmPassword) {
      setShowConfirmPassword(true);
      return;
    }
  
    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
    
    if (Object.keys(errors).length === 0) {
      const registerData = {
        companyName: data.companyName,
        primaryFirstName: data.contactFirstName,
        primaryLastName: data.contactLastName,
        primaryPhonNumber: data.phoneNumber,
        businessEmail: data.email,
        position: data.position,
        secondaryFirstName: data.secondContactFirstName,
        secondaryLastName: data.secondContactLastName,
        secondaryPhoneNumber: data.secondPhoneNumber,
        referredBy: data.referred,
        accountNumber: data.accountNumber,
        password: data.password,
        rePassword: data.confirmPassword,
        type: data.companyType === 'standalone' ? 'StandAloneBusiness' : 'Chain',
      };
  
      const result = await registerCompany(registerData);
  
      if (result.success) {
        localStorage.setItem('token', result.token);
        console.log('Token:', result.token);
        onNext(data); // Переход к следующему шагу только если регистрация успешна
      } else {
        const errorMessage = result.message || 'Registration failed';
        setErrorMessage(errorMessage);
        console.error('Registration Failed:', errorMessage);
      }
    }
  };
  
  
  return (
    <>
      <Title title={"Basic Information"} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p>Select a type account</p>
        <div className={styles.companyTypeButtons}>
          <label htmlFor="standalone" className={styles.radioButton}>
            <input type="radio" value="standalone" name="companyType" id="standalone" {...register("companyType")} defaultChecked />
            <span className={styles.radioButtonText}>Stand-alone business</span>
          </label>
          <label htmlFor="chain" className={styles.radioButton}>
            <input type="radio" value="chain" name="companyType" id="chain" {...register("companyType")} />
            <span className={styles.radioButtonText}>Chain</span>
          </label>
        </div>
        <div className={styles.formSection}>
          <label htmlFor="companyName">Company name: </label>
          <input type="text" id="companyName" className={`${styles.formInput} ${errors.companyName && styles.inputError}`} placeholder="Company name" name="companyName" {...register('companyName', { required: true })} />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='contactPerson'>Primary contact person: </label>
          <div className={styles.personInput}>
            <input id='contactPerson' className={`${styles.formInput} ${errors.contactFirstName && styles.inputError}`} type="text" placeholder="First Name" {...register("contactFirstName", { required: true })} />
            <input id='contactPerson' className={`${styles.formInput} ${errors.contactLastName && styles.inputError}`} type="text" placeholder="Last Name" {...register("contactLastName", { required: true })} />
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor='phoneNumber'>Contact Phone Number: </label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                className={errors.phoneNumber ? styles.numberInputError : styles.numberInput}
                defaultCountry="US"
                placeholder="Enter phone number"
                onChange={(value) => field.onChange(value)}
                limitMaxLength={10}
              />
            )}
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='email'>Business Email: </label>
          <input type="text" id='email' placeholder="Business Email" className={`${styles.formInput} ${errors.email && styles.inputError}`} name="email" autoComplete='email' {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='password'>Password: </label>
            <div className={styles.passwordInput}>
              <div className={styles.passwordSection}>
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={styles.toggleButton}>
                  {!showConfirmPassword ? (<HiOutlineChevronRight size={24} />) :<HiOutlineChevronDown size={24} />}
                </button>
                <input id='password' type="text" placeholder="Create your password" {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                  }
                })} className={`${styles.formInput} ${errors.password && styles.inputError}`} />
                
              </div>
              {showConfirmPassword && (
                <input id='confirmPassword' type="text" placeholder="Repeat password" {...register("confirmPassword", { required: "Please repeat your password" })} className={`${styles.formInput} ${errors.confirmPassword && styles.inputError}`} />
              )}
              {errors.password && <div className={styles.errorText}><PiWarningCircle size={24} color='red'/><p>{errors.password.message}</p></div>}
              {!isConfirmPasswordValid && confirmPassword && <div className={styles.errorText}><PiWarningCircle size={24} color='red'/><p>Passwords must match</p></div>}
            </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor="position">Position: </label>
          <input type="text" id="position" className={`${styles.formInput} ${errors.position && styles.inputError}`} placeholder="Position" name="position" {...register('position', { required: true })} />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='secondContactPerson'>Secondary contact person: </label>
          <div className={styles.personInput}>
            <input id='secondContactPerson' className={`${styles.formInput} ${errors.secondContactFirstName && styles.inputError}`} type="text" placeholder="First Name" {...register("secondContactFirstName", { required: true })} />
            <input id='secondContactPerson' className={`${styles.formInput} ${errors.secondContactLastName && styles.inputError}`} type="text" placeholder="Last Name" {...register("secondContactLastName", { required: true })} />
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor='secondPhoneNumber'>Secondary phone number: </label>
          <Controller
            name="secondPhoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                className={errors.secondPhoneNumber ? styles.numberInputError : styles.numberInput}
                defaultCountry="US"
                placeholder="Enter secondary phone number"
                onChange={(value) => field.onChange(value)}
                limitMaxLength={10}
              />
            )}
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="referred">Referred by: </label>
          <input type="text" id="referred" className={`${styles.formInput} ${errors.referred && styles.inputError}`} placeholder="Referred by" name="referred" {...register('referred')} />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="accountNumber">Account number: </label>
          <input type="text" id="accountNumber" className={`${styles.formInput} ${errors.accountNumber && styles.inputError}`} placeholder="Enter account number" name="accountNumber" {...register('accountNumber')} />
        </div>
        {errorMessage && <div className={styles.errorText}><PiWarningCircle size={24} color='red'/><p>{errorMessage}</p></div>}
        <div className={styles.buttonLine}>
          {/* <button onClick={onBack} type="submit">Exit</button> */}
          <NextButton type="submit" />
        </div>
        {/* {onBack && <button type="button" onClick={onBack}>Back</button>} */}
      </form>
    </>
  );
};

export default Step1;
