import React from "react";

export default function Button({
    children,
    onButtonClick,
    type = "button",
    variant = "primary",
    size = "md",
    customClasses = "",
    disabled = false,
}) {
    const baseStyles =
        "w-auto inline-flex items-center text-sm md:text-base justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 rounded-lg";

    const variants = {
        primary: `bg-primary text-white ${
            disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-dark focus:ring-primary-light cursor-pointer"
        }`,
        secondary: `bg-hover-dark dark:bg-hover text-text-dark dark:text-text ${
            disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-hover-darker dark:hover:bg-hover-light focus:ring-hover cursor-pointer"
        }`,
        outline: `border ${
            disabled
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-hover dark:border-hover-dark text-text dark:text-text-dark hover:bg-hover dark:hover:bg-hover-dark focus:ring-gray-300 cursor-pointer"
        }`,
        danger: `bg-red-600 text-white ${
            disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-700 focus:ring-red-500 cursor-pointer"
        }`,
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${customClasses}`}
            disabled={disabled}
            onClick={disabled ? undefined : onButtonClick}
        >
            {children}
        </button>
    );
}
