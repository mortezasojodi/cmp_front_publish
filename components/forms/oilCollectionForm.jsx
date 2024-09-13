"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "@/components/forms/oilCollectionForm.module.css";
import Switch from './switch/switch';
import { LiaEdit } from "react-icons/lia";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import SignUpButtons from './signUpButtons/signUpButtons';
import { LuCalendar } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import CustomSelector from './customSelect/customSelect';
import AddPointMap from '../mapsForm/addPointMap';
import CanselServiceForm from './canselService/canselService';


export default function OilCollectionForm() {
    const options = [
        "1x yr", "2x yr", "3x yr", "4x yr", "6x yr", "8x yr", "12x yr", "24x yr", "26x yr", "52x yr"
    ];
    const center = {
        lat:  32.733131,
        lng: -117.189472
    };

    const { register, handleSubmit, setValue, control, formState: { errors }, trigger } = useForm();
    const [startDate, setStartDate] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [locations, setLocations] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const ifCansel = true;
    const [openIsTermination, setIsTermination] = useState(false);
    

    const preloadedData = {
        frequency: "2x yr",
        startDate: new Date(),
        locations: [
            { locationName: "point 1", lat: 37.7749, lng: -122.4194 },
            { locationName: "point 2", lat: 34.0522, lng: -118.2437 }
        ]
    };

    //in the future, when data is connected, the value will be transmitted globally via props
    useEffect(() => {
        if (ifCansel) {
            setValue('select', preloadedData.frequency);
            setSelectedValue(preloadedData.frequency);
            setValue('startDate', preloadedData.startDate);
            setStartDate(preloadedData.startDate);
            setLocations(preloadedData.locations.map((loc, index) => ({ type: 'Location', data: loc })));
            setValue('locationCount', preloadedData.locations.length);
            setValue('location', preloadedData.locations);
        }
    }, [ifCansel, setValue]);

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

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleDateChange = date => {
        setStartDate(date);
    };

    const { push } = useRouter();
    
    const onSubmit = (data) => {
        setValue("data", startDate);
        setValue("frequency", selectedValue);
        setValue("location", locations);
        console.log(data);
        setTimeout(() => {
            push('/dashboard/services');
        }, 3000);
    };

    const openMessege = () => {
      setIsTermination(true);
    };
  
    const closeMessege = () => {
      setIsTermination(false);
    };

    const onCansel = () => {
      openMessege();
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onCansel)}>
                <div className={styles.formSection}>
                    <label htmlFor="frequency">Frequency:</label>
                    <div className={`${styles.selector} ${errors.select && styles.inputError}`}>
                        <Controller
                            name="select"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomSelector
                                    options={options}
                                    select='frequency'
                                    selectValue={(value) => {
                                        setSelectedValue(value);
                                        field.onChange(value);
                                    }}
                                    initialValue={preloadedData.frequency}
                                    id='frequency'
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={`${styles.formSection} ${styles.labelTwoButtom}`}>
                    <label htmlFor='pickupLocation'>Pickup point:</label>
                    <div className={styles.twoInputs}>
                        {locations.map((item, index) => (
                            <div key={index} className={styles.fakeInput}>
                                <p>{item.data.locationName}, {item.data.lat}, {item.data.lng}</p>
                                <div className={styles.inputIconButton}>
                                    <button type="button"><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                                    <button type="button" onClick={() => removeLocation(index)}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                                </div>
                            </div>
                        ))}
                        <div className={`${styles.dialogContainer} ${errors.locationCount && styles.inputError}`}>
                            <button type="button" className={styles.addPointButton} onClick={openModal}> <GoPlusCircle size={"24"} /> ADD PICKUP POINT</button>
                        </div>
                    </div>
                    <input id='pickupLocation' type="hidden" {...register("locationCount", { validate: value => value > 0 })} />
                    <AddPointMap
                        type={"Oil"}
                        typeOfButton={'POINT'}
                        onSubmitAddress={(data) => addLocation('Location', data)}
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                        center={center}
                    />
                </div>
                <div className={styles.formSection}>
                    <label htmlFor="startDate">Start date:</label>
                    <div className={`${styles.inputWithButton} ${errors.startDate && styles.inputError}`}>
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: 'Start date is required' }}
                            render={({ field }) => (
                                <DatePicker
                                    id="startDate"
                                    selected={field.value}
                                    onChange={(date) => {
                                        field.onChange(date);
                                        handleDateChange(date);
                                    }}
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="Select a date"
                                />
                            )}
                        />
                        <div className={styles.inputIconButton}>
                            <button type="button" onClick={() => document.getElementById('startDate').focus()}><LuCalendar size={24} /></button>
                        </div>
                    </div>
                </div>
                <div className={styles.agreementText}>
                    <Switch active={true} /> <span>I agree with Terms and Conditions for this service</span>
                </div>
                {openIsTermination && <CanselServiceForm onClose={closeMessege} isOpen={openIsTermination} />}
                <SignUpButtons nameOfButton={"Cancel Service"} status="cancel" Click={onCansel} />
            </form>
        </>
    );
}
