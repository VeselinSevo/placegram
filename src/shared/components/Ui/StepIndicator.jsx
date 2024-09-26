import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

const StepIndicator = ({ steps, currentStep, isStepValid, onStepClick }) => {
    return (
        <div className="w-full md:w-1/3 md:mb-0">
            <div className="flex flex-col space-y-4 text-sm md:text-base">
                {steps.map((stepName, index) => {
                    const stepIndex = index + 1;
                    const isCompleted = isStepValid(stepIndex);
                    const isCurrent = currentStep === stepIndex;

                    return (
                        <div
                            key={index}
                            // onClick={() => onStepClick(stepIndex)} // Call the passed function to set the current step
                            className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                                isCurrent
                                    ? "bg-primary text-text-dark"
                                    : isCompleted
                                    ? "bg-hover dark:bg-hover-dark text-text dark:text-text-dark"
                                    : "bg-transparent text-text dark:text-text-dark border-2 border-hover"
                            }`}
                        >
                            <span className="mr-3">{stepName}</span>
                            <span className="mr-2">
                                {isCompleted ? (
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={`${
                                            isCurrent
                                                ? "text-text-dark"
                                                : "text-green-900 dark:text-green-100"
                                        }`}
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faSpinner} />
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
