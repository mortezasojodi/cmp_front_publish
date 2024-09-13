"use client";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GoPlusCircle } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { FiFileText } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import PhoneInput from "react-phone-number-input";
import { SignUpCommand } from "@/domain/command/signUp_command";

import styles from "./signUp.module.css";
import AddAddressMap from "@/components/mapsForm/addAdressMap";
import RegistationSuccessModal from "./registrationSuccessModule";
import AddPointMap from "../mapsForm/addPointMap";
import PaymentForm from "./paymentForm";
import { signUp } from "@/data/api/company/signUp";
import { PiEye, PiEyeClosed } from "react-icons/pi";

import toast, { Toaster } from "react-hot-toast";
import { Title } from "./signUp";
import { getOperationalAddress } from "@/data/api/operationalAddress/get";
import { OperationalAddressEntity } from "@/domain/entity/operational_address_entity";
import { NextButton } from "./nextButton";
import { getOtherCompanyLocation } from "@/data/api/otherCompanyLocation/get";
import { LocationCompanyEntity } from "@/domain/entity/location_company_entity";
import { useLoading } from "../loading/loading_context";

export const OperationalAddress = ({ onNext, onBack, operationalArray }) => {

  const [operationalAddress, setoperationalAddress] = useState<OperationalAddressEntity>(null);
  const [otherAddress, setotherAddress] = useState<LocationCompanyEntity[]>([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    getOprAddress();
  }, []);

  async function getOprAddress() {
    try {
      setLoading(true);
      var result = await getOperationalAddress();
      result.fold(
        (s) => {
        },
        async (data) => {
          setoperationalAddress(data);
          if (data != null) {
            await getOtherAddress(data);
          }
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function getOtherAddress(oprAddress) {

    try {
      setLoading(true);
      var result = await getOtherCompanyLocation(oprAddress?.Id);
      result.fold(
        (s) => {
        },
        (data) => {
          setotherAddress(data);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  const center = {
    lat: 34.063473,
    lng: -118.242753,
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [modalIsOpen, setModalIsOpen] = useState({
    operational: false,
    oilContainer: false,
    greaseTrap: false,
  });

  const [myArray, setMyArray] = useState([]);

  const addArray = (key, data) => {
    if (operationalAddress == null)
      getOprAddress();
    else {
      getOtherAddress(operationalAddress);
    }

  };

  const removeField = (key, index) => {
    setMyArray((prevArray) =>
      prevArray.map((item, i) => {
        if (i === index && item[key]) {
          return { ...item, [key]: null };
        }
        return item;
      })
    );
  };

  // const removeOperationalAddress = () => {
  //   const operationalAddressIndex = myArray.findIndex((item) =>
  //     item.hasOwnProperty("operationalAddress")
  //   );
  //   if (operationalAddressIndex !== -1) {
  //     setMyArray((prevArray) =>
  //       prevArray.filter((item, index) => index !== operationalAddressIndex)
  //     );
  //   }
  // };

  const openModal = (type) => {
    setModalIsOpen((prevState) => ({ ...prevState, [type]: true }));
  };
  const closeModal = (type) => {
    setModalIsOpen((prevState) => ({ ...prevState, [type]: false }));
  };
  const info = ["random", "infom"];
  const onSubmit = () => {
    onNext();
  };

  const operationalAddressCenter = operationalAddress
    ? { lat: operationalAddress.Lat, lng: operationalAddress.Long }
    : center;

  return (
    <>
      <Title title={"Professional Information"} />
      <div className={styles.form}>
        <div className={styles.formSection}>
          <label htmlFor="operational">Operational address: </label>
          {operationalAddress ? (
            <div className={styles.informSection}>
              <div className={styles.fakeInput}>
                {operationalAddress.Address}
                {operationalAddress.FirstName}
                <div className={styles.inputIconButton}>
                  {/* <button type="button">
                    <LiaEdit
                      size={26}
                      style={{ color: "rgba(76, 142, 59, 1)" }}
                    />
                  </button>
                  <button type="button" onClick={removeOperationalAddress}>
                    <FiTrash
                      size={22}
                      style={{ color: "rgba(76, 142, 59, 1)" }}
                    />
                  </button> */}
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                id="operational"
                onClick={() => openModal("operational")}
                className={styles.addLocationButton}
              >
                <GoPlusCircle size={"24"} /> ADD ADDRESS
              </button>
              <AddAddressMap
                onSubmitAddress={(data) => addArray("operationalAddress", data)}
                isOpen={modalIsOpen.operational}
                onClose={() => closeModal("operational")}
                center={center}
              />
            </>
          )}
        </div>
        <div className={styles.formSection}>
          <label htmlFor="oilContainer">Oil Container Location: </label>
          <div className={styles.informSection}>

            <button
              type="button"
              id="oilContainer"
              onClick={() => openModal("oilContainer")}
              className={styles.addLocationButton}
            >
              <GoPlusCircle size={"24"} /> ADD LOCATION
            </button>
            <AddPointMap
              onSubmitAddress={(data) => addArray("oilContainer", data)}
              isOpen={modalIsOpen.oilContainer}
              onClose={() => closeModal("oilContainer")}
              center={operationalAddressCenter}
              type={"Oil"}
              typeOfButton={"LOCATION"}
              oprId={operationalAddress?.Id}
            />
            {otherAddress.map(
              (item, index) =>
                item.Type == 1 && (
                  <div
                    key={`oilContainer-${index}`}
                    className={styles.fakeInput}
                  >
                    {item.Name}, {item.Lat},{" "}
                    {item.Long}
                    <div className={styles.inputIconButton}>
                      <button type="button">
                        <LiaEdit
                          size={26}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeField("oilContainer", index)}
                      >
                        <FiTrash
                          size={22}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor="greaseTrap">Grease Trap Location: </label>
          <div className={styles.informSection}>

            <button
              type="button"
              id="greaseTrap"
              onClick={() => openModal("greaseTrap")}
              className={styles.addLocationButton}
            >
              <GoPlusCircle size={"24"} /> ADD LOCATION
            </button>
            <AddPointMap
              onSubmitAddress={(data) => addArray("greaseTrap", data)}
              isOpen={modalIsOpen.greaseTrap}
              onClose={() => closeModal("greaseTrap")}
              center={operationalAddressCenter}
              type={"Grease Trap"}
              typeOfButton={"LOCATION"}
              oprId={operationalAddress?.Id}
            />
            {otherAddress.map(
              (item, index) =>
                item.Type == 2 && (
                  <div
                    key={`oilContainer-${index}`}
                    className={styles.fakeInput}
                  >
                    {item.Name}, {item.Lat},{" "}
                    {item.Long}
                    <div className={styles.inputIconButton}>
                      <button type="button">
                        <LiaEdit
                          size={26}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeField("oilContainer", index)}
                      >
                        <FiTrash
                          size={22}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <div className={styles.buttonLine}>
          <button type="button" onClick={onBack}>
            Back
          </button>
          <NextButton onClick={onSubmit} />
        </div>
      </div>
    </>
  );
};
