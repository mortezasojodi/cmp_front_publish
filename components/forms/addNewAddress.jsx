"use client"
import { GoPlusCircle } from "react-icons/go";
import AddAddressMap from '@/components/mapsForm/addAdressMap';
import AddPointMap from '../mapsForm/addPointMap';
import { useRouter } from "next/navigation";
import { LiaEdit } from "react-icons/lia";
import { FiTrash } from "react-icons/fi";
import { useState } from 'react';
import styles from "./addNewAddress.module.css"

export default function AddNewAddressForm(){
  const center = {
    lat: 34.063473,
    lng: -118.242753
  };
  
    const [modalIsOpen, setModalIsOpen] = useState({
      operational: false,
      oilContainer: false,
      greaseTrap: false,
    });


   const [myArray, setMyArray] = useState([]);
   const {push} = useRouter();
 
   const addArray = (key, data) => {
     setMyArray(prevArray => [...prevArray, { [key]: data }]);
   };
 
   const removeField = (key, index) => {
     console.log("Массив до удаления:", myArray);
     setMyArray(prevArray => prevArray.map((item, i) => {
       if (i === index && item[key]) {
         return { ...item, [key]: null };
       }
       return item;
     }));
     console.log("Массив после удаления:", myArray);
   };
 
   const removeOperationalAddress = () => {
     const operationalAddressIndex = myArray.findIndex(item => item.hasOwnProperty('operationalAddress'));
     if (operationalAddressIndex !== -1) {
       setMyArray(prevArray => prevArray.filter((item, index) => index !== operationalAddressIndex));
     }
   };
   
 
   const openModal = (type) => {
     setModalIsOpen(prevState => ({ ...prevState, [type]: true }));
   };
 
   const closeModal = (type) => {
     setModalIsOpen(prevState => ({ ...prevState, [type]: false }));
   };
 
   const info = ['random', 'infom'];
 
   const onSubmit = () => {
      push('/dashboard');
   };
 
    const operationalAddressObject = myArray.find(item => item.operationalAddress);
    const operationalAddress = operationalAddressObject && operationalAddressObject.operationalAddress;
    const operationalAddressCenter = operationalAddress ? { lat: operationalAddress.latitude, lng: operationalAddress.longitude } : center;


    return (
      <div className={styles.form} >
        <div className={styles.formSection}>
          <label htmlFor='operational'>Operational address: </label>
          {operationalAddress ? (
            <div className={styles.informSection}>
              <div className={styles.fakeInput}>
                {operationalAddress.address}
                <div className={styles.inputIconButton}>
                  <button type="button"><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                  <button type="button" onClick={removeOperationalAddress}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button type='button' id='operational' onClick={() => openModal('operational')} className={styles.addLocationButton}>
                <GoPlusCircle size={"24"} /> ADD ADDRESS
              </button>
              <AddAddressMap
                onSubmitAddress={(data) => addArray('operationalAddress', data)}
                isOpen={modalIsOpen.operational}
                onClose={() => closeModal('operational')}
                center={center}
              />
            </>
          )}
        </div>
      <div className={styles.formSection}>
        <label htmlFor='oilContainer'>Oil Container Location: </label>
        <div className={styles.informSection}>
          {myArray.map((item, index) => (
            item.oilContainer && (
              <div key={`oilContainer-${index}`} className={styles.fakeInput}>
                {item.oilContainer.locationName}, {item.oilContainer.lat}, {item.oilContainer.lng}
                <div className={styles.inputIconButton}>
                  <button type="button"><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                  <button type="button" onClick={() => removeField('oilContainer', index)}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                </div>
              </div>
            )
          ))}
          <button type='button' id='oilContainer' onClick={() => openModal('oilContainer')} className={styles.addLocationButton}>
            <GoPlusCircle size={"24"}/> ADD LOCATION
          </button>
          <AddPointMap 
            onSubmitAddress={(data) => addArray('oilContainer', data)} 
            isOpen={modalIsOpen.oilContainer} 
            onClose={() => closeModal('oilContainer')} 
            center={operationalAddressCenter} 
            type={'Oil'}
            typeOfButton={"LOCATION"}
          />
        </div>
      </div>
      <div className={styles.formSection}>
        <label htmlFor='greaseTrap'>Grease Trap Location: </label>
        <div className={styles.informSection}>
          {myArray.map((item, index) => (
            item.greaseTrap && (
              <div key={`greaseTrap-${index}`} className={styles.fakeInput}>
                {item.greaseTrap.locationName}, {item.greaseTrap.lat}, {item.greaseTrap.lng}
                <div className={styles.inputIconButton}>
                  <button type="button"><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                  <button type="button" onClick={() => removeField('greaseTrap', index)}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                </div>
              </div>
            )
          ))}
          <button type='button' id='greaseTrap' onClick={() => openModal('greaseTrap')} className={styles.addLocationButton}>
            <GoPlusCircle size={"24"}/> ADD LOCATION
          </button>
          <AddPointMap 
            onSubmitAddress={(data) => addArray('greaseTrap', data)} 
            isOpen={modalIsOpen.greaseTrap} 
            onClose={() => closeModal('greaseTrap')} 
            center={operationalAddressCenter}
            type={'Grease Trap'}
            typeOfButton={"LOCATION"}
          />
        </div>
      </div>
      <div className={styles.buttonLine}>
        <button onClick={onSubmit} > ADD NEW ADDRESS</button>
      </div>
    </div>
    );
}
