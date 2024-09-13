"use client"
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FiTrash } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";
import AddAddressMap from '@/components/mapsForm/addAdressMap';
import AddPointMap from '@/components/mapsForm/addPointMap';
import SignUpButtons, { EditProfileButtons } from "../signUpButtons/signUpButtons"
import React, { useEffect, useState } from 'react';
import PhotoUpload from "../photoUpload/photoUpload";
import styles from "../profileEditForm/profileEditForm.module.css"
import { getCompany } from '@/data/api/register/company/get';
import { CompanyEntity } from '../../../domain/entity/company_entity';
import { StateStatus, StateStatusExtension } from '@/shared/state/state_status';
import { CgSpinner } from 'react-icons/cg';
import { RotatingLines, TailSpin } from 'react-loader-spinner';
import { OperationalAddressEntity } from '@/domain/entity/operational_address_entity';
import { mapLocationCompanyEntityToCommand } from '@/domain/mapper/location_comapny_mapper';
import { EditProfileCommand } from '@/domain/command/edit_profile_command';
import { editCompany } from '@/data/api/register/company/edit';
import { useLoading } from '@/components/loading/loading_context';
import { getAllOperationalAddress } from '@/data/api/dashboard/operationalAddress/get_all';

const ProfileEditForm = () => {

  const [company, setCompanyEntity] = useState<CompanyEntity>(null);
  const [state, setState] = useState<StateStatus>(StateStatus.Initial);
  const [stateLocation, setStateLocation] = useState<StateStatus>(StateStatus.Initial);
  const [operationalAddress, setOperationalAddress] = useState<OperationalAddressEntity[]>([null]);
  const [openEditOtherAddressModal, setOpenEditOtherAddressModal] = useState<number>(null);
  const { setLoading } = useLoading();

  var initialEditData = {
    companyName: company?.CompanyName,
    primaryFirstName: company?.PrimaryFirstName,
    primaryLastName: company?.PrimaryLastName,
    phone: company?.PrimaryPhonNumber,
    email: company?.BusinessEmail,
    position: company?.Position,
    secondaryFirstName: company?.SecondaryFirstName,
    secondaryLastName: company?.SecondaryLastName,
    secondaryPhone: company?.SecondaryPhoneNumber,

    addresses: operationalAddress || null
  };


  useEffect(() => {
    fetchCompany();
    fetchLocation();

  }, []);

  async function fetchCompany() {
    var result = await getCompany();
    result.fold(
      (error) => {
      },
      (data) => {
        setValue("phone", data.PrimaryPhonNumber);
        setValue("secondaryPhone", data.SecondaryPhoneNumber);
        setCompanyEntity(data)
        setState(StateStatus.Success)

      }
    );
  }

  async function fetchLocation() {
    setStateLocation(StateStatus.Loading)
    var result = await getAllOperationalAddress();
    result.fold(
      (error) => {
      },
      (data) => {
        setOperationalAddress(data)
        setStateLocation(StateStatus.Success)
      }
    );
  }


  const center = {
    lat: 34.063473,
    lng: -118.242753
  };

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    defaultValues: initialEditData
  });

  const [data, setData] = useState(initialEditData);
  const [modalIsOpen, setModalIsOpen] = useState(initialEditData.addresses.map(() => ({ operational: false, oilContainer: false, greaseTrap: false })));

  const [modalIsOpenNew, setModalIsOpenNew] = useState({
    operational: false,
    oilContainer: false,
    greaseTrap: false,
  });


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


  const openModalNew = (type) => {
    setModalIsOpenNew((prevState) => ({ ...prevState, [type]: true }));
  };
  const closeModalNew = (type) => {
    setModalIsOpenNew((prevState) => ({ ...prevState, [type]: false }));
  };

  const addArray = (index, field, newItem) => {

  };





  const removeField = (groupIndex, field, item) => {

  };

  const removeOperationalAddress = (index) => {
    // setData((prevData) => {
    //   const updatedAddresses = [...prevData.addresses];
    //   updatedAddresses[index].operationalAddress = [];
    //   return {
    //     ...prevData,
    //     addresses: updatedAddresses
    //   };
    // });
  };

  const getOperationalCenter = (index) => {
    const operationalAddressSet = initialEditData.addresses[index];
    return { lat: operationalAddressSet.Lat, lng: operationalAddressSet.Long };

  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      var command = new EditProfileCommand(
        data.companyName,
        data.primaryFirstName,
        data.primaryLastName,
        data.phone,
        data.position,
        data.secondaryFirstName,
        data.secondaryLastName,
        data.secondaryPhone
      );

      var result = await editCompany(command);

      result.fold(
        (error) => {
        },
        (data) => {
          setCompanyEntity(data)

        }
      );
    } finally {
      setLoading(false);
    }

  };


  const sanitizePhoneNumber = (value) => {
    return value.replace(/\D/g, "");  // Removes all non-digit characters
  };

  return (
    <>
      {(StateStatusExtension.from(state).isSuccess()) ?
        <div className={styles.container}>
          <PhotoUpload />
          <h3>Basic Information</h3>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formSection}>
              <label htmlFor="companyName">Company name: </label>
              <input
                type="text"
                id="companyName"
                defaultValue={initialEditData.companyName}
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
                  id='primaryFirstName'
                  className={`${styles.formInput} ${errors.primaryFirstName && styles.inputError}`}
                  defaultValue={initialEditData.primaryFirstName}
                  type="text"
                  placeholder="First Name"
                  {...register("primaryFirstName", { required: true })}
                />
                <input
                  id='primaryLastName'
                  className={`${styles.formInput} ${errors.primaryLastName && styles.inputError}`}
                  defaultValue={initialEditData.primaryLastName}
                  type="text"
                  placeholder="Last Name"
                  {...register("primaryLastName", { required: true })}
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <label htmlFor='phoneNumber'>Contact Phone Number: </label>
              <Controller
                name="phone"
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
                    className={errors.phone ? styles.numberInputError : styles.numberInput}
                    defaultCountry="US"
                    placeholder="Enter phone number"
                    onChange={(value) => field.onChange(value)}
                    maxLength={14}
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
                className={`${styles.disableInput} ${errors.email && styles.inputError}`}
                defaultValue={initialEditData.email}
                // name="email"
                readOnly={true}
                disabled={true}
                autoComplete='email'
              // {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
            </div>

            <div className={styles.formSection}>
              <label htmlFor="position">Position: </label>
              <input
                type="text"
                id="position"
                className={`${styles.formInput} ${errors.position && styles.inputError}`}
                defaultValue={initialEditData.position}
                placeholder="Position"
                name="position"
                {...register('position', { required: true })}
              />
            </div>

            <div className={styles.formSection}>
              <label htmlFor='secondContactPerson'>Secondary contact person: </label>
              <div className={styles.personInput}>
                <input
                  id='secondaryFirstName'
                  className={`${styles.formInput} ${errors.secondaryFirstName && styles.inputError}`}
                  defaultValue={initialEditData.secondaryFirstName}
                  type="text"
                  placeholder="First Name"
                  {...register("secondaryFirstName", { required: true })}
                />
                <input
                  id='secondaryLastName'
                  className={`${styles.formInput} ${errors.secondaryLastName && styles.inputError}`}
                  defaultValue={initialEditData.secondaryLastName}
                  type="text"
                  placeholder="Last Name"
                  {...register("secondaryLastName", { required: true })}
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <label htmlFor='secondaryPhone'>Secondary phone number: </label>
              <Controller
                name="secondaryPhone"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!value || value.length == 0) {
                      return null;
                    }
                    const sanitizedValue = sanitizePhoneNumber(value);
                    return sanitizedValue.length >= 10 || "Phone number must be 10 digits";
                  },
                }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    className={errors.secondaryPhone ? styles.numberInputError : styles.numberInput}
                    defaultCountry="US"
                    placeholder="Enter secondary phone number"
                    onChange={(value) => field.onChange(value)}
                    maxLength={14}
                  />
                )}
              />
            </div>

            <h3>Professional Information</h3>
            {(StateStatusExtension.from(stateLocation).isSuccess()) && initialEditData.addresses.map((operationalAddress, groupIndex) => (
              <React.Fragment key={`address-group-${groupIndex}`}>
                <p>{groupIndex + 1} Address: </p>
                <div className={styles.formSection}>
                  <label htmlFor={`operational-${groupIndex}`}>Operational address: </label>
                  <div className={styles.informSection}>
                    <div className={styles.fakeInput}>
                      {operationalAddress.Address}
                      <div className={styles.inputIconButton}>
                        <button type="button">
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
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.formSection}>
                  <label htmlFor="oilContainer">Oil Container Location: </label>
                  <div className={styles.informSection}>


                    {operationalAddress.LocationCompany?.map(
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
                                  onClick={() => { setOpenEditOtherAddressModal(item.Id) }}
                                  size={26}
                                  style={{ color: "rgba(76, 142, 59, 1)" }}
                                />
                              </button>
                              <button
                                type="button"
                                onClick={() => { }}
                              >
                                <FiTrash
                                  size={22}
                                  style={{ color: "rgba(76, 142, 59, 1)" }}
                                />
                              </button>
                            </div>
                            <AddPointMap
                              onSubmitAddress={(data) => { fetchLocation(); }}
                              isOpen={openEditOtherAddressModal == item?.Id}
                              onClose={() => { setOpenEditOtherAddressModal(null) }}
                              center={getOperationalCenter(groupIndex)}
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
                      id={`oilContainer-${groupIndex}`}
                      onClick={() => { openModalNew('oilContainer') }}
                      className={styles.addLocationButton}
                    > <GoPlusCircle size={"24"} /> ADD LOCATION</button>
                    <AddPointMap
                      onSubmitAddress={(data) => { fetchLocation(); }}
                      isOpen={modalIsOpenNew.oilContainer}
                      onClose={() => { closeModalNew('oilContainer') }}
                      center={getOperationalCenter(groupIndex)}
                      type={"Oil"}
                      typeOfButton={"LOCATION"}
                      oprId={operationalAddress?.Id}
                    />
                  </div></div>




                <div className={styles.formSection}>
                  <label htmlFor={`greaseTrap-${groupIndex}`}>Grease Trap Location: </label>
                  <div className={styles.informSection}>


                    {operationalAddress.LocationCompany?.map(
                      (item, index) =>
                        item.Type == 2 && (
                          <div
                            key={`greaseTrap-${index}`}
                            className={styles.fakeInput}
                          >
                            {item.Name}, {item.Lat},{" "}
                            {item.Long}
                            <div className={styles.inputIconButton}>
                              <button onClick={() => {
                                setOpenEditOtherAddressModal(item.Id)
                              }} type="button">
                                <LiaEdit
                                  size={26}
                                  style={{ color: "rgba(76, 142, 59, 1)" }}
                                />
                              </button>
                              <button
                                type="button"

                              >
                                <FiTrash
                                  size={22}
                                  style={{ color: "rgba(76, 142, 59, 1)" }}
                                />
                              </button>
                            </div>
                            <AddPointMap
                              onSubmitAddress={(data) => { fetchLocation(); }}
                              isOpen={openEditOtherAddressModal == item?.Id}
                              onClose={() => { setOpenEditOtherAddressModal(null) }}
                              center={getOperationalCenter(groupIndex)}
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
                      id={`greaseTrap-${groupIndex}`}
                      onClick={() => {
                        openModalNew('greaseTrap')
                      }}
                      className={styles.addLocationButton}
                    >
                      <GoPlusCircle size={"24"} /> ADD LOCATION
                    </button>
                    <AddPointMap
                      onSubmitAddress={(data) => { fetchLocation(); }}
                      isOpen={modalIsOpenNew.greaseTrap}
                      onClose={() => { closeModalNew('greaseTrap') }}
                      center={getOperationalCenter(groupIndex)}
                      type={"Grease Trap"}
                      typeOfButton={"LOCATION"}
                      oprId={operationalAddress?.Id}
                    />
                  </div></div>





              </React.Fragment>
            ))}
            <EditProfileButtons nameOfButton={"Save"} status={"save"} iconOfButton={null} />
            {/* <button type="submit">Submit</button> */}
          </form>
        </div> : <div>
          <TailSpin
            visible={true}
            width="40"
            strokeWidth="5"
            ariaLabel="rotating-lines-loading"
          /></div>}
    </>
  );
};

export default ProfileEditForm;
