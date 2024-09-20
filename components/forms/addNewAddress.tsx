"use client";
import {
  useFormContext,
} from "react-hook-form";
import { useState, useEffect } from "react";
import React from "react";
import { GoPlusCircle } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import AddAddressMap from "@/components/mapsForm/addAdressMap";
import { OperationalAddressEntity } from "@/domain/entity/operational_address_entity";
import { LocationCompanyEntity } from "@/domain/entity/location_company_entity";
import { getOtherCompanyLocation } from "@/data/api/register/otherCompanyLocation/get";
import { getOperationalAddress } from "@/data/api/register/operationalAddress/get";
import { OtherCompanyLocationCommand } from "@/domain/command/other_company_location_command";
import { mapLocationCompanyEntityToCommand } from "@/domain/mapper/location_comapny_mapper";
import { deleteOperationalAddress } from "@/data/api/dashboard/operationalAddress/delete";
import { deleteOtherAddressApi } from "@/data/api/dashboard/other_address/delete";
import { useLoading } from "../loading/loading_context";
import styles from "./addNewAddress.module.css";
import AddPointMap from "../mapsForm/addPointMap";
import { NextButton } from "../login/NextButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DeleteButton from "../ui/delete_button";
import { init } from "next/dist/compiled/webpack/webpack";
import { APP_ROUTES } from "@/shared/route/app_route";
import { useAddress } from "../address/address_context";
type AddNewAddressFormProps = {
  entityModel?: OperationalAddressEntity | null;
};

export default function AddNewAddressForm(porp: AddNewAddressFormProps) {
  const [operationalAddress, setoperationalAddress] = useState<OperationalAddressEntity>(null);
  const [otherAddress, setotherAddress] = useState<LocationCompanyEntity[]>([]);
  const [otherAddressCommand, setotherAddressCommand] = useState<OtherCompanyLocationCommand>(null);
  const { isLoading, setLoading } = useLoading();
  const [openEditOtherAddressModal, setOpenEditOtherAddressModal] = useState<number>(null);
  const { back, refresh, push } = useRouter();
  const { refreshAdr } = useAddress();

  useEffect(() => {
    if (porp.entityModel != null) { init(porp.entityModel); }
  }, []);


  function init(model: OperationalAddressEntity) {
    setoperationalAddress(model);
    setotherCommand(model);
    getOtherAddress(model);
  }

  function setotherCommand(model: OperationalAddressEntity) {
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
    setotherAddressCommand(command);
  }

  async function getOtherAddress(oprAddress: OperationalAddressEntity) {
    try {
      setLoading(true);
      var result = await getOtherCompanyLocation(oprAddress?.Id);
      result.fold(
        (s) => {
        },
        (m) => {
          setotherAddress(m);
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


  const [modalIsOpen, setModalIsOpen] = useState({
    operational: false,
    oilContainer: false,
    greaseTrap: false,
  });

  const [myArray, setMyArray] = useState([]);

  const addArray = (key, data) => {
    if (key == "operationalAddress") {

      setoperationalAddress(data);
      getOtherAddress(data);
      setotherCommand(data);
    }
    else {
      getOtherAddress(operationalAddress);
    }

  };



  async function deleteOprAddress(params: number) {
    try {
      setLoading(true);
      var result = await deleteOperationalAddress(params);
      result.fold(
        (error) => {
          if (error.message)
            toast.success(error.message)
        },
        (data) => {
          if (data.Message)
            toast.success(data.Message)
          refreshAdr();
          back();
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteOtherAddress(params: number) {
    try {
      setLoading(true);
      var result = await deleteOtherAddressApi(params);
      result.fold(
        (error) => {
        },
        (data) => {
          getOtherAddress(operationalAddress);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  const openModal = (type) => {
    setModalIsOpen((prevState) => ({ ...prevState, [type]: true }));
  };
  const closeModal = (type) => {
    setModalIsOpen((prevState) => ({ ...prevState, [type]: false }));
  };
  const info = ["random", "infom"];
  const onSubmit = () => {
    refreshAdr();
    back();
  };

  const operationalAddressCenter = operationalAddress
    ? { lat: operationalAddress.Lat, lng: operationalAddress.Long }
    : center;



  return (
    <>
      {/* <Title title={"Professional Information"} /> */}
      <div className={styles.form}>
        <div className={styles.formSection}>
          <label htmlFor="operational">Operational address: </label>
          {operationalAddress ? (
            <div className={styles.informSection}>
              <div className={styles.fakeInput}>
                {operationalAddress.Address}
                <div className={styles.inputIconButton}>
                  <button type="button">
                    <LiaEdit
                      onClick={() => openModal("operational")}
                      size={26}
                      style={{ color: "rgba(76, 142, 59, 1)" }}
                    />
                  </button>
                  {/* <button type="button" onClick={() => deleteOprAddress(operationalAddress.Id)} >
                    <FiTrash
                      size={22}
                      style={{ color: "rgba(76, 142, 59, 1)" }}
                    />
                  </button> */}
                </div>
              </div>
              <AddAddressMap
                onSubmitAddress={(data) => {
                  setoperationalAddress(data);
                  setotherCommand(data);
                }}
                isOpen={modalIsOpen.operational}
                onClose={() => closeModal("operational")}
                center={{ lat: operationalAddress.Lat, lng: operationalAddress.Long }}
                model={operationalAddress}
              />
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
                center={operationalAddressCenter}
              />
            </>
          )}
        </div>
        <div className={styles.formSection}>
          <label htmlFor="oilContainer">Oil Container Location: </label>
          <div className={styles.informSection}>

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
                      <button type="button" onClick={() => { setOpenEditOtherAddressModal(item.Id) }}>
                        <LiaEdit
                          size={26}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteOtherAddress(item.Id)}
                      >
                        <FiTrash
                          size={22}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                    </div>
                    <AddPointMap
                      onSubmitAddress={(data) => { getOtherAddress(operationalAddress); }}
                      isOpen={openEditOtherAddressModal == item?.Id}
                      onClose={() => { setOpenEditOtherAddressModal(null) }}
                      center={{ lat: item.Lat, lng: item.Long }}
                      type={"Oil"}
                      typeOfButton={"LOCATION"}
                      oprId={operationalAddress?.Id}
                      model={mapLocationCompanyEntityToCommand(item)}
                      id={item.Id}
                    />
                  </div>
                )
            )}

            <button
              type="button"
              id="oilContainer"
              onClick={() => openModal("oilContainer")}
              className={styles.addLocationButton}
            >
              <GoPlusCircle size={"24"} /> ADD LOCATION
            </button>
            {otherAddressCommand && <AddPointMap
              onSubmitAddress={(data) => addArray("oilContainer", data)}
              isOpen={modalIsOpen.oilContainer}
              onClose={() => closeModal("oilContainer")}
              center={{ lat: otherAddressCommand.Lat, lng: otherAddressCommand.Long }}
              type={"Oil"}
              typeOfButton={"LOCATION"}
              model={otherAddressCommand}
              oprId={operationalAddress?.Id}
            />}
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor="greaseTrap">Grease Trap Location: </label>
          <div className={styles.informSection}>
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
                      <button type="button" onClick={() => { setOpenEditOtherAddressModal(item.Id) }}>
                        <LiaEdit
                          size={26}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteOtherAddress(item.Id)}
                      >
                        <FiTrash
                          size={22}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                    </div>
                    <AddPointMap
                      onSubmitAddress={(data) => { getOtherAddress(operationalAddress); }}
                      isOpen={openEditOtherAddressModal == item?.Id}
                      onClose={() => { setOpenEditOtherAddressModal(null) }}
                      center={{ lat: item.Lat, lng: item.Long }}
                      type={"Grease Trap"}
                      typeOfButton={"LOCATION"}
                      oprId={operationalAddress?.Id}
                      model={mapLocationCompanyEntityToCommand(item)}
                      id={item.Id}
                    />
                  </div>
                )
            )}

            <button
              type="button"
              id="greaseTrap"
              onClick={() => openModal("greaseTrap")}
              className={styles.addLocationButton}
            >
              <GoPlusCircle size={"24"} /> ADD LOCATION
            </button>
            {otherAddressCommand && <AddPointMap
              onSubmitAddress={(data) => addArray("greaseTrap", data)}
              isOpen={modalIsOpen.greaseTrap}
              onClose={() => closeModal("greaseTrap")}
              center={{ lat: otherAddressCommand.Lat, lng: otherAddressCommand.Long }}
              type={"Grease Trap"}
              typeOfButton={"LOCATION"}
              model={otherAddressCommand}
              oprId={operationalAddress?.Id}
            />}
          </div>
        </div>

        <div className={styles.buttonLine}>
          {(operationalAddress && <DeleteButton onClick={() => deleteOprAddress(operationalAddress.Id)} />)}
          <NextButton onClick={onSubmit} />
        </div>
      </div>
    </>
  );
}
