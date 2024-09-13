'use client'

import styles from "../login/loginForm.module.css"
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiEye, PiEyeClosed, PiWarningCircle } from "react-icons/pi";
import { useRouter } from "next/navigation";

import { useForm } from 'react-hook-form';
import { useState } from 'react';
// import { loginUser } from '@/app/utils/auth'; 
import Link from 'next/link'
import { loginApi } from '@/data/api/login_api';
import { APP_ROUTES } from "@/shared/route/app_route";
import { LoginCommand } from "@/domain/command/login_command";
import { useLoading } from "../loading/loading_context";
import toast from "react-hot-toast";
import { CusomerError } from "@/shared/core/either";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { replace } = useRouter();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { setLoading } = useLoading();

  const onSubmit = async (data) => {
    try {
      setLoginError(null);
      const { businessEmail, password } = data;
      var command = new LoginCommand(
        businessEmail,
        password
      );
      setLoading(true);
      const result = await loginApi(command)

      result.fold((error) => {
        if (error instanceof CusomerError) {
          toast.error(error.message);
        }
      }, (registered) => {
        if (registered) {
          replace(APP_ROUTES.Splash)
        } else {
          replace(APP_ROUTES.Activation)
        }
      })
    } finally {
      setLoading(false);
    }
  };

  let iconSize = 24;

  return (
    <div className={styles.container}>
      <div className={styles.welcomeText}>
        <h1>Welcome to CMP Natural!</h1>
        <p>Already have an account? <Link href="/login/signUp">Sign up now</Link></p>
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
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.businessEmail && <div className={styles.errorText}><PiWarningCircle size={iconSize} color='red' /><p>{errors.businessEmail.message}</p></div>}

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
              {showPassword ? <PiEye size={iconSize} /> : <PiEyeClosed size={iconSize} />}
            </button>
          </div>
          {errors.password && <div className={styles.errorText}><PiWarningCircle size={iconSize} color='red' /><p>{errors.password.message}</p></div>}

          {loginError && <div className={styles.errorText}><PiWarningCircle size={iconSize} color='red' /><p>{loginError}</p></div>}

          <div className={styles.asckText}>
            <label className={styles.remember}>
              <input type="checkbox" />
              <p>Remember me</p>
            </label>
            <a href="/login/forgotPassword">
              Forgot password?
            </a>
          </div>

          <div className={styles.spacerStaff}>
            <button className={styles.continue} type="submit">continue <IoIosArrowRoundForward size={"24"} style={{ color: "white", minWidth: '24px' }} /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
