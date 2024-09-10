import { createPortal } from "react-dom";
import { useEffect } from "react";
import Card from "./Card";
import Backdrop from "./Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { disableBodyScroll, enableBodyScroll } from "../../util/bodyScroll";

// Modal Component
export default function Modal({
    onClose,
    customClasses,
    disableHover,
    showCloseIcon = false, // New prop to control the display of the close icon
    children,
}) {
    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    return createPortal(
        <>
            {/* Backdrop */}
            <Backdrop onClick={onClose} />

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none">
                <Card
                    customClasses={`relative z-60 p-5 max-w-lg w-full mx-4 md:mx-0 rounded-lg shadow-lg bg-bg dark:bg-bg-dark dark:border dark:border-gray-700 pointer-events-auto ${customClasses}`}
                    disableHover={disableHover} // Pass the disableHover prop
                >
                    {showCloseIcon && (
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-text dark:text-text-dark hover:text-hover-dark dark:hover:text-hover focus:outline-none"
                            aria-label="Close"
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    )}
                    {children}
                </Card>
            </div>
        </>,
        document.getElementById("modal")
    );
}
