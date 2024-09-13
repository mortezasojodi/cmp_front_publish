'use client'
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import AddAddressMap from '@/components/mapsForm/addAdressMap';
import AddPointMap from '../mapsForm/addPointMap';
import Title from './title';
import NextButton from './nextButton';
import { LiaEdit } from "react-icons/lia";
import { FiTrash } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import {PiWarningCircle } from "react-icons/pi";
import styles from './signUp.module.css';
import { fetchOperationalAddress, fetchCompanyLocations, 
  deleteOperationalAddress, deleteCompanyLocation } from '@/app/utils/apiService';

const Step2 = ({ onNext, onBack }) => {

  const center = {
    lat: 34.063473,
    lng: -118.242753
  };

  const { handleSubmit, setValue, formState: { errors } } = useFormContext();
  const [modalIsOpen, setModalIsOpen] = useState({
    operational: false,
    oilContainer: false,
    greaseTrap: false,
  });

  const [operationalAddress, setOperationalAddress] = useState(null);
  const [oilContainers, setOilContainers] = useState([]);
  const [greaseTraps, setGreaseTraps] = useState([]);
  const [editData, setEditData] = useState({ type: null, item: null });
  const [showWarning, setShowWarning] = useState(false);


  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const operationalResult = await fetchOperationalAddress(token);
    const locationsResult = await fetchCompanyLocations(token);

    if (operationalResult.success) {
      setOperationalAddress(operationalResult.data);
    }

    if (locationsResult.success) {
      const oil = locationsResult.data.filter(loc => loc.Type === 1);
      const grease = locationsResult.data.filter(loc => loc.Type === 2);

      setOilContainers(oil);
      setGreaseTraps(grease);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type, item = null) => {
    setModalIsOpen(prevState => ({ ...prevState, [type]: true }));
    if (item) {
      setEditData({ type, item });
    }
  };
  

  const closeModal = (type) => {
    setModalIsOpen(prevState => ({ ...prevState, [type]: false }));
    setEditData({ type: null, item: null });
    fetchData();
  };

  const handleDeleteOperationalAddress = async () => {
    if (operationalAddress) {
      const result = await deleteOperationalAddress(operationalAddress.Id);
      if (result.success) {
        setOperationalAddress(null);
      } else {
        console.error(result.message);
      }
    }
  };

  const handleDeleteCompanyLocation = async (id, type) => {
    const result = await deleteCompanyLocation(id);
    if (result.success) {
      if (type === 1) {
        setOilContainers(prev => prev.filter(item => item.Id !== id));
      } else if (type === 2) {
        setGreaseTraps(prev => prev.filter(item => item.Id !== id));
      }
    } else {
      console.error(result.message);
    }
  };

  const handleEditOperationalAddress = () => {
    if (operationalAddress) {
      openModal('operational', operationalAddress);
    }
  };

  const handleEditCompanyLocation = (item, type) => {
    openModal(type === 1 ? 'oilContainer' : 'greaseTrap', item);
  };

  const onSubmit = () => {
    if (!operationalAddress) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      onNext();
    }
  };

  return (
    <>
      <Title title={"Professional Information"} />
      <div className={styles.form} >
        <div className={styles.formSection}>
          <label htmlFor='operational'>Operational address: </label>
          {operationalAddress ? (
            <div className={styles.informSection}>
              <div className={styles.fakeInput}>
                {operationalAddress.Address}
                <div className={styles.inputIconButton}>
                  <button type="button" onClick={handleEditOperationalAddress}><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                  <button type="button" onClick={handleDeleteOperationalAddress}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                </div>
              </div>
            </div>
          ) : (
            <><div className={styles.showWarning}>
              <button type='button' id='operational' onClick={() => openModal('operational')} className={styles.addLocationButton}>
                <GoPlusCircle size={"24"} /> ADD ADDRESS
              </button>
              {showWarning && (
                <div className={styles.errorText}>
                  <PiWarningCircle size={24} color='red' />
                  <p>Please add an operational address before proceeding.</p>
                </div>
              )}
            </div>
            </>
          )}
          <AddAddressMap
            onSubmitAddress={(data) => setOperationalAddress(data)}
            isOpen={modalIsOpen.operational}
            onClose={() => closeModal('operational')}
            center={center}
            initialData={editData.item}
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='oilContainer'>Oil Container Location: </label>
          <div className={styles.informSection}>
            {oilContainers.map((item, index) => (
              <div key={`oilContainer-${index}`} className={styles.fakeInput}>
                {item.Name}, {item.Lat}, {item.Long}
                <div className={styles.inputIconButton}>
                  <button type="button" onClick={() => handleEditCompanyLocation(item, 1)}><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                  <button type="button" onClick={() => handleDeleteCompanyLocation(item.Id, 1)}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                </div>
              </div>
            ))}
            <button type='button' id='oilContainer' onClick={() => openModal('oilContainer')} className={styles.addLocationButton}>
              <GoPlusCircle size={"24"}/> ADD LOCATION
            </button>
            <AddPointMap 
              isOpen={modalIsOpen.oilContainer}
              onClose={() => closeModal('oilContainer')} 
              onSubmitAddress={(data) => {
                setOilContainers(prev => [...prev, data]);
                
              }}
              center={center}
              type={'Oil'}
              typeOfButton={'LOCATION'}
              initialData={editData.item}
            />
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor='greaseTrap'>Grease Trap Location: </label>
          <div className={styles.informSection}>
            {greaseTraps.map((item, index) => (
              <div key={`greaseTrap-${index}`} className={styles.fakeInput}>
                {item.Name}, {item.Lat}, {item.Long}
                <div className={styles.inputIconButton}>
                  <button type="button" onClick={() => handleEditCompanyLocation(item, 2)}><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                  {/* <button type="button" onClick={() => openModal('greaseTrap', item)}><LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} /></button> */}
                  <button type="button" onClick={() => handleDeleteCompanyLocation(item.Id, 2)}><FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} /></button>
                </div>
              </div>
            ))}
            <button type='button' id='greaseTrap' onClick={() => openModal('greaseTrap')} className={styles.addLocationButton}>
              <GoPlusCircle size={"24"}/> ADD LOCATION
            </button>
            
            <AddPointMap 
              // initialData={greaseTraps.find(loc => loc.Type === 2)}  // Pass existing grease trap location
              onSubmitAddress={(data) => setGreaseTraps(prev => [...prev, data])} 
              isOpen={modalIsOpen.greaseTrap}
              onClose={() => closeModal('greaseTrap')} 
              center={center}
              type={'Grease Trap'}
              typeOfButton={'LOCATION'}
              initialData={editData.item}
              // editData={true}
            />
          </div>
        </div>
        <div className={styles.buttonLine}>
          <button type="button" onClick={onBack}>Back</button>
          <NextButton onClick={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default Step2;