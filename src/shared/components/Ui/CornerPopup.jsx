import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

const CornerPopup = ({
    message,
    type = "success",
    duration = 3000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
    const icon = type === "success" ? faCheckCircle : faTimesCircle;

    return (
        <div
            className={`absolute top-0 right-5 md:right-10 lg:right-20 z-50 ${bgColor} text-text-dark  p-4 rounded-lg shadow-lg max-w-sm`}
        >
            <div className="flex items-center">
                <FontAwesomeIcon
                    icon={icon}
                    className="mr-3 md:text-xl text-base"
                />
                <p className="flex-grow md:text-base text-small">{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose();
                    }}
                    className="ml-3 text-white hover:text-gray-200"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
};

export default CornerPopup;
