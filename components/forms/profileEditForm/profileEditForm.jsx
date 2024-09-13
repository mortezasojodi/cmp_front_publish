"use client"
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FiTrash } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";
import AddAddressMap from '@/components/mapsForm/addAdressMap';
import AddPointMap from '@/components/mapsForm/addPointMap';
import SignUpButtons from "../signUpButtons/signUpButtons"
import React, { useState } from 'react';
import PhotoUpload from "../photoUpload/photoUpload";
import styles from "../profileEditForm/profileEditForm.module.css"

const initialData = {
  companyName: "Innovatech Solutions",
  primaryContactPerson: ["Alexander", "Johnson"],
  phone: "+1 555-123-4567",
  businessEmail: "alex.johnson@innovatech.com",
  position: "Chief Technology Officer (CTO)",
  secondaryContactPerson: ["Emily", "Davis"],
  secondaryPhone: "+1 555-123-4567",
  addresses: [
    {
      operationalAddress: new Set([
        { address: "3665 N Harbor Dr, San Diego, CA 92101", latitude: 32.7321229, longitude: -117.1968112 }
      ]),
      oilContainerLocation: new Set([
        { locationName: "point 1", lat: 37.7749, lng: -122.4194 },
        // { locationName: "point 2", lat: 34.0522, lng: -118.2437 }
      ]),
      greaseTrapLocation: new Set([
        // { locationName: "point 1", lat: 37.7749, lng: -122.4194 },
        { locationName: "point 2", lat: 34.0522, lng: -118.2437 }
      ])
    },
    {
      operationalAddress: new Set([
        { address: "3665 N Harbor Dr, San Diego, CA 92101", latitude: 32.7321229, longitude: -117.1968112 }
      ]),
      oilContainerLocation: new Set([
        { locationName: "point 1", lat: 37.7749, lng: -122.4194 },
        // { locationName: "point 2", lat: 34.0522, lng: -118.2437 }
      ]),
      greaseTrapLocation: new Set([
        // { locationName: "point 1", lat: 37.7749, lng: -122.4194 },
        // { locationName: "point 2", lat: 34.0522, lng: -118.2437 }
      ])
    }
  ]
};

const ProfileEditForm = () => {

  const center = {
    lat: 34.063473,
    lng: -118.242753
  };

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    defaultValues: initialData
  });

  const [data, setData] = useState(initialData);
  const [modalIsOpen, setModalIsOpen] = useState(initialData.addresses.map(() => ({ operational: false, oilContainer: false, greaseTrap: false })));

  const openModal = (groupIndex, type) => {
    const updatedModalIsOpen = [...modalIsOpen];
    updatedModalIsOpen[groupIndex] = { ...updatedModalIsOpen[groupIndex], [type]: true };
    setModalIsOpen(updatedModalIsOpen);
  };
  
  const closeModal = (groupIndex, type) => {
    const updatedModalIsOpen = [...modalIsOpen];
    updatedModalIsOpen[groupIndex] = { ...updatedModalIsOpen[groupIndex], [type]: false };
    setModalIsOpen(updatedModalIsOpen);
  };

  const addArray = (index, field, newItem) => {
    setData((prevData) => {
      const updatedAddresses = [...prevData.addresses];
      const currentItems = Array.from(updatedAddresses[index][field]); 
      
      if (!currentItems.some(item => item.locationName === newItem.locationName)) {
        updatedAddresses[index][field] = new Set([...currentItems, newItem]); 
      }
      
      return {
        ...prevData,
        addresses: updatedAddresses
      };
    });
  };
  
  
  
  

  const removeField = (groupIndex, field, item) => {
    setData((prevData) => {
      const updatedAddresses = [...prevData.addresses];
      updatedAddresses[groupIndex][field].delete(item);
      return {
        ...prevData,
        addresses: updatedAddresses
      };
    });
  };
  
  const removeOperationalAddress = (index) => {
    setData((prevData) => {
      const updatedAddresses = [...prevData.addresses];
      updatedAddresses[index].operationalAddress = [];
      return {
        ...prevData,
        addresses: updatedAddresses
      };
    });
  };

  const getOperationalCenter = (index) => {
    const operationalAddressSet = data.addresses[index].operationalAddress;
    if (operationalAddressSet.size > 0) {
      const [firstAddress] = [...operationalAddressSet];
      const { latitude, longitude } = firstAddress;
      return { lat: latitude, lng: longitude };
    } else {
      return center;
    }
  };
  
  const onSubmit = (formData) => {
    if (data.addresses.some(address => address.operationalAddress.size === 0)) {
      alert("All fields are required, and at least one operational address must be provided for each address set.");
      return;
    }
  
    const updatedAddresses = data.addresses.map(address => ({
      ...address,
      operationalAddress: [...address.operationalAddress],
      oilContainerLocation: [...address.oilContainerLocation],
      greaseTrapLocation: [...address.greaseTrapLocation]
    }));
  
    formData.addresses = updatedAddresses;
    console.log("Form data:", formData);
  };
  
  
  
  
  return (
    <>
      <div className={styles.container}>
        <PhotoUpload/>
        <h3>Basic Information</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formSection}>
            <label htmlFor="companyName">Company name: </label>
            <input 
              type="text" 
              id="companyName" 
              defaultValue={initialData.companyName}
              className={`${styles.formInput} ${errors.companyName && styles.inputError}`} 
              placeholder="Company name" 
              name="companyName" 
              {...register('companyName', { required: true })}
            />
          </div>
          
          <div className={styles.formSection}>
            <label htmlFor='contactPerson'>Primary contact person: </label>
            <div className={styles.personInput}>
              <input 
                id='contactPerson'
                className={`${styles.formInput} ${errors.contactFirstName && styles.inputError}`} 
                defaultValue={initialData.primaryContactPerson[0]}
                type="text" 
                placeholder="First Name" 
                {...register("contactFirstName", { required: true })}
              />
              <input 
                id='contactPerson'
                className={`${styles.formInput} ${errors.contactLastName && styles.inputError}`} 
                defaultValue={initialData.primaryContactPerson[1]}
                type="text" 
                placeholder="Last Name" 
                {...register("contactLastName", { required: true })}
              />
            </div>
          </div>
          
          <div className={styles.formSection}>
            <label htmlFor='phoneNumber'>Contact Phone Number: </label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  className={errors.phone ? styles.numberInputError : styles.numberInput}
                  defaultCountry="US"
                  placeholder="Enter phone number"
                  onChange={(value) => field.onChange(value)}
                  limitMaxLength={10}
                />
              )}
            />
          </div>
          
          <div className={styles.formSection}>
            <label htmlFor='email'>Business Email: </label>
            <input 
              type="text" 
              id='email' 
              placeholder="Business Email"
              className={`${styles.formInput} ${errors.email && styles.inputError}`}
              defaultValue={initialData.businessEmail}
              name="email" 
              autoComplete='email' 
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>
          
          <div className={styles.formSection}>
            <label htmlFor="position">Position: </label>
            <input 
              type="text" 
              id="position" 
              className={`${styles.formInput} ${errors.position && styles.inputError}`} 
              defaultValue={initialData.position}
              placeholder="Position" 
              name="position" 
              {...register('position', { required: true })}
            />
          </div>
          
          <div className={styles.formSection}>
            <label htmlFor='secondContactPerson'>Secondary contact person: </label>
            <div className={styles.personInput}>
              <input 
                id='secondContactPerson'
                className={`${styles.formInput} ${errors.secondContactFirstName && styles.inputError}`} 
                defaultValue={initialData.secondaryContactPerson[0]}
                type="text" 
                placeholder="First Name" 
                {...register("secondContactFirstName", { required: true })}
              />
              <input 
                id='secondContactPerson'
                className={`${styles.formInput} ${errors.secondContactLastName && styles.inputError}`} 
                defaultValue={initialData.secondaryContactPerson[1]}
                type="text" 
                placeholder="Last Name" 
                {...register("secondContactLastName", { required: true })}
              />
            </div>
          </div>
          
          <div className={styles.formSection}>
            <label htmlFor='secondPhoneNumber'>Secondary phone number: </label>
            <Controller
              name="secondaryPhone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  className={errors.secondaryPhone ? styles.numberInputError : styles.numberInput}
                  defaultCountry="US"
                  placeholder="Enter secondary phone number"
                  onChange={(value) => field.onChange(value)}
                  limitMaxLength={10}
                />
              )}
            />
          </div>

          <h3>Professional Information</h3>
          {data.addresses.map((addressGroup, groupIndex) => (
            <React.Fragment key={`address-group-${groupIndex}`}>
              <p>{groupIndex + 1} Address: </p>
              <div className={styles.formSection}>
                <label htmlFor={`operational-${groupIndex}`}>Operational address: </label>
                {addressGroup.operationalAddress.size > 0 ? ( 
                <div className={styles.informSection}>
                  {[...addressGroup.operationalAddress].map((item, index) => (
                    <div className={styles.fakeInput} key={`operational-${groupIndex}-${index}`}>
                      {item.address}
                      <div className={styles.inputIconButton}>
                        <button type="button"><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                        <button type="button" onClick={() => removeOperationalAddress(groupIndex)}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                      </div>
                    </div>
                  ))}
                  </div>
                ) : (
                  <>
                    <button type='button' id={`operational-${groupIndex}`} onClick={() => openModal(groupIndex, 'operational')} className={styles.addLocationButton}>
                      <GoPlusCircle size={"24"} /> ADD ADDRESS
                    </button>
                    <AddAddressMap
                      onSubmitAddress={(newAddress) => {
                        addArray(groupIndex, 'operationalAddress', newAddress);
                        closeModal(groupIndex, 'operational');
                      }}
                      isOpen={modalIsOpen[groupIndex].operational}
                      onClose={() => closeModal(groupIndex, 'operational')}
                      center={getOperationalCenter(groupIndex)}
                    />
                  </>
                )}
              </div>

              <div className={styles.formSection}>
                <label htmlFor={`oilContainer-${groupIndex}`}>Oil Container Location: </label>
                <div className={styles.informSection}>
                  {[...addressGroup.oilContainerLocation].map((item, index) => (
                    <div key={`oilContainer-${groupIndex}-${index}`} className={styles.fakeInput}>
                      {item.locationName}, {item.lat}, {item.lng}
                      <div className={styles.inputIconButton}>
                        <button type="button"><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                        <button type="button" onClick={() => removeField(groupIndex, 'oilContainerLocation', item)}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                      </div>
                    </div>
                  ))}
                  <button type='button' id={`oilContainer-${groupIndex}`} onClick={() => openModal(groupIndex, 'oilContainer')}  className={styles.addLocationButton}>
                    <GoPlusCircle size={"24"} /> ADD LOCATION
                  </button>
                  <AddPointMap
                    onSubmitAddress={(data) => addArray(groupIndex, 'oilContainerLocation', data)}
                    isOpen={modalIsOpen[groupIndex].oilContainer}
                    onClose={() => closeModal(groupIndex, 'oilContainer')}
                    center={getOperationalCenter(groupIndex)}
                    type={'Oil'}
                    typeOfButton={'LOCATION'}
                  />
                </div>
              </div>
              <div className={styles.formSection}>
                <label htmlFor={`greaseTrap-${groupIndex}`}>Grease Trap Location: </label>
                <div className={styles.informSection}>
                  {[...addressGroup.greaseTrapLocation].map((item, index) => (
                    <div key={`greaseTrap-${groupIndex}-${index}`} className={styles.fakeInput}>
                      {item.locationName}, {item.lat}, {item.lng}
                      <div className={styles.inputIconButton}>
                        <button type="button"><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                        <button type="button" onClick={() => removeField(groupIndex, 'greaseTrapLocation', item)}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                      </div>
                    </div>
                  ))}
                  <button type='button' id={`greaseTrap-${groupIndex}`} onClick={() => openModal(groupIndex, 'greaseTrap')} className={styles.addLocationButton}>
                    <GoPlusCircle size={"24"} /> ADD LOCATION
                  </button>
                  <AddPointMap
                    onSubmitAddress={(data) => addArray(groupIndex, 'greaseTrapLocation', data)}
                    isOpen={modalIsOpen[groupIndex].greaseTrap}
                    onClose={() => closeModal(groupIndex, 'greaseTrap')}
                    center={getOperationalCenter(groupIndex)}
                    type={'Grease Trap'}
                    typeOfButton={'LOCATION'}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
          <SignUpButtons nameOfButton={"Save"} Click={onSubmit} status={"save"}/>
          {/* <button type="submit">Submit</button> */}
        </form>
      </div>
    </>
  );
};

export default ProfileEditForm;
