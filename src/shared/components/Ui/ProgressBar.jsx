import React from "react";

const ProgressBar = ({ progress, height = "h-2", customClasses = "" }) => {
    const progressPercentage = Math.min(Math.max(progress, 0), 100);

    return (
        <div
            className={`w-full bg-gray-200 rounded-full dark:bg-gray-700 ${height} ${customClasses}`}
        >
            <div
                className={`${height} rounded-full transition-all duration-300 ease-in-out bg-light-glow-progress dark:bg-dark-glow-progress`}
                style={{
                    width: `${progressPercentage}%`,

                    backgroundPosition: "left center",
                }}
            />
        </div>
    );
};

export default ProgressBar;
