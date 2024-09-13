"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/components/forms/greaseTrapForm.module.css";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { LuCalendar } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { IoLogInOutline } from "react-icons/io5";

import Switch from "./switch/switch";
import CustomSelector from "./customSelect/customSelect";
import AddPointMap from "../mapsForm/addPointMap";

const GreaseTrapForm = () => {
  const center = {
    lat: 32.733131,
    lng: -117.189472,
  };

  const options = [
    "1x yr",
    "2x yr",
    "3x yr",
    "4x yr",
    "6x yr",
    "8x yr",
    "12x yr",
    "24x yr",
    "26x yr",
    "52x yr",
  ];
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    trigger,
  } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const addLocation = (type, data) => {
    const newLocations = [...locations, { type, data }];
    setValue("locationCount", newLocations.length);
    setLocations(newLocations);
    trigger("locationCount");
  };

  const removeLocation = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setValue("locationCount", newLocations.length);
    setLocations(newLocations);
    trigger("locationCount");
  };

  useEffect(() => {
    setValue("locationCount", locations.length);
    setValue("location", locations);
  }, [locations, setValue]);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const openModal = () => {
    console.log("im here");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { push } = useRouter();

  const onSubmit = (data) => {
    setValue("data", startDate);
    setValue("frequency", selectedValue);
    setValue("location", locations);
    console.log(data);
    setTimeout(() => {
      push("/dashboard/services", undefined, { shallow: true });
    }, 3000);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formSection}>
          <label className={styles.label} htmlFor="frequency">
            Frequency:
          </label>
          <div
            className={`${styles.selector} ${
              errors.select && styles.inputError
            }`}
          >
            <Controller
              name="select"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelector
                  options={options}
                  select={"frequency"}
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
          <label htmlFor="pickupLocation" className={styles.label}>
            Pickup point:
          </label>
          <div className={styles.column}>
            {locations.map((item, index) => (
              <div key={index} className={styles.fakeInput}>
                <p>
                  {item.data.locationName}, {item.data.lat}, {item.data.lng}
                </p>
                <div className={styles.inputIconButton}>
                  <button type="button">
                    <LiaEdit
                      size={26}
                      style={{ color: "rgba(76, 142, 59, 1)" }}
                    />
                  </button>
                  <button type="button" onClick={() => removeLocation(index)}>
                    <FiTrash
                      size={22}
                      style={{ color: "rgba(76, 142, 59, 1)" }}
                    />
                  </button>
                </div>
              </div>
            ))}
            <div
              className={`${styles.dialogContainer} ${
                errors.locationCount && styles.inputError
              }`}
            >
              <button
                type="button"
                className={styles.addPointButton}
                onClick={openModal}
              >
                {" "}
                <GoPlusCircle size={"24"} />
                ADD PICKUP POINT
              </button>
            </div>
          </div>
          <input
            type="hidden"
            {...register("locationCount", { validate: (value) => value > 0 })}
          />
          <AddPointMap
            type={"Grease Trap"}
            onSubmitAddress={(data) => addLocation("Location", data)}
            isOpen={modalIsOpen}
            onClose={closeModal}
            center={center}
            typeOfButton={"Point"}
          />
        </div>
        <div className={styles.formSection}>
          <label className={styles.label} htmlFor="startDate">
            Start date:
          </label>
          <div
            className={`${styles.inputWithButton} ${
              errors.startDate && styles.inputError
            }`}
          >
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Start date is required" }}
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
              <button
                type="button"
                onClick={() => document.getElementById("startDate").focus()}
              >
                <LuCalendar size={24} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor="comments" className={styles.label}>
            {" "}
            Location Comments:
          </label>
          <textarea
            id="comments"
            className={`${styles.textareaInput} ${
              errors.comments && styles.inputError
            }`}
            placeholder="Enter text"
            rows="4"
            {...register("comments", { required: true })}
          />
        </div>
        <div className={styles.agreementText}>
          <Switch active={true} />{" "}
          <span>I agree with Terms and Conditions for this service</span>
        </div>
        <div className={styles.submitButtons}>
          <Link className={styles.cancel} href="/dashboard/services">
            Cansel
          </Link>
          <button type="submit">
            sign up <IoLogInOutline size={24} />
          </button>
        </div>
      </form>
    </>
  );
};

export default GreaseTrapForm;
