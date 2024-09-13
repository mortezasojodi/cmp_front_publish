import React, { useState, useEffect, useRef } from 'react';
import Title from './title';
import NextButton from './nextButton';
import { useFormContext } from 'react-hook-form';
import { FiFileText } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { uploadDocuments, fetchDocuments, deleteDocument } from "@/app/utils/apiService";
import styles from './signUp.module.css';

const Step3 = ({ onNext, onBack }) => {
  const [files, setFiles] = useState({ businessLicense: null, healthCertificate: null });
  const [documentId, setDocumentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [existingFiles, setExistingFiles] = useState({ businessLicense: false, healthCertificate: false });

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      const response = await fetchDocuments();
      if (response.Success && response.Data !== null) {
        setFiles({
          businessLicense: response.Data.BusinessLicense,
          healthCertificate: response.Data.HealthDepartmentCertificate
        });
        setDocumentId(response.Data.Id);
        setExistingFiles({
          businessLicense: Boolean(response.Data.BusinessLicense),
          healthCertificate: Boolean(response.Data.HealthDepartmentCertificate)
        });
      } else {
        console.error('Failed to load documents:', response.Message);
      }
      setLoading(false);
    };

    loadDocuments();
  }, []);

  const handleRemoveDocument = async (type) => {
    if (documentId === null) {
      console.error('Document ID is not available');
      return;
    }

    const result = await deleteDocument(documentId);
    if (result.success) {
      setFiles(prev => ({
        ...prev,
        [type]: null
      }));
      setExistingFiles(prev => ({
        ...prev,
        [type]: false
      }));
      console.log('Document removed from server');
    } else {
      console.error('Failed to delete document from server:', result.message);
    }
  };

  const { handleSubmit, formState: { errors } } = useFormContext();

  const onSubmit = async () => {
    if (files.businessLicense && files.healthCertificate) {
      // Проверяем, если файлы уже существуют на сервере
      if (existingFiles.businessLicense && existingFiles.healthCertificate) {
        console.log('Files already exist on server. Skipping upload.');
        onNext();
        return;
      }

      const response = await uploadDocuments(files.businessLicense, files.healthCertificate);
      if (response.Success) {
        console.log('Files uploaded successfully:', response.Data);
        onNext();
      } else {
        console.error('Failed to upload files:', response.Message);
      }
    } else {
      console.error('Both files must be selected');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title title={"Document Submission"}/>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formSection}>
          <label htmlFor='businessLicense1' className={styles.uploadLabel}>Business License:</label>
          <div className={styles.uploadButton}>
            {files.businessLicense ? (
              <div className={styles.fileContainer}>
                <FiFileText size={20} style={{ color: "rgba(76, 142, 59, 1)" }} />
                <span>{files.businessLicense.name}</span> {/* Обновлено здесь */}
                <button type="button" className={styles.removeButton} onClick={() => handleRemoveDocument('businessLicense')}>
                  <RxCross2 size={24} />
                </button>
              </div>
            ) : (
              <div className={styles.isade}>
                <input id='businessLicense1' type="file" onChange={(e) => setFiles(prev => ({ ...prev, businessLicense: e.target.files[0] }))} className={styles.hiddenInput} />
                <img width={24} height={24} src="/download_icon_dark.svg" alt="Upload Icon" />
                <span>Drag your file or <a href="#">click to upload</a></span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor='businessLicense2' className={styles.uploadLabel}>Health Department Certificate:</label>
          <div className={styles.uploadButton}>
            {files.healthCertificate ? (
              <div className={styles.fileContainer}>
                <FiFileText size={20} style={{ color: "rgba(76, 142, 59, 1)" }} />
                <span>{files.healthCertificate.name}</span>
                <button type="button" className={styles.removeButton} onClick={() => handleRemoveDocument('healthCertificate')}>
                  <RxCross2 size={24} />
                </button>
              </div>
            ) : (
              <div className={styles.isade}>
                <input id='businessLicense2' type="file" onChange={(e) => setFiles(prev => ({ ...prev, healthCertificate: e.target.files[0] }))} className={styles.hiddenInput} />
                <img width={24} height={24} src="/download_icon_dark.svg" alt="Upload Icon" />
                <span>Drag your file or <a href="#">click to upload</a></span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttonLine}>
          <button type="button" onClick={onBack}>Back</button>
          <button type="button" onClick={onNext}>Skip</button>
          <NextButton />
        </div>
      </form>
    </>
  );
};

export default Step3;
