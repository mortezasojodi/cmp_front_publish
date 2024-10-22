"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/components/forms/enrollServiceForm.module.css";
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
import { getServiceAppointmentApi } from "@/data/api/service_appointment/get_service_appointment_api";
import { useLoading } from "../loading/loading_context";
import { useAddress } from "../address/address_context";
import toast from "react-hot-toast";
import { ServiceAppointmentEntity } from "@/domain/entity/service_appointment_entity";
import { ButtonsForm } from "./signUpButtons/signUpButtons";
import { deleteServiceAppointmentApi } from "@/data/api/service_appointment/delete_service_appointment_api";
import { OperationalAddressEntity } from "@/domain/entity/operational_address_entity";
import { OtherCompanyLocationCommand } from "@/domain/command/other_company_location_command";
import { deleteOtherAddressApi } from "@/data/api/dashboard/other_address/delete";
import { ServicePriceEntity } from "@/domain/entity/service_price_entity";
import { getAllServicePriceApi } from "@/data/api/service/get_all_service_price_api";
import ServicePriceDropDown from "./customSelect/service_price_dropdown";
import { CreateInvoiceApi } from "@/data/api/invoice/create_invoice_api";

import ShowInvoice from "@/components/Invoice/invoice_modal";
import { InvoiceEntity } from "@/domain/entity/invoice_entity";
import { addShoppingCard } from "@/data/api/shopping_card/add";
import { AddShoppingCardCommand } from "@/domain/command/shopping_card/add";
import { useCard } from "../context_api/shopping_card_context";

type EnrollServiceFormProps = {
    Id?: number | null;
    // type: string,
    // serviceTypeId: string,
    serviceId: string
};

const EnrollServiceForm = (prop: EnrollServiceFormProps) => {
    const center = {
        lat: 32.733131,
        lng: -117.189472,
    };
    const [servicesPrice, setservicesPrice] = useState<ServicePriceEntity[]>([]);


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
    const [invoiceModalIsOpen, setInvoiceModalIsOpen] = useState(false);
    const [invoiceModel, setInvoiceModel] = useState<InvoiceEntity | null>(null);

    const [locations, setLocations] = useState([]);
    const [selectedValue, setSelectedValue] = useState<ServicePriceEntity | null>(null);
    const { setLoading } = useLoading();
    const { selectedAddresses, refreshAdr } = useAddress();
    const { back, push } = useRouter();
    var { itemsCard, refreshCard } = useCard();
    const [model, setModel] = useState<ServiceAppointmentEntity>(null);

    const addLocation = (type, data) => {
        refreshAdr();
    };

    const removeLocation = (id) => {
        deleteOtherAddress(id);
    };

    useEffect(() => {
        setValue("locationCount", locations.length);
        setValue("location", locations);
        if (selectedAddresses) {
            fetchServicePrice();

        }
    }, [selectedAddresses]);


    async function fetchServicePrice() {
        try {
            setLoading(true);
            var result = await getAllServicePriceApi(prop.serviceId);
            result.fold(
                (error) => {
                },
                (data) => {
                    setservicesPrice(data);
                    if (prop.Id) {
                        getById(prop.Id, data);
                    } else {
                        initData(null, data);
                    }
                }
            );
        } finally {
            setLoading(false);
        }
    }


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

    async function getById(Id: number, services: ServicePriceEntity[]) {
        try {
            setLoading(true);
            var result = await getServiceAppointmentApi(Id);
            result.fold(
                (error) => {
                    toast.error(error.message);
                },
                (data) => {
                    setModel(data);
                    initData(data, services);
                }
            );
        } finally {
            setLoading(false);
        }
    }


    async function registerService(data) {
        try {
            setLoading(true);
            var command = new AddShoppingCardCommand(
                selectedAddresses.Id,
                // prop.type,
                selectedValue._id,
                startDate,
                (selectedValue.name),
                prop.serviceId,
            );
            var result = await addShoppingCard(command);
            result.fold(
                (error) => {
                    toast.error(error.message);
                },
                (data) => {
                    refreshCard();
                    back();
                }
            );
        } finally {
            setLoading(false);
        }
    }

    const openInvoice = (data) => {
        setInvoiceModel(data);
        setInvoiceModalIsOpen(true);
    };
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


    function initData(entityModel: ServiceAppointmentEntity, services: ServicePriceEntity[]) {
        if (entityModel != null) {

            setValue("select", services.find(p => p._id === entityModel.ServicePriceId));
            setSelectedValue(services.find(p => p._id === entityModel.ServicePriceId));
            setValue("startDate", new Date(entityModel.StartDate));
            setStartDate(new Date(entityModel.StartDate));
        }
        setLocations(selectedAddresses.LocationCompany);
        setValue("locationCount", selectedAddresses.LocationCompany.length);
        setValue("location", selectedAddresses.LocationCompany);
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

    async function deleteOtherAddress(params: number) {
        try {
            setLoading(true);
            var result = await deleteOtherAddressApi(params);
            result.fold(
                (error) => {
                },
                (data) => {
                    refreshAdr();
                }
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <ShowInvoice
                isOpen={invoiceModalIsOpen}
                onClose={() => { setInvoiceModalIsOpen(false) }}
                model={invoiceModel}
            />
            <div className={styles.form} >
                <div className={styles.formSection}>
                    <label className={styles.label} htmlFor="frequency">
                        Frequency:
                    </label>
                    <div
                        className={`${styles.selector} ${errors.select && styles.inputError
                            }`}
                    >
                        <Controller
                            name="select"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                servicesPrice && <ServicePriceDropDown
                                    initialValue={selectedValue}
                                    options={servicesPrice}
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
                                    {item.Name}, {item.Lat},{" "}
                                    {item.Long}
                                </p>
                                <div className={styles.inputIconButton}>
                                    {/* <button type="button">
                                        <LiaEdit
                                            size={26}
                                            style={{ color: "rgba(76, 142, 59, 1)" }}
                                        />
                                    </button> */}
                                    <button type="button" onClick={() => removeLocation(item.Id)}>
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
                                <GoPlusCircle size={"24"} />
                                ADD PICKUP POINT
                            </button>
                        </div>
                    </div>
                    <input
                        type="hidden"
                        {...register("locationCount", { validate: (value) => value > 0 })}
                    />
                    {selectedAddresses && <AddPointMap
                        type={"Grease Trap"}
                        onSubmitAddress={(data) => addLocation("Location", data)}
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                        center={center}
                        typeOfButton={"Point"}
                        model={setotherCommand(selectedAddresses)}
                        oprId={selectedAddresses?.Id}
                    />}
                </div>
                <div className={styles.formSection}>
                    <label className={styles.label} htmlFor="startDate">
                        Start date:
                    </label>
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
                    <div className={styles.textWrapper}>
                        <Switch active={true} onChange={() => { }} />{" "}
                        <span>I agree with Terms and Conditions for this service</span>
                    </div>
                    {selectedValue && (
                        <div className={styles.price}>
                            ${selectedValue.amount} <span className={styles.currency}> / per service</span>
                        </div>
                    )}
                </div>

                {prop.Id == null ?
                    <ButtonsForm nameOfButton={"Save"} status={"save"} onClick={handleSubmit(registerService)} /> :
                    <ButtonsForm nameOfButton={"Cancel Service"} status={"cancel"} onClick={() => cancelService(prop.Id)} />}
            </div>
        </>
    );
};

export default EnrollServiceForm;
