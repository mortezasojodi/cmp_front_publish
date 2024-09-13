import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import PhoneInput from 'react-phone-number-input';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { SearchBox } from '@/components/mapsForm/searchBox';
import { Loader } from '@googlemaps/js-api-loader';
import { GoPlusCircle } from "react-icons/go";
import styles from './addAdressMap.module.css';
import Modal from 'react-modal';
import CustomSelector from '../forms/customSelect/customSelect';
import { FiTrash } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { createOperationalAddress, updateOperationalAddress } from "@/app/utils/apiService";

const libraries = ['places'];
const containerStyle = {
  width: '100%',
  height: '400px',
};

const AddAddressMap = ({ center, isOpen, onClose, onSubmitAddress, initialData}) => {
  const { register, handleSubmit, setValue, control, formState: { errors }, reset, watch } = useForm();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const address = watch('address');
  const latitude = watch('latitude');
  const longitude = watch('longitude');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    version: 'weekly',
    libraries,
    id: 'google-map-script',
  });

  useEffect(() => {
    loader.load()
      .then(() => setIsLoaded(true))
      .catch((error) => setLoadError(error));
  }, [loader]);

  useEffect(() => {
    if(isOpen && initialData){
      console.log(initialData);
      setValue('address', initialData.Address);
      setValue('businessId', initialData.BusinessId);
      setValue('county', initialData.County);
      setValue('firstName', initialData.FirstName);
      setValue('lastName', initialData.LastName);
      setValue('locationPhone', initialData.LocationPhone);
      setValue('crossStreet', initialData.CrossStreet);
    }
    if (!isOpen) {
      reset({
        address: '',
        latitude: '',
        longitude: '',
        crossStreet: '',
        county: '',
        locationPhone: '',
        select: '',
        firstName: '',
        lastName: '',
      });
    }
  }, [isOpen, reset]);

  const mapCenter = address ? { lat: latitude, lng: longitude } : center;

  const handleSubmitAddress = async (data) => {
    setFormSubmitted(true);
    // setApiError(''); // Очистка предыдущих ошибок

    if (!data.address) return;
    let result;
    if (initialData) {
      console.log(initialData.Id);
      result = await updateOperationalAddress(initialData.Id, {
        address: data.address,
        crossStreet: data.crossStreet,
        county: data.county,
        locationPhone: data.locationPhone,
        businessId: 2, // Предполагается, что selectedValue содержит нужный бизнес ID
        firstName: data.firstName,
        lastName: data.lastName,
      }); // Обновление адреса
    } else {
      // console.log(completeData);
      result = await  createOperationalAddress({
        address: data.address,
        crossStreet: data.crossStreet,
        county: data.county,
        locationPhone: data.locationPhone,
        businessId: 2, // Предполагается, что selectedValue содержит нужный бизнес ID
        firstName: data.firstName,
        lastName: data.lastName,
      }); // Создание нового адреса
    }

    if (result.success) {
      // onSubmitAddress(result.data);
      onClose();
      reset();
      setFormSubmitted(false);
    } else {
      // setApiError(result.message);
      console.error('Registration Failed:', result.message);
    }
  };

  const onCancel = () => {
    onClose();
    reset();
    setFormSubmitted(false);
  };

  const options = ["Restaurant", "Food processing company", "Other type"];
  const isAddressFilled = !!address;

  return (
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
        <h2>Add Operational Address</h2>
        <button onClick={onClose}><IoClose size={34} /></button>
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
          zoom={12}
        >
          {address && (
            <OverlayView position={{ lat: latitude, lng: longitude }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <FaMapMarkerAlt size={24} />
            </OverlayView>
          )}
        </GoogleMap>
      </div>
      <form className={styles.dialogForm} onSubmit={handleSubmit(handleSubmitAddress)}>
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
        <label className={styles.smallText}>Cross Street:</label>
        <input
          className={`${styles.formInput} ${errors.crossStreet && styles.inputError}`}
          type="text"
          placeholder="Cross street"
          {...register("crossStreet")}
        />
        <label className={styles.smallText}>County:</label>
        <input
          className={`${styles.formInput} ${errors.county && styles.inputError}`}
          type="text"
          placeholder="County"
          {...register("county")}
        />
        <label className={styles.smallText}>Location Phone:</label>
        <Controller
          name="locationPhone"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              className={errors.locationPhone ? styles.numberInputError : styles.numberInput}
              defaultCountry="US"
              placeholder="Enter phone number"
              onChange={(value) => field.onChange(value)}
              limitMaxLength={10}
            />
          )}
        />
        <label className={styles.smallText}>Type of Business:</label>
        <div className={errors.select && styles.inputError}>
          <Controller
            name="select"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomSelector
                options={options}
                select={"specify whether"}
                selectValue={(value) => {
                  setSelectedValue(value);
                  field.onChange(value);
                }}
              />
            )}
          />
        </div>
        <label className={styles.smallText}>Location Contact Person: </label>
        <div className={styles.personInput}>
          <input
            className={`${styles.formInput} ${errors.firstName && styles.inputError}`}
            type="text"
            placeholder="First Name"
            {...register("firstName", { required: true })}
          />
          <input
            className={`${styles.formInput} ${errors.lastName && styles.inputError}`}
            type="text"
            placeholder="Last Name"
            {...register("lastName", { required: true })}
          />
        </div>
        <div className={styles.submitButtons}>
          <button className={styles.cancel} type='button' onClick={onCancel}>Cancel</button>
          <button type="submit">Add ADDRESS <GoPlusCircle size={24} /></button>
        </div>
      </form>
    </Modal>
  );
}

export default AddAddressMap;



