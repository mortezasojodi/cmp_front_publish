import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import PhoneInput from 'react-phone-number-input';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoPlusCircle } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import { SearchBox } from '@/components/mapsForm/searchBox';
import { Loader } from '@googlemaps/js-api-loader';
import styles from './addAdressMap.module.css';
import Modal from 'react-modal';
import CustomSelector from '../forms/customSelect/customSelect';

import { IoClose } from "react-icons/io5";

const libraries = ['places'];
const containerStyle = {
  width: '100%',
  height: '400px',
};

export default function EmergenAdressMap({ center, isOpen, onClose, onSubmitAddress }) {
  const option = [
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
  ];
  const { register, handleSubmit, setValue, control, formState: { errors }, reset, watch } = useForm();

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const [selectedValue, setSelectedValue] = useState(null);

  const address = watch('address');
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    version: 'weekly',
    libraries,
    id: 'google-map-script',
  });

  useEffect(() => {
    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        setLoadError(error);
      });
  }, [loader]);

  const mapCenter = address ? { lat: latitude, lng: longitude } : center;

 
  const [formSubmitted, setFormSubmitted] = useState(false);

 
  const handleSubmitAddress = (data) => {
    setFormSubmitted(true);
    if (!data.address) {
      return;
    }
    onSubmitAddress(data);
    console.log(data);
    onClose();
    reset();
    setFormSubmitted(false);
  };

  const onCancel = () => {
    onClose();
    reset();
    setFormSubmitted(false); 
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Add Operational Address"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(31, 34, 41, 0.8)',
          },
          content: {
            borderRadius: '10px',
          }
        }}
      >
        <div className={styles.title}>
            <h2>Add Operational address</h2>
            <button onClick={onClose}><IoClose size={34}/></button>
        </div>
        <div className={styles.mapSection}>
          <SearchBox
            onSelectAddress={(address, latitude, longitude) => {
              setValue('address', address);
              setValue('latitude', latitude);
              setValue('longitude', longitude);
            }}
            defaultValue=""
            loader={loader}
          />
          <GoogleMap
            id="google-map"
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={14}
          >
            {address && (
              <OverlayView position={{ lat: latitude, lng: longitude }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <FaMapMarkerAlt size={24} />
              </OverlayView>
            )}
          </GoogleMap>
        </div>
        <form className={styles.dialogForm} onSubmit={handleSubmit(handleSubmitAddress)}>
          <label className={styles.smallText}>Quantity gallons:</label>
          <div className={errors.select  && styles.inputError}>
            <Controller
            name="select"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomSelector
                options={option}
                select={"quantity"}
                selectValue={(value) => {
                  setSelectedValue(value);
                  field.onChange(value);
                }}
              />
            )}/>
              
          </div>
          <div/>
          <label>Operational address:</label>
          {address ? (
            <div className={styles.fakeInput}>
              <p>{address}</p>
              <button type="button" onClick={() => setValue('address', '')}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
            </div>
          ) : (
            <div className={`${formSubmitted && !address ? styles.inputError : ''}`}>
              <SearchBox
                onSelectAddress={(address, latitude, longitude) => {
                  setValue('address', address);
                  setValue('latitude', latitude);
                  setValue('longitude', longitude);
                }}
                defaultValue=""
                loader={loader}
              />
            </div>
          )}
          <label htmlFor='comments' className={styles.label}> Location Comments:</label>
          <textarea 
          id='comments'
            className={`${styles.textareaInput} ${errors.comments && styles.inputError}`} 
            placeholder="Enter text" 
            rows="4" 
            {...register("comments", { required: true })} 
          />
          <div className={styles.submitButtons}>
              <button className={styles.cancel} type='button' onClick={onCancel}>Cansel</button>
              <button type="submit" >add location <GoPlusCircle size={24} /></button>
            </div>
        </form>
      </Modal>
    </>
  );
}
