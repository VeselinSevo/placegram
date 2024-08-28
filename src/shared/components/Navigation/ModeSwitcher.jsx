/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function ModeSwitcher(props) {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("mode") || "light";
    });

    useEffect(() => {
        localStorage.setItem("mode", mode);
        if (mode === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [mode]);

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    return (
        <>
            <button
                type="button"
                className={`${
                    mode === "dark" ? "hidden" : "block"
                } mt-2 md:mt-0 font-medium text-text rounded-full !p-2 ${
                    props.isSideDrawer && "bg-hover"
                } bg-hover hover:bg-hover focus:outline-none focus:bg-hover`}
                onClick={toggleMode}
            >
                <span className="group inline-flex shrink-0 justify-center items-center size-9 text-text">
                    <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                </span>
            </button>
            <button
                type="button"
                className={`${
                    mode === "dark" ? "block" : "hidden"
                } mt-2 md:mt-0 font-medium text-text-dark rounded-full !p-2 ${
                    props.isSideDrawer && "bg-hover-dark"
                } bg-hover-dark hover:bg-hover-dark focus:outline-none focus:bg-hover-dark`}
                onClick={toggleMode}
            >
                <span className="group inline-flex shrink-0 justify-center items-center size-9 dark:text-text-dark">
                    <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="m4.93 4.93 1.41 1.41"></path>
                        <path d="m17.66 17.66 1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="m6.34 17.66-1.41 1.41"></path>
                        <path d="m19.07 4.93-1.41 1.41"></path>
                    </svg>
                </span>
            </button>
        </>
    );
}
