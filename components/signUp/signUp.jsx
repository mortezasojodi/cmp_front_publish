'use client';
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import StepIndicator from './stepIndicator';
import RegistationSuccessModal from './registrationSuccessModule';
import { checkRegistrationStatus  } from '@/app/utils/apiService'; 

const SignUpForm = () => {
  const methods = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { push } = useRouter();

  // useEffect(() => {
  //   const verifyRegistrationStatus = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       const statusResult = await checkRegistrationStatus(token);
  //       if (statusResult.success) {
  //         switch (statusResult.status) {
  //           case 'Registered':
  //             push('/dashboard');
  //              // Перенаправление на дашборд, если регистрация завершена
  //             break;
  //           case 'ProfessionalInformation':
  //             setStep(2); // Возобновление регистрации со второго шага
  //             break;
  //           case 'AddressInformation':
  //             setStep(3); // Возобновление регистрации с третьего шага
  //             break;
  //           case 'BillingInformation':
  //             setStep(4); // Возобновление регистрации с четвертого шага
  //             break;
  //           default:
  //             setStep('login'); // Начать с первого шага, если статус не распознан
  //         }
  //       } else {
  //         console.error('Failed to verify registration status:', statusResult.message);
  //       }
  //     }
  //   };
  //   verifyRegistrationStatus();
  // }, [push]);

  const onNextStep = (data) => {
    setFormData(prevFormData => ({ ...prevFormData, [`step${step}`]: data }));
    if (step === 4) {
      handleRegistrationSuccess();
    } else {
      setStep(step + 1);
    }
  };

  const onPrevStep = () => {
    if (step > 2) { // Разрешаем возврат на шаги 2, 3 и 4, но не на шаг 1
      setStep(step - 1);
    }
  };

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
    setTimeout(() => {
      push('/login');
    }, 4000);
  };

  return (
    <>
      <FormProvider {...methods}>
        <StepIndicator step={step} />
        {step === 1 && <Step1 onNext={onNextStep} />}
        {step === 2 && <Step2 onNext={onNextStep} onBack={onPrevStep} />}
        {step === 3 && <Step3 onNext={onNextStep} onBack={onPrevStep} />}
        {step === 4 && <Step4 onBack={onPrevStep} onRegistrationSuccess={handleRegistrationSuccess} />}
      </FormProvider>
      {registrationSuccess && <RegistationSuccessModal />}
    </>
  );
};

export default SignUpForm;
