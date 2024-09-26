import React from "react";

const PageWrapper = ({ children, className = "" }) => {
    return (
        <div
            className={`container mx-auto m-auto flex justify-center items-center px-4 md:px-8 lg:px-12 my-4 md:my-8 md:max-w-6xl ${className}`}
        >
            {children}
        </div>
    );
};

export default PageWrapper;
