import React, { useState } from "react";
import styles from "./canselService.module.css";
import { AiOutlineStop } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { useRouter } from "next/navigation";

const CanselServiceForm = ({ isOpen, onClose }) => {
  const options = [
    "Cost Concerns",
    "Change in Plans",
    "Service Performance",
    "Other",
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setError(""); // Сбросить ошибку при выборе варианта
  };

  const handleNextStep = () => {
    if (selectedOption) {
      setCurrentStep(2);
    } else {
      setError("Please select an option");
    }
  };

  const closeModal = () => {
    onClose();
  };

  const { push } = useRouter();
  const goHome = () => {
    setTimeout(() => {
      push("/dashboard/services", undefined, { shallow: true });
    }, 1000);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {currentStep === 1 ? (
            <>
              <div className={styles.inform}>
                <div className={styles.header}>
                  <div className={styles.title}>
                    <h2>Reason for termination</h2>
                    <p>Choose one of the options below</p>
                  </div>
                  <button onClick={onClose}>
                    <IoClose size={24} />
                  </button>
                </div>
                <div className={styles.cancelForm}>
                  {options.map((option, index) => (
                    <label
                      className={`${styles.radioButtonLabel} ${
                        selectedOption === option && styles.selectedOption
                      }`}
                      key={index}
                    >
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        id={`option-${index}`}
                        checked={selectedOption === option}
                        onChange={handleChange}
                      />
                      {option}
                    </label>
                  ))}
                  {error && <p className={styles.error}>{error}</p>}
                </div>
              </div>
              <div className={styles.submitButtons}>
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className={styles.canselService}
                  type="button"
                  onClick={handleNextStep}
                >
                  {" "}
                  Cancel Service <AiOutlineStop size={22} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.inform}>
                <svg
                  width="112"
                  height="112"
                  viewBox="0 0 112 112"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="56"
                    cy="56"
                    r="56"
                    fill="#D57300"
                    fill-opacity="0.1"
                  />
                  <circle cx="56" cy="56" r="36" fill="#D57300" />
                  <path
                    d="M41 56L51 66L71 46"
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2>The Service has been terminated</h2>
              </div>

              <button className={styles.home} onClick={goHome}>
                Home <GoHome size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default CanselServiceForm;
