import React, { useState, useEffect, useCallback } from "react";
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
import { OperationalAddressEntity } from "@/domain/entity/operational_address_entity";
import { editOperationalAddress } from "@/data/api/register/operationalAddress/edit";

const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "400px",
};


interface AddPointMapProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAddress: (data: OperationalAddressEntity) => void;
  center: { lat: number; lng: number };
  model?: OperationalAddressEntity,
}
const addAdressMap: React.FC<AddPointMapProps> = ({
  center,
  isOpen,
  onClose,
  onSubmitAddress,
  model
}) => {
  const options = ["Restaurant", "Food processing company", "Other type"];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty, dirtyFields },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      address: model?.Address,
      latitude: model?.Lat,
      longitude: model?.Long,
      crossStreet: model?.CrossStreet,
      county: model?.County,
      phoneNumber: model?.LocationPhone,
      select: options[model != null ? (model?.BusinessId - 1) : 0],
      contactFirstName: model?.FirstName,
      contactLastName: model?.LastName,
    }
  });

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
        latitude: 0,
        longitude: 0,
        crossStreet: "",
        county: "",
        phoneNumber: "",
        select: "",
        contactFirstName: "",
        contactLastName: "",
      });
    } else {
      reset({
        address: model?.Address,
        latitude: model?.Lat,
        longitude: model?.Long,
        crossStreet: model?.CrossStreet,
        county: model?.County,
        phoneNumber: model?.LocationPhone,
        select: options[model != null ? (model?.BusinessId - 1) : 0],
        contactFirstName: model?.FirstName,
        contactLastName: model?.LastName,
      });
      setSelectedValue(options[model != null ? (model?.BusinessId - 1) : 0])
      if (model == null) {
        setCurrentLocation();
      }
    }
  }, [isOpen, reset]);



  function setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue("latitude", latitude);
          setValue("longitude", longitude);
          setMapCenter({ lat: latitude, lng: longitude })
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  const [mapCenter, setMapCenter] = useState({ lat: latitude ? (latitude) : center.lat, lng: longitude ? (longitude) : center.lng });

  const [formSubmitted, setFormSubmitted] = useState(false);

  function selecType(params: string): number {
    switch (params) {
      case "Restaurant":
        return 1;
      case "Food processing company":
        return 2;
      default:
        return 3;
    }
  }



  const handleSubmitAddress = async (data) => {
    if (model != null) {
      edit(data);
    } else {
      add(data);
    }
  };


  async function add(data) {
    try {
      setLoading(true);
      if (!data.address) {
        toast.error("Please fill the address correctly");
        return;
      }
      var operationalAddressCommand = new OperationalAddressCommand(
        data.address,
        data.crossStreet,
        data.county,
        data.phoneNumber,
        selecType(data.select),
        data.contactFirstName,
        data.contactLastName,
        mapCenter.lat,
        mapCenter.lng
      );
      var result = await addOperationalAddress(operationalAddressCommand);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (res) => {
          onSuccess(data, res);
        }
      );
    } finally {
      setLoading(false);
    }
  }


  async function edit(data) {
    try {
      setLoading(true);
      if (!data.address) {
        toast.error("Please fill the address correctly");
      }
      var operationalAddressCommand = new OperationalAddressCommand(
        data.address,
        data.crossStreet,
        data.county,
        data.phoneNumber,
        selecType(data.select),
        data.contactFirstName,
        data.contactLastName,
        mapCenter.lat,
        mapCenter.lng
      );

      var result = await editOperationalAddress(operationalAddressCommand, model!.Id);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (res) => {
          onSuccess(data, res);
        }
      );
    } finally {
      setLoading(false);
    }
  }


  function onSuccess(data, res) {
    setFormSubmitted(true);
    onSubmitAddress(res);
    onClose();
    reset();
    setFormSubmitted(false);
  }

  const onCancel = () => {
    onClose();
    reset();
    setFormSubmitted(false);
  };


  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setValue("latitude", lat);
    setValue("longitude", lng);
  }, []);


  const isAddressFilled = !!address;

  const sanitizePhoneNumber = (value) => {
    return value.replace(/\D/g, "");  // Removes all non-digit characters
  };

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
              setMapCenter({ lat: latitude, lng: longitude })
            }}
            defaultValue=""
            loader={loader}
          />
          <GoogleMap
            id="google-map"
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={12}
            onClick={handleMapClick}
          >
            {!isNaN(latitude) && !isNaN(longitude) && (
              <OverlayView
                position={{
                  lat: (latitude),
                  lng: (longitude),
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
                  setMapCenter({ lat: latitude, lng: longitude })
                }}
                defaultValue={model?.Address}
                loader={loader}
              />
            </div>
          )}
          <label className={styles.smallText}>Cross Street:</label>
          <input
            className={`${styles.formInput} ${errors.crossStreet && styles.inputError
              }`}
            type="text"
            defaultValue={model?.CrossStreet}
            placeholder="Cross street"
            {...register("crossStreet")}
          />
          <label className={styles.smallText}>County:</label>
          <input
            className={`${styles.formInput} ${errors.county && styles.inputError
              }`}
            type="text"
            defaultValue={model?.County}
            placeholder="County"
            {...register("county")}
          />
          <label className={styles.smallText}>Location Phone:</label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: true, validate: (value) => {
                const sanitizedValue = sanitizePhoneNumber(value);
                return sanitizedValue.length >= 10 || "Phone number must be 10 digits";
              },
            }}
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
                maxLength={14}
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
                  initialValue={selectedValue ?? ""}
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
              {model == null ? "Add ADDRESS" : "Update ADDRESS"} <GoPlusCircle size={24} />
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default React.memo(addAdressMap);