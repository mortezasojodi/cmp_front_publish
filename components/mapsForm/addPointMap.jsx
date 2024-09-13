'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoPlusCircle } from "react-icons/go";
import Modal from 'react-modal';
import { useForm, Controller } from "react-hook-form";
import styles from './addPointMap.module.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { IoClose } from "react-icons/io5";
import CustomSelector from '../forms/customSelect/customSelect';
import { createCompanyLocation, updateCompanyLocation } from "@/app/utils/apiService";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '400px',
};

const libraries = ['places'];

const options = [
  "10",
  "20",
  "30",
  "40",
  "50"
];

const AddPointMap = ({ isOpen, onClose, onSubmitAddress, center, type, typeOfButton, initialData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [marker, setMarker] = useState(null);
  const [capacityValue, setCapacityValue] = useState('');

  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY ?? '',
    version: 'weekly',
    libraries,
    id: 'google-map-script',
  });

  const { register, handleSubmit, setValue, control, formState: { errors }, reset } = useForm();
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    loader
      .load()
      .then(() => setIsLoaded(true))
      .catch((error) => setLoadError(error));
  }, [loader]);

  useEffect(() => {
    if(isOpen && initialData){
      console.log(initialData);
      setValue('name', initialData.Name);
      setValue('selectAdress', initialData.SelectAdress);
      setValue('comment', initialData.Comment);
      setValue('primaryFirstName', initialData.PrimaryFirstName);
      setValue('primaryLastName', initialData.PrimaryLastName);
      setValue('primaryPhonNumber', initialData.PrimaryPhonNumber);
      setCapacityValue(initialData.Capacity);
      // setMarker({
      //   lat: initialData.Lat,
      //   long: initialData.Long,
      // });
    }
    if (!isOpen) {
      reset({
        name: '',
        selectAdress: '',
        comment: '',
        primaryFirstName: '',
        primaryLastName: '',
        primaryPhonNumber: '',
        capacity: '',
      });
      setMarker(null);
      setSelectedValue(null);
    }
  }, [isOpen, reset]);

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
  }, []);

  // const handleSelectValue = (value) => {
  //   setSelectedValue(value);
  //   setValue('capacity', value);
  // };

  const onSubmit = async (data) => {
    let result;
    if(initialData){
      console.log(initialData.Id);
      result = await updateCompanyLocation(initialData.Id, {
        name: data.name,
        lat: marker.lat,
        long: marker.lng,
        capacity: data.capacity, 
        comment: data.comment,
        primaryFirstName: data.primaryFirstName,
        primaryLastName: data.primaryLastName,
        primaryPhonNumber: data.primaryPhonNumber,
        type: type === 'Oil' ? '1' : '2'
      });
    }else{
      result = await createCompanyLocation({
        name: data.name,
        lat: marker?.lat || 0,
        long: marker?.lng || 0,
        capacity: data.capacity, 
        comment: data.comment,
        primaryFirstName: data.primaryFirstName,
        primaryLastName: data.primaryLastName,
        primaryPhonNumber: data.primaryPhonNumber,
        type: type === 'Oil' ? '1' : '2'
      });
    }

    

    if (result.success) {
      // onSubmitAddress(result.data);
      console.log(result.data);
      onClose();
      reset();
      setMarker(null);
      setValue("primaryPhonNumber", "");
      setValue('capacity', '');
    } else {
      console.error(result.message);
    }

    
  };

  const onCancel = () => {
    onClose();
    reset();
    setMarker(null);
    setSelectedValue(null);
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Add Operational Address"
        ariaHideApp={false}
        style={{ 
          overlay: { backgroundColor: 'rgba(31, 34, 41, 0.8)' }, 
          content: { borderRadius: '10px' }  
        }}
      >
        <div className={styles.title}>
          <h2>{type} {type === "Oil" ? 'Container Location' : 'Location'}</h2>    
          <button onClick={onClose}><IoClose size={34}/></button>
        </div>
        <GoogleMap
          id="google-map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          onClick={handleMapClick}
        >
          {marker && (
            <OverlayView
              position={{ lat: marker.lat, lng: marker.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <FaMapMarkerAlt size={24} />
            </OverlayView>
          )}
        </GoogleMap>
        <form className={styles.dialogForm} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.smallText}>{type} Location Name:</label>
          <input 
            className={`${styles.formInput} ${errors.name && styles.inputError}`} 
            placeholder="Enter name" 
            {...register("name", { required: true })}
          />
          <label className={styles.smallText}>Location coordinates:</label>
          { marker && (
            <div className={styles.selectAdress}>
              {marker.lat}, {marker.lng}
            </div>
          )}
          {!marker && (
            <>
              <input 
                className={`${styles.formInput} ${errors.selectAdress && styles.inputError}`} 
                type="text" 
                placeholder="Put a point on the map" 
                disabled={true}
                {...register("selectAdress", { required: true })}
              />
            </>
          )}
          <label className={styles.smallText}>{type === 'Oil' ? 'Coocking Oil' : 'Grease Trap'} Capacity:</label>
          <div className={errors.capacity && styles.inputError}>
            <Controller
              name="capacity"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelector
                  options={options}
                  select={type === 'Oil' ? 'Oil Capacity' : 'Trap Capacity'}
                  selectValue={(value) => {
                    setSelectedValue(value);
                    field.onChange(value);
                  }}
                  initialValue={capacityValue}
                />
              )}
            />
          </div>
          <label className={styles.smallText}>{type === 'Oil' ? 'Oil' : 'Trap'} Location Comments:</label>
          <textarea 
            className={`${styles.textareaInput} ${errors.comment && styles.inputError}`} 
            placeholder="Enter text" 
            rows="6" 
            {...register("comment", { required: true })} 
          />
          <label className={styles.smallText}>Primary contact person:</label>
          <div className={styles.personInput}>
            <input 
              className={`${styles.formInput} ${errors.primaryFirstName && styles.inputError}`} 
              type="text" 
              placeholder="First Name" 
              {...register("primaryFirstName", { required: true })} 
            />
            <input 
              className={`${styles.formInput} ${errors.primaryLastName && styles.inputError}`} 
              type="text" 
              placeholder="Last Name" 
              {...register("primaryLastName", { required: true })} 
            />
          </div>
          <label className={styles.smallText}>Contact number:</label>
          <Controller
            name="primaryPhonNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                className={errors.primaryPhonNumber ? styles.numberInputError : styles.numberInput}
                defaultCountry="US"
                placeholder="Enter phone number"
                onChange={(value) => field.onChange(value)}
                limitMaxLength={10}
              />
            )}
          />
          
          <div className={styles.submitButtons}>
            <button className={styles.cancel} type='button' onClick={onCancel}>Cancel</button>
            <button type="submit">Add {typeOfButton} <GoPlusCircle size={24} /></button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(AddPointMap);
