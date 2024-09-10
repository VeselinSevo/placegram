import React from "react";

const StepIndicator = ({ currentStep, totalSteps }) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                            step <= currentStep
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                    >
                        {step}
                    </div>
                    {step < totalSteps && (
                        <div
                            className={`flex-1 h-1 mx-2 ${
                                step < currentStep
                                    ? "bg-primary"
                                    : "bg-gray-200 dark:bg-gray-700"
                            }`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StepIndicator;
