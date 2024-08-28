import { createPortal } from "react-dom";
import Card from "./Card";
import Backdrop from "./Backdrop";

// Modal Component
export default function Modal({
    onClose,
    customClasses,
    disableHover,
    children,
}) {
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
                    {children}
                </Card>
            </div>
        </>,
        document.getElementById("modal")
    );
}
