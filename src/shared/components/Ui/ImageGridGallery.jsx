// components/ImageGallery.js
import React from "react";

const getImageGridClasses = (imageCount) => {
    switch (imageCount) {
        case 1:
            return "grid-cols-1";
        case 2:
            return "grid-cols-2";
        case 3:
            return "grid-cols-2 gap-4 md:grid-cols-3";
        case 4:
            return "grid-cols-2 gap-4 md:grid-cols-4";
        case 5:
            return "grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4";
        case 6:
            return "grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4";
        case 7:
            return "grid-cols-3 gap-4 md:grid-cols-4";
        case 8:
            return "grid-cols-4 gap-4";
        default:
            return "grid-cols-1";
    }
};

const ImageGallery = ({ images }) => {
    return (
        <div
            className={`grid ${getImageGridClasses(images.length)} gap-4 mb-6`}
        >
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`relative ${
                        index === 0
                            ? "col-span-2 row-span-2"
                            : "col-span-1 row-span-1"
                    }`}
                >
                    <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;
