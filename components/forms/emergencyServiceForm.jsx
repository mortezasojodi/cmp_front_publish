"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import styles from "@/components/forms/emergencyServiceForm.module.css"
import { GoPlusCircle } from "react-icons/go";
import { useForm, Controller, set } from "react-hook-form"
import { FaRegFileAlt } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { FiTrash } from "react-icons/fi";
import EmergenAdressMap from '../mapsForm/emergenAdressMap';
import Link from 'next/link';


import Switch from './switch/switch';
import SignUpButtons from './signUpButtons/signUpButtons';
// import MapScreen from './mapScreen/mapScreen';
// import Dialog from './dialog/dialog';
import CustomSelector from './customSelect/customSelect';


export default function EmergencyServiceForm(){
  
  const center = {
    lat:  32.733131,
    lng: -117.189472
};
const { register, handleSubmit, setValue, control, formState: { errors }, trigger } = useForm();
const [modalIsOpen, setModalIsOpen] = useState(false);
const [locations, setLocations] = useState([]);
const [selectedValue, setSelectedValue] = useState(null);

const addLocation = (type, data) => {
  const newLocations = [...locations, { type, data }];
  setValue('locationCount', newLocations.length);
  setLocations(newLocations);
  trigger('locationCount');
};

const removeLocation = (index) => {
  const newLocations = locations.filter((_, i) => i !== index);
  setValue('locationCount', newLocations.length);
  setLocations(newLocations);
  trigger('locationCount');
};

useEffect(() => {
  setValue('locationCount', locations.length); 
  setValue("location", locations);
}, [locations, setValue]);


const openModal = () => {
    setModalIsOpen(true);
};

const closeModal = () => {
    setModalIsOpen(false);
};

const {push} = useRouter();
const onSubmit = (data) => {
  setValue("frequency", selectedValue);
  setValue("location", locations);
  console.log(data);
  setTimeout(() => {
    push('/dashboard/services'); 
  }, 3000); 
};


  const [isEnrolled, setIsEnrolled] = useState(false); 

  const handleToggleEnrollment = () => {
    setIsEnrolled(!isEnrolled)
  }

  const options = [
    "Cooking Oil Collection",
    "Grease Trap Management",
    "Hydro Line Jetting",
  ];

  const optionFrequency = [
    "1xyr",
    "2x yr.",
    "3x yr.",
    "4x yr.",
    "6x yr.",
    "8x yr.",
    "12x yr.",
    "24x yr.",
    "26x yr.",
  ];

    return(
        <>
        <form className={styles.form}  onSubmit={handleSubmit(onSubmit)} > 
            <div className={styles.formSection}>
                <label  htmlFor="service" >Service:</label>
                <div className={`${styles.selector} ${errors.selectService  && styles.inputError}`}>
              <Controller
                    name="selectService"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomSelector
                        options={options}
                        select={ 'service' }
                        selectValue={(value) => {
                          setSelectedValue(value);
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                  </div>            
            </div>
            <div className={`${styles.formSection} ${styles.labelTwoButtom}`}>
                  <label htmlFor='pickupLocation' >Location:</label>
                  <div className={styles.column}>      
                    {locations.map((item, index) => (
                      <div key={index} className={styles.fakeInput}>
                        <p>{item.data.address}</p>
                        <div className={styles.inputIconButton}>
                          <button type="button"><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                          <button type="button" onClick={() => removeLocation(index)}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                        </div>
                      </div>
                    ))}
                    <div className={`${styles.dialogContainer} ${errors.locationCount && styles.inputError}`}>
                      <button type="button" className={styles.addPointButton} onClick={openModal}> <GoPlusCircle size={"24"} /> ADD LOCATION</button>
                    </div>
                  </div>
                  {/* {errors.locationCount && <span className={styles.errorMessage}>At least one pickup point is required</span>} */}
                  <input type="hidden" {...register("locationCount", { validate: value => value > 0 })} />
            <EmergenAdressMap
              onSubmitAddress={(data) => addLocation('Location', data)}
              isOpen={modalIsOpen}
              onClose={closeModal}
              center={center}
            />
          </div>
            <div className={styles.agreementText}>
            <div className={styles.question}>
                <Switch active={true}/> <span>I agree with Terms and Conditions for this service</span>
            </div>
            <div className={styles.question}>
                <Switch active={false} onChange={handleToggleEnrollment} />
                <span>Enroll Me to Repeating Services</span>
            </div>

                
            </div>
            {isEnrolled && ( 
                  <div className={styles.formSection}>
                    <label htmlFor="frequency">Frequency:</label>
                    <div className={`${styles.selector} ${errors.frequency  && styles.inputError}`}>
                    <Controller
                      name="frequency"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                      <CustomSelector
                        options={optionFrequency}
                        select={ 'service' }
                        selectValue={(value) => {
                          setSelectedValue(value);
                          field.onChange(value);
                          }}
                        />
                      )}
                    />
                    </div>   
                   </div>
                )}

            <div className={styles.submitButtons}>
                <Link className={styles.cancel}  href="/dashboard/services" >Cansel</Link>
                <button type="submit" >Place Order <FaRegFileAlt size={24} /></button>
            </div>
        {/* <SignUpButtons nameOfButton={"Place Order"} iconOfButton={<FaRegFileAlt size={24} />}></SignUpButtons> */}
                
        </form> 
        
        </>
    )
}