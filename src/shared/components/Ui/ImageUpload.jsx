import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onInput, id, value, isValid, showError }) => {
    const [primaryIndex, setPrimaryIndex] = useState(0);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const newImages = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            const updatedImages = [...(value.images || []), ...newImages];
            onInput(
                id,
                { images: updatedImages, primaryIndex },
                updatedImages.length > 0
            );
        },
        [onInput, id, value]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: true,
    });

    const handleImageClick = (index) => {
        setPrimaryIndex(index);
        onInput(id, { images: value.images, primaryIndex: index }, true);
    };

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer ${
                    isDragActive
                        ? "border-primary bg-primary bg-opacity-10"
                        : "border-gray-300"
                }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the images here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some images here, or click to select
                        images
                    </p>
                )}
            </div>
            {value.images && value.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    {value.images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative cursor-pointer rounded mt-3 ${
                                index === value.primaryIndex
                                    ? "ring-2 ring-primary"
                                    : ""
                            }`}
                            onClick={() => handleImageClick(index)}
                        >
                            <img
                                src={image.preview}
                                alt={`Preview ${index}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            {index === value.primaryIndex && (
                                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs rounded">
                                    Primary
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {showError && !isValid && (
                <p className="text-red-500 text-sm mt-1">
                    Please upload at least one picture.
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
