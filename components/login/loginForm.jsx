'use client'

import styles from "../login/loginForm.module.css"
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiEye, PiEyeClosed, PiWarningCircle } from "react-icons/pi";
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { loginUser, checkRegistrationStatus  } from '@/app/utils/apiService'; 

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { push } = useRouter();
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoginError(null); 
    const { businessEmail, password } = data;
    console.log('Submitted data:', data); // Добавляем лог
  
    const result = await loginUser(businessEmail, password);
  
    if (result.success) {
      console.log('Login successful:', result.data);
      localStorage.setItem('token', result.token);
      const statusResult = await checkRegistrationStatus( result.token);
      if (statusResult.success) {
        switch (statusResult.status) {
          case 'Registered':
            push('/dashboard');
            localStorage.removeItem('token');
 // Перенаправление на дашборд, если регистрация завершена
            break;
          case 'ProfessionalInformation':
            console.log('второй єтап ');
          default:
            setStep('login'); // Начать с первого шага, если статус не распознан
        }
      } else {
        console.error('Failed to verify registration status:', statusResult.message);
      }
    
  };
}
  
  let iconSize = 24;

  return (
    <div className={styles.container}>
      <div className={styles.welcomeText}>
        <h1>Welcome to CMP Natural!</h1>
        <p>Already have an account? <a href="/login/signUp">Sign up now</a></p>
      </div>
      <div className={styles.bottomBlock}>
        <button><FcGoogle size={'24'} />sign up with google</button>
        <button><FaApple size={'24'} /> sign up with apple</button>

        <div className={styles.spacerStaff}>
          <div className={styles.spacer}></div>
          <p>Or sign up with</p>
          <div className={styles.spacer}></div>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <input id='email' className={`${styles.inputWithButton} ${styles.inputPassword} ${errors.businessEmail && styles.inputWithButtonError}`}
            placeholder='Email'
            type="email" 
            autoComplete='email'
            {...register("businessEmail", {
              required: "Email is required",
              pattern: {
                value: true,
                // value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.businessEmail && <div className={styles.errorText}><PiWarningCircle size={iconSize} color='red'/><p>{errors.businessEmail.message}</p></div>}

          <div className={`${styles.inputWithButton} ${errors.password && styles.inputWithButtonError}`}>
            <input placeholder="Password" className={styles.inputPassword}
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, и one number"
                }
              })}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <PiEye size={iconSize} /> : <PiEyeClosed size={iconSize}/>}
            </button>
          </div>
          {errors.password && <div className={styles.errorText}><PiWarningCircle size={iconSize} color='red'/><p>{errors.password.message}</p></div>}

          {loginError && <div className={styles.errorText}><PiWarningCircle size={iconSize} color='red'/><p>{loginError}</p></div>}

          <div className={styles.asckText}>
            <label className={styles.remember}>
              <input type="checkbox"/>
              <p>Remember me</p>
            </label>
            <a href="/login/forgotPassword">
              Forgot password?
            </a>
          </div>

          <div className={styles.spacerStaff}>
            <button className={styles.continue} type="submit">continue <IoIosArrowRoundForward size={"24"} style={{ color: "white", minWidth: '24px'}}/></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
