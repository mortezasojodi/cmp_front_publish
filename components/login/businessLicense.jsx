"use client"
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import { RxCross2 } from "react-icons/rx";
import { FiFileText } from "react-icons/fi";
import PhoneInput from 'react-phone-number-input';
import { SignUpCommand } from '@/domain/command/signUp_command';
import styles from "./signUp.module.css"
import RegistationSuccessModal from './registrationSuccessModule'
import PaymentForm from './paymentForm';
import { PiEye, PiEyeClosed } from 'react-icons/pi';
import toast, { Toaster } from 'react-hot-toast';
import { NextButton } from './nextButton';

import { addDcoument } from '@/data/api/register/document/add';
import { DocumentCommand } from '@/domain/command/document_command';
import { useLoading } from '../loading/loading_context';
import { Title } from './signUp';


export const BusinessLicense = ({ onNext, onBack }) => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const { setLoading } = useLoading();

    const handleFileChange1 = (event) => {
        const selectedFile = event.target.files[0];
        setFile1(selectedFile);
    };

    const handleFileChange2 = (event) => {
        const selectedFile = event.target.files[0];
        setFile2(selectedFile);
    };

    const handleRemoveFile1 = () => {
        setFile1(null);
        document.getElementById('businessLicense1').value = '';
    };

    const handleRemoveFile2 = () => {
        setFile2(null);
        document.getElementById('businessLicense2').value = '';
    };

    const { handleSubmit, formState: { errors } } = useFormContext();

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            var result = await addDcoument(new DocumentCommand(file1, file2))

            result.fold((error) => {
                toast.error(error.message);
            }, (_) => {
                onNext();
            })

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Title title={"Document Submission"} />
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formSection}>
                    <label htmlFor='businessLicense1' className={styles.uploadLabel}>Business License:</label>
                    <div className={styles.uploadButton}>
                        <input id='businessLicense1' type="file" onChange={handleFileChange1} className={styles.hiddenInput} />
                        {file1 ? (
                            <div className={styles.fileContainer}>
                                <FiFileText size={20} style={{ color: "rgba(76, 142, 59, 1)" }} />
                                <span>{file1.name}</span>
                                <button className={styles.removeButton} onClick={handleRemoveFile1}><RxCross2 size={24} /></button>
                            </div>
                        ) : (
                            <div className={styles.isade}>
                                <Image width={24} height={24} src="/download_icon_dark.svg" alt="Upload Icon" />
                                <span>Drag your file or <a href="#">click to upload</a></span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.formSection}>
                    <label htmlFor='businessLicense2' className={styles.uploadLabel}>Health Department Certificate:</label>
                    <div className={styles.uploadButton}>
                        <input id='businessLicense2' type="file" onChange={handleFileChange2} className={styles.hiddenInput} />
                        {file2 ? (
                            <div className={styles.fileContainer}>
                                <FiFileText size={20} style={{ color: "rgba(76, 142, 59, 1)" }} />
                                <span>{file2.name}</span>
                                <button className={styles.removeButton} onClick={handleRemoveFile2}><RxCross2 size={24} /></button>
                            </div>
                        ) : (
                            <div className={styles.isade}>
                                <Image width={24} height={24} src="/download_icon_dark.svg" alt="Upload Icon" />
                                <span>Drag your file or <a href="#">click to upload</a></span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.buttonLine}>
                    {/* <button onClick={onBack}>Back</button> */}
                    <button onClick={onNext}>Skip</button>
                    <NextButton type="submit" />
                </div>
            </form>
        </>
    );
};
