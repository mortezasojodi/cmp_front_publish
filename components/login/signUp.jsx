"use client";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { FiFileText } from "react-icons/fi";
import PhoneInput from "react-phone-number-input";
import { SignUpCommand } from "@/domain/command/signUp_command";
import styles from "./signUp.module.css";
import RegistationSuccessModal from "./registrationSuccessModule";
import PaymentForm from "./paymentForm";
import { signUp } from "@/data/api/register/company/signUp";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";


import { BusinessLicense } from "./businessLicense";
import { OperationalAddress } from "./operationalAddress";
import { Payment } from "./payment";
import { useLoading } from "../loading/loading_context";
import { IoLogInOutline } from "react-icons/io5";
import { AppConfig } from "@/shared/app_config";
import { NextButton } from "./NextButton";
import { APP_ROUTES } from "@/shared/route/app_route";
import AppRouter from "next/dist/client/components/app-router";

export const Title = ({ title }) => {
  return <h1>{title}</h1>;
};

const StepIndicator = ({ step }) => {
  const steps = [1, 2, 3, 4];
  return (
    <div className={styles.stepsContainer}>
      {steps.map((s, index) => (
        <React.Fragment key={s}>
          {index > 0 && index < steps.length && (
            <div
              key={`spacer-${index}`}
              className={`${styles.spacer} ${step >= s - 1 && step === s ? styles.spacerActive : ""
                }`}
            />
          )}
          <div
            key={s}
            className={`${styles.stepIndicator} ${step === s ? styles.intermediate : step >= s ? styles.active : ""
              }`}
          >
            {s}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const SwitcherAndCompanyInfo = ({ onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  let iconSize = 24;
  const { setLoading } = useLoading();
  const { push } = useRouter();

  const onSubmit = async (data) => {
    try {
      if (Object.keys(errors).length === 0) {
        if (data.repassword != data.password) {
          toast.error("Please insert equal password!");
          return;
        }

        var command = new SignUpCommand(
          data.companyName,
          data.contactFirstName,
          data.contactLastName,
          data.phoneNumber,
          data.email,
          data.position,
          data.secondContactFirstName,
          data.secondContactLastName,
          data.secondPhoneNumber,
          data.referred,
          data.accountNumber,
          data.password,
          data.repassword,
          data.companyType == "standalone" ? 1 : 2
        );
        setLoading(true);
        var result = await signUp(command);
        result.fold(
          (s) => {
            // console.log("");
          },
          (_) => {
            push(`${APP_ROUTES.Activation}`, undefined);
          }
        );
      } else {
        console.log("Form contains errors");
      }
    } finally {
      setLoading(false);
    }
  };

  const sanitizePhoneNumber = (value) => {
    return value.replace(/\D/g, "");  // Removes all non-digit characters
  };

  return (
    <>
      <Title title={"Basic Information"} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p>Select a type account</p>
        <div className={styles.companyTypeButtons}>
          <label htmlFor="standalone" className={styles.radioButton}>
            <input
              type="radio"
              value="standalone"
              name="companyType"
              id="standalone"
              {...register("companyType")}
              defaultChecked
            />
            <span className={styles.radioButtonText}>Stand-alone business</span>
          </label>
          <label htmlFor="chain" className={styles.radioButton}>
            <input
              type="radio"
              value="chain"
              name="companyType"
              id="chain"
              {...register("companyType")}
            />
            <span className={styles.radioButtonText}>Chain</span>
          </label>
        </div>

        <div className={styles.formSection}>
          <label htmlFor="companyName">Company name: </label>
          <input
            type="text"
            id="companyName"
            className={`${styles.formInput} ${errors.companyName && styles.inputError
              }`}
            placeholder="Company name"
            name="companyName"
            {...register("companyName", { required: true })}
          />
        </div>

        <div className={styles.formSection}>
          <label htmlFor="contactPerson">Primary contact person: </label>
          <div className={styles.personInput}>
            <input
              id="contactPerson"
              className={`${styles.formInput} ${errors.contactFirstName && styles.inputError
                }`}
              type="text"
              placeholder="First Name"
              {...register("contactFirstName", { required: true })}
            />
            <input
              id="contactPerson"
              className={`${styles.formInput} ${errors.contactLastName && styles.inputError
                }`}
              type="text"
              placeholder="Last Name"
              {...register("contactLastName", { required: true })}
            />
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor="phoneNumber">Contact Phone Number: </label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: true, validate: (value) => {

                const sanitizedValue = sanitizePhoneNumber(value);
                return sanitizedValue.length >= 10 || "Phone number must be 10 digits";
              },
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                className={
                  errors.phoneNumber
                    ? styles.numberInputError
                    : styles.numberInput
                }
                defaultCountry="US"
                placeholder="Enter phone number"
                onChange={(value) => field.onChange(value)}
                maxLength={14}
              />
            )}
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="email">Business Email: </label>
          <input
            type="text"
            id="email"
            placeholder="Business Email"
            className={`${styles.formInput} ${errors.email && styles.inputError
              }`}
            name="email"
            autoComplete="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>

        <div className={styles.formSection}>
          <label htmlFor="Password">Password: </label>
          <div
            className={`${styles.inputWithButton} ${errors.password && styles.inputError
              }`}
          >
            <input
              placeholder="Password"
              className={styles.inputPassword}
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, и one number",
                },
              })}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <PiEye size={iconSize} />
              ) : (
                <PiEyeClosed size={iconSize} />
              )}
            </button>
          </div>
        </div>

        <div className={styles.formSection}>
          <label htmlFor="RePassword">Confirm Password: </label>
          <div
            className={`${styles.inputWithButton} ${errors.repassword && styles.inputError
              }`}
          >
            <input
              placeholder="Confirm Password"
              className={styles.inputPassword}
              type={showPassword ? "text" : "password"}
              {...register("repassword", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, и one number",
                },
              })}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <PiEye size={iconSize} />
              ) : (
                <PiEyeClosed size={iconSize} />
              )}
            </button>
          </div>
        </div>

        <div className={styles.formSection}>
          <label htmlFor="position">Position: </label>
          <input
            type="text"
            id="position"
            className={`${styles.formInput} ${errors.position && styles.inputError
              }`}
            placeholder="Position"
            name="position"
            {...register("position", { required: true })}
          />
        </div>

        <div className={styles.formSection}>
          <label htmlFor="secondContactPerson">
            Secondary contact person:{" "}
          </label>
          <div className={styles.personInput}>
            <input
              id="secondContactPerson"
              className={`${styles.formInput} ${errors.secondContactFirstName && styles.inputError
                }`}
              type="text"
              placeholder="First Name"
              {...register("secondContactFirstName", { required: false })}
            />
            <input
              id="secondContactPerson"
              className={`${styles.formInput} ${errors.secondContactLastName && styles.inputError
                }`}
              type="text"
              placeholder="Last Name"
              {...register("secondContactLastName", { required: false })}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <label htmlFor="secondPhoneNumber">Secondary phone number: </label>
          <Controller
            name="secondPhoneNumber"
            control={control}
            rules={{
              required: false,
              validate: (value) => {
                if (!value || value.length == 0) {
                  return null;
                }
                const sanitizedValue = sanitizePhoneNumber(value);
                return sanitizedValue.length >= 10 || "Phone number must be 10 digits";
              },
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                className={
                  errors.secondPhoneNumber
                    ? styles.numberInputError
                    : styles.numberInput
                }
                defaultCountry="US"
                placeholder="Enter secondary phone number"
                onChange={(value) => {
                  field.onChange(value)
                }}
                maxLength={14}
              />
            )}
          />
        </div>

        <div className={styles.formSection}>
          <label htmlFor="referred">Referred by: </label>
          <input
            type="text"
            id="referred"
            className={`${styles.formInput} ${errors.referred && styles.inputError
              }`}
            placeholder="Referred by"
            name="referred"
            {...register("referred")}
          />
        </div>

        <div className={styles.formSection}>
          <label htmlFor="accountNumber">Account number: </label>
          <input
            type="text"
            id="referred"
            className={`${styles.formInput} ${errors.accountNumber && styles.inputError
              }`}
            placeholder="Enter account number (if you have one)"
            name="accountNumber"
            {...register("accountNumber")}
          />
        </div>

        <div className={styles.buttonLine}>
          <button onClick={onBack} type="submit">
            Exit
          </button>
          <NextButton type="submit" />
        </div>

        {onBack && (
          <button type="button" onClick={onBack}>
            Back
          </button>
        )}
      </form>
      {/* <Toaster /> */}
    </>
  );
};

const SignUpForm = ({ currentstep }) => {
  const methods = useForm();
  const [step, setStep] = useState(currentstep);
  const [formData, setFormData] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { push, replace } = useRouter();

  const onNextStep = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, [`step${step}`]: data }));
    console.log("FormData", formData);
    setStep(step + 1);
  };

  useEffect(() => { }, [formData]);

  const onPrevStep = () => {
    setStep(step - 1);
  };

  const onSubmitForm = () => {
    console.log("Form data submitted:", formData);
  };

  const handleRegistrationSuccess = () => {
    replace(APP_ROUTES.Splash);
    // setRegistrationSuccess(true);
    // setTimeout(() => {

    //   push("/dashboard", undefined, { shallow: true });
    // }, 4000);
  };

  return (
    <>
      <FormProvider {...methods}>
        <IoLogInOutline size={'30px'} onClick={() => AppConfig.logOut(replace)} />
        <StepIndicator step={step} />
        {step === 1 && <SwitcherAndCompanyInfo onNext={onNextStep} />}
        {step === 2 && (
          <OperationalAddress onNext={onNextStep} onBack={onPrevStep} />
        )}
        {step === 3 && (
          <BusinessLicense onNext={onNextStep} onBack={onPrevStep} />
        )}
        {/* {step === 4 && <Payment onBack={onPrevStep} />} */}
        {step === 4 && (
          <Payment
            onBack={onPrevStep}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        )}
      </FormProvider >
      {registrationSuccess && <RegistationSuccessModal />
      }
    </>
  );
};

export default SignUpForm;
