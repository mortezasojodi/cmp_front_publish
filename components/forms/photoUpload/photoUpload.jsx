"use client";
import { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiTrash } from "react-icons/fi";
import styles from '../photoUpload/photoUpload.module.css';
import Image from 'next/image';

const PhotoUpload = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className={styles.photoUploadContainer}>
      <div className={styles.previewContainer}>
        {selectedPhoto ? (
          <img src={selectedPhoto} alt="Selected Photo" className={styles.previewImage} />
        ) : (
          <BsPerson size={40} style={{ fill: 'rgba(76, 142, 59)' }} />
        )}
      </div>
      <div className={styles.buttonContainer}>
         {selectedPhoto ? (
            <button className={styles.isade} onClick={handleRemovePhoto}>
               <FiTrash size={24} />
               <span>Remove</span>
            </button>
            ) : (
            <div className={styles.uploadButton}> 
               <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={styles.hiddenInput}
               />
               <div className={styles.isade}>
                  <Image width={24} height={24} src="/export_icon_dark.svg" alt="Upload Icon" />
                  <span>Upload Photo</span>
               </div>
            </div>
            )}
         <p>JPG or PNG file. Maximum file size of 5Mb </p>
      </div>
      
    </div>
  );
};

export default PhotoUpload;
