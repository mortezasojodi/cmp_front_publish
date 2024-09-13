'use client'
import styles from './forgotPasswordForm.module.css'
import React from 'react';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";



import { PiEye, PiEyeClosed, PiWarningCircle } from "react-icons/pi";
import { MdDone } from "react-icons/md";

const ForgotPasswordForm = () => {

    const { register, handleSubmit,  watch, formState: { errors } } = useForm()

    const [showConfirm, setShowConfirm] = useState(false);

    const onConfirm = () => setShowConfirm(!showConfirm);

    const [showPasswordBlock, setShowPasswordBlock] = useState(false);


    // const router = useRouter();
    const showBlock = () => {
        setShowPasswordBlock(!showPasswordBlock);
        
    };

    const onSubmit = (data) => {
       console.log(data);
       data = [];
       showBlock();
   }

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    let iconSize = 24;


    return(
        <>
        {showConfirm  ?(
            <div className={styles.container}>
                <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="56" cy="56" r="56" fill="#4C8E3B" fill-opacity="0.1"/>
                <circle cx="56" cy="56" r="36" fill="#4C8E3B"/>
                <path d="M41 56L51 66L71 46" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <h1>Password Updated</h1>
                <p>Sweet! Your new password has now been set and you are logged in.</p>
            </div>
        ):(
            <div className={styles.container}>
                
            <div className={styles.welcomeText}>
                <h1>Forgot Password?</h1>
                <p>Don’t worry! Fill in your email and we’ll send you a link to reset your password. </p>
            </div>

            {!showPasswordBlock ?(
            <form onSubmit={handleSubmit(onSubmit)} className={styles.forgotPasswordForm} autoComplete='email'>
                    <input id='email' className={`${styles.inputWithButton} ${styles.inputPassword}`} 
                    placeholder='Email'
                    type="email"
                    autoComplete='email'
                    {...register("email", { 
                        required: "Email is required", 
                        pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Invalid email address"
                        }
                    })}/>
                    {errors.email && <p>{errors.email.message}</p>}
                    
                <button type="submit" className={styles.confirmButton}>send <IoIosArrowRoundForward size={"24"} style={{ color: "white", minWidth: '24px'}}/></button>
            </form>
            )
            :(
            <form onSubmit={handleSubmit(onSubmit)} className={styles.forgotPasswordForm} autoComplete="off">    
                <div className={`${styles.inputWithButton} ${errors.newPassword && styles.inputWithButtonError}`}>
                        <input id='password' className={styles.inputEmail} 
                        placeholder='New password' 
                        autoComplete='off'
                        type={showPassword ? "text" : "password"}
                        {...register("newPassword", { 
                            minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long"
                            },
                            maxLength: {
                            value: 20,
                            message: "Password must not exceed 20 characters"
                            }
                        })} 
                        />
                        <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <PiEye size={iconSize}/> : <PiEyeClosed size={iconSize} />}
                        </button>
                    </div>

                    {errors.newPassword && <p className={styles.errorText}>{errors.newPassword.message}</p>}

                    <div className={`${styles.inputWithButton} ${errors.confirmNewPassword && styles.inputWithButtonError}`}>
                        <input id='resetPassword' className={styles.inputPassword} placeholder='Reset new password'
                        type={showPassword ? "text" : "password"}
                        {...register("confirmNewPassword", { 
                            required: "Confirm New Password is required", 
                            validate: value =>
                            value === watch("newPassword") || "Password is incorrect"
                        })} 
                        />
                        <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <PiEye size={iconSize} />: <PiEyeClosed size={iconSize}/>}
                        </button>
                    </div>
                    {errors.confirmNewPassword && <div className={styles.errorText}><PiWarningCircle size={iconSize} color='red'/><p>{errors.confirmNewPassword.message}</p></div>}
            
                <button type="submit" onClick={onConfirm} className={styles.confirmButton}>confirm <MdDone size={iconSize} /></button>
            </form>)}
            </div>
        )}
        </>
    )
};

export default ForgotPasswordForm;