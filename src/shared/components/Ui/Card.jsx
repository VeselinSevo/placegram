/* eslint-disable react/prop-types */
export default function Card({ customClasses, disableHover, children }) {
    return (
        <div
            className={`bg-white md:border text-text dark:text-text-dark md:border-hover shadow w-full md:max-w-3xl dark:bg-bg-dark dark:border-hover-dark overflow-hidden 
            ${
                !disableHover
                    ? "md:hover:bg-hover md:dark:hover:bg-hover-dark"
                    : ""
            }
            ${customClasses}`}
        >
            {children}
        </div>
    );
}
