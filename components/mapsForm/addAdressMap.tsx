import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SearchBox } from "@/components/mapsForm/searchBox";
import { Loader } from "@googlemaps/js-api-loader";
import { GoPlusCircle } from "react-icons/go";
import styles from "./addAdressMap.module.css";
import Modal from "react-modal";
import CustomSelector from "../forms/customSelect/customSelect";
import { FiTrash } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { addOtherCompanyLocation } from "@/data/api/register/otherCompanyLocation/add";
import { OtherCompanyLocationCommand } from "@/domain/command/other_company_location_command";
import toast from "react-hot-toast";
import { OperationalAddressCommand } from "@/domain/command/operational_address_command";
import { addOperationalAddress } from "@/data/api/register/operationalAddress/add";
import { useLoading } from "../loading/loading_context";

const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "400px",
};



export default function addAdressMap({
  center,
  isOpen,
  onClose,
  onSubmitAddress,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty, dirtyFields },
    reset,
    watch,
  } = useForm();

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const { setLoading } = useLoading();

  const [selectedValue, setSelectedValue] = useState(null);

  const address = watch("address");
  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    version: "weekly",
    libraries: ["places"],
    id: "google-map-script",
  });

  useEffect(() => {
    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API:", error);
        setLoadError(error);
      });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      reset({
        address: "",
        latitude: "",
        longitude: "",
        crossStreet: "",
        county: "",
        phoneNumber: "",
        select: "",
        contactFirstName: "",
        contactLastName: "",
      });
    }
  }, [isOpen, reset]);

  const mapCenter =
    latitude && longitude
      ? { lat: parseFloat(latitude), lng: parseFloat(longitude) }
      : center;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitAddress = async (data) => {


    try {
      setLoading(true);
      // if (!data.address) {
      //   toast.error("Please fill the address correctly");
      //   return;
      // }

      var operationalAddressCommand = new OperationalAddressCommand(
        "", //Address: string,
        data.crossStreet, //CrossStreet: string,
        data.county, //County: string,
        data.phoneNumber, //LocationPhone: string,
        1, //BusinessId: number,
        data.contactFirstName, //FirstName: string,
        data.contactLastName, //LastName: string,
        0, //Lat: number,
        0 //Long: number
      );
      var result = await addOperationalAddress(operationalAddressCommand);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (res) => {
          setFormSubmitted(true);
          onSubmitAddress(data);
          console.log(data);
          onClose();
          reset();
          setFormSubmitted(false);
        }
      );

    } finally {
      setLoading(false);
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
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Add Operational Address"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(31, 34, 41, 0.8)",
          },
          content: {
            borderRadius: "10px",
          },
        }}
      >
        <div className={styles.title}>
          <h2>Add Operational address</h2>
          <button onClick={onClose}>
            <IoClose size={34} />
          </button>
        </div>
        <div className={styles.mapSection}>
          <SearchBox
            onSelectAddress={(address, latitude, longitude) => {
              setValue("address", address);
              setValue("latitude", latitude);
              setValue("longitude", longitude);
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
            {isAddressFilled && !isNaN(latitude) && !isNaN(longitude) && (
              <OverlayView
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <FaMapMarkerAlt size={24} />
              </OverlayView>
            )}
          </GoogleMap>
        </div>
        <form
          className={styles.dialogForm}
          onSubmit={handleSubmit(handleSubmitAddress)}
        >
          <label>Operational address:</label>
          {address ? (
            <div className={styles.fakeInput}>
              <p>{address}</p>
              <button type="button" onClick={() => setValue("address", "")}>
                <FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} />
              </button>
            </div>
          ) : (
            <div
              className={`${formSubmitted && !address ? styles.inputError : ""
                }`}
            >
              <SearchBox
                onSelectAddress={(address, latitude, longitude) => {
                  setValue("address", address);
                  setValue("latitude", latitude);
                  setValue("longitude", longitude);
                }}
                defaultValue=""
                loader={loader}
              />
            </div>
          )}
          <label className={styles.smallText}>Cross Street:</label>
          <input
            className={`${styles.formInput} ${errors.crossStreet && styles.inputError
              }`}
            type="text"
            placeholder="Cross street"
            {...register("crossStreet")}
          />
          <label className={styles.smallText}>County:</label>
          <input
            className={`${styles.formInput} ${errors.county && styles.inputError
              }`}
            type="text"
            placeholder="County"
            {...register("county")}
          />
          <label className={styles.smallText}>Location Phone:</label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                className={
                  errors.phoneNumber
                    ? styles.numberInputError
                    : styles.numberInput
                }
                defaultCountry="US"
                placeholder="Enter phone number"
                onChange={(value) => field.onChange(value)}
                maxLength={10}
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
                  initialValue={""}
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
              className={`${styles.formInput} ${errors.contactFirstName && styles.inputError
                }`}
              type="text"
              placeholder="First Name"
              {...register("contactFirstName", { required: true })}
            />
            <input
              className={`${styles.formInput} ${errors.contactLastName && styles.inputError
                }`}
              type="text"
              placeholder="Last Name"
              {...register("contactLastName", { required: true })}
            />
          </div>
          <div className={styles.submitButtons}>
            <button className={styles.cancel} type="button" onClick={onCancel}>
              Cansel
            </button>
            <button type="submit">
              Add ADDRESS <GoPlusCircle size={24} />
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
