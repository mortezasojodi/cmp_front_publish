"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/components/forms/oilCollectionForm.module.css";
import Switch from "./switch/switch";
import { LiaEdit } from "react-icons/lia";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignUpButtons, { ButtonsForm } from "./signUpButtons/signUpButtons";
import { LuCalendar } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import CustomSelector from "./customSelect/customSelect";
import AddPointMap from "../mapsForm/addPointMap";
import CanselServiceForm from "./canselService/canselService";
import { FrequencyEnum } from "@/domain/enum/frequency_enum";
import CustomSelectorEnum from "./customSelect/enum_custom_selector";
import { ServiceAppointmentEntity } from "@/domain/entity/service_appointment_entity";
import { useAddress } from "../address/address_context";
import { OperationalAddressEntity } from "@/domain/entity/operational_address_entity";
import { OtherCompanyLocationCommand } from "@/domain/command/other_company_location_command";
import toast from "react-hot-toast";
import { addServiceAppointmentApi } from "@/data/api/service_appointment/add_service_appointment_api";
import { AddServiceAppointmentCommand } from "@/domain/command/service_appointment/add_service_appointment_command";
import { useLoading } from "../loading/loading_context";
import { deleteServiceAppointmentApi } from "@/data/api/service_appointment/delete_service_appointment_api";

type OilCollectionFormProps = {
  entityModel?: ServiceAppointmentEntity | null;
};

export default function OilCollectionForm(prop: OilCollectionFormProps) {
  const options = Object.entries(FrequencyEnum).filter(([key]) => isNaN(Number(key)))
  const { selectedAddresses, refreshAdr } = useAddress();

  const center = {
    lat: 32.733131,
    lng: -117.189472,
  };

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
  const ifCansel = true;
  const [openIsTermination, setIsTermination] = useState(false);
  const { setLoading } = useLoading();



  //in the future, when data is connected, the value will be transmitted globally via props
  useEffect(() => {
    setValue("startDate", new Date());
    setStartDate(new Date());
    if (selectedAddresses) {
      initData();
    }
  }, [ifCansel, setValue, selectedAddresses]);

  function initData() {
    if (prop.entityModel != null) {

      setValue("select", FrequencyEnum[prop.entityModel.FrequencyType]);
      setSelectedValue(FrequencyEnum[prop.entityModel.FrequencyType]);
      setValue("startDate", new Date(prop.entityModel.StartDate));
      setStartDate(new Date(prop.entityModel.StartDate));
    }
    setLocations(selectedAddresses.LocationCompany);
    setValue("locationCount", selectedAddresses.LocationCompany.length);
    setValue("location", selectedAddresses.LocationCompany);

  }


  const addLocation = async (type, data) => {
    await refreshAdr();
    setLocations(selectedAddresses.LocationCompany);

  };

  const removeLocation = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setValue("locationCount", newLocations.length);
    setLocations(newLocations);
    trigger("locationCount");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const { back, push } = useRouter();

  const onSubmit = (data) => {
    setValue("data", startDate);
    setValue("frequency", selectedValue);
    setValue("location", locations);
    console.log(data);
    setTimeout(() => {
      push("/dashboard/services", undefined);
    }, 3000);
  };

  const openMessege = () => {
    setIsTermination(true);
  };

  const closeMessege = () => {
    setIsTermination(false);
  };

  const onSubmitForm = (data) => {
    registerService(data);
  };


  async function registerService(data) {
    // try {
    //   var value = FrequencyEnum[selectedValue];
    //   setLoading(true);
    //   var command = new AddServiceAppointmentCommand(
    //     selectedAddresses.Id,
    //     "Cooking_Oil_Collection",
    //     startDate,
    //     Number(value)
    //   );
    //   var result = await addServiceAppointmentApi(command);
    //   result.fold(
    //     (error) => {
    //       toast.error(error.message);
    //     },
    //     (data) => {
    //       back();
    //     }
    //   );
    // } finally {
    //   setLoading(false);
    // }
  }


  async function cancelService(id: number) {
    try {
      setLoading(true);
      var result = await deleteServiceAppointmentApi(id);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (data) => {
          back();
        }
      );
    } finally {
      setLoading(false);
    }
  }

  function setotherCommand(model: OperationalAddressEntity): OtherCompanyLocationCommand {
    var command = new OtherCompanyLocationCommand(
      "",
      model.Lat,
      model.Long,
      "",
      "",
      model.FirstName,
      model.LastName,
      model.LocationPhone,
      model.Id,
      0,
    );
    return command;
  }

  return (
    <>
      <div className={styles.form} >
        <div className={styles.formSection}>
          <label htmlFor="frequency">Frequency:</label>
          <div
            className={`${styles.selector} ${errors.select && styles.inputError
              }`}
          >
            <Controller
              name="select"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelectorEnum
                  options={options}
                  select="frequency"
                  selectValue={(value) => {
                    setSelectedValue(value);
                    field.onChange(value);
                  }}
                  initialValue={selectedValue}
                />
              )}
            />
          </div>
        </div>
        <div className={`${styles.formSection} ${styles.labelTwoButtom}`}>
          <label htmlFor="pickupLocation">Pickup point:</label>
          <div className={styles.twoInputs}>
            {locations.map((item, index) => (
              <div key={index} className={styles.fakeInput}>
                <p>
                  {item.Name}, {item.Lat},{" "}
                  {item.Long}
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
              className={`${styles.dialogContainer} ${errors.locationCount && styles.inputError
                }`}
            >
              <button
                type="button"
                className={styles.addPointButton}
                onClick={openModal}
              >
                {" "}
                <GoPlusCircle size={"24"} /> ADD PICKUP POINT
              </button>
            </div>
          </div>
          <input
            id="pickupLocation"
            type="hidden"
            {...register("locationCount", { validate: (value) => value > 0 })}
          />
          {selectedAddresses &&
            <AddPointMap
              model={setotherCommand(selectedAddresses)}
              oprId={selectedAddresses?.Id}
              type={"Oil"}
              typeOfButton={"POINT"}
              onSubmitAddress={(data) => { addLocation("Location", data); }}
              isOpen={modalIsOpen}
              onClose={closeModal}
              center={center}
            />}
        </div>
        <div className={styles.formSection}>
          <label htmlFor="startDate">Start date:</label>
          <div
            className={`${styles.inputWithButton} ${errors.startDate && styles.inputError
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
        <div className={styles.agreementText}>
          <Switch active={true} onChange={() => { }} />{" "}
          <span>I agree with Terms and Conditions for this service</span>
        </div>
        {openIsTermination && (
          <CanselServiceForm
            onClose={closeMessege}
            isOpen={openIsTermination}
          />
        )}

        {prop.entityModel == null ?
          <ButtonsForm nameOfButton={"Save"} status={"save"} onClick={handleSubmit(onSubmitForm)} /> :
          <ButtonsForm nameOfButton={"Cancel Service"} status={"cancel"} onClick={() => cancelService(prop.entityModel.Id)} />}
      </div>
    </>
  );
}
