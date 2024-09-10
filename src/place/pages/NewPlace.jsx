import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/useForm";
import { useHttpClient } from "../../shared/hooks/useHttpClient";
import { useSelector } from "react-redux";
import Input from "../../shared/components/Ui/Input";
import Button from "../../shared/components/Ui/Button";
import Label from "../../shared/components/Ui/Label";
import PageWrapper from "../../shared/components/Ui/PageWrapper";
import Card from "../../shared/components/Ui/Card";
import ErrorMessage from "../../shared/components/Ui/ErrorMessage";
import ProgressBar from "../../shared/components/Ui/ProgressBar";
import ImageUpload from "../../shared/components/Ui/ImageUpload";
import UserTagInput from "../../shared/components/Ui/UserTagInput";
import MapPicker from "../../shared/components/Ui/MapPicker";
import CornerPopup from "../../shared/components/Ui/CornerPopup"; // Import the new CornerPopup component

const NewPlace = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const progress = ((currentStep - 1) / 2) * 100;
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for success popup
    const auth = useSelector((state) => state.auth.value);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const navigate = useNavigate();

    const [formState1, inputHandler1, setFormData1] = useForm(
        {
            title: { value: "", isValid: false },
            description: { value: "", isValid: false },
        },
        false
    );

    const [formState2, inputHandler2, setFormData2] = useForm(
        {
            tags: { value: [], isValid: true },
            location: {
                value: { latitude: null, longitude: null, address: "" },
                isValid: false,
            },
        },
        false
    );

    const [formState3, inputHandler3, setFormData3] = useForm(
        {
            pictures: {
                value: { images: [], primaryIndex: 0 },
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        if (showErrorMessage) {
            const timer = setTimeout(() => {
                setShowErrorMessage(false);
            }, 1800);

            return () => clearTimeout(timer);
        }
    }, [showErrorMessage]);

    useEffect(() => {
        if (showSuccessPopup) {
            const timer = setTimeout(() => {
                navigate(`/profile/${auth.userId}`); // Redirect to user's profile
            }, 3000); // 3 seconds delay

            return () => clearTimeout(timer);
        }
    }, [showSuccessPopup, navigate, auth.userId]);

    const isStepValid = (step) => {
        switch (step) {
            case 1:
                return (
                    formState1.inputs.title.isValid &&
                    formState1.inputs.description.isValid
                );
            case 2:
                return (
                    formState2.inputs.tags.isValid &&
                    formState2.inputs.location.isValid
                );
            case 3:
                return formState3.inputs.pictures.isValid;
            default:
                return false;
        }
    };

    const nextStep = (event) => {
        event.preventDefault(); // Prevent form submission
        if (isStepValid(currentStep)) {
            setCurrentStep((prevStep) => prevStep + 1);
            setShowValidationErrors(false);
        } else {
            setShowValidationErrors(true);
            setShowErrorMessage(true);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        setShowValidationErrors(false);
    };

    const handleTagsChange = (selectedTags) => {
        console.log(selectedTags);
        console.log(selectedTags.length);
        inputHandler2("tags", selectedTags, selectedTags.length < 5);
    };

    const handleLocationSelect = (location) => {
        inputHandler2("location", location, true);
    };

    const placeSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", formState1.inputs.title.value);
            formData.append("description", formState1.inputs.description.value);
            formData.append(
                "tags",
                JSON.stringify(formState2.inputs.tags.value)
            );
            formData.append(
                "exactLocation",
                JSON.stringify(formState2.inputs.location.value)
            );
            formData.append("creator", auth.userId);

            const { images, primaryIndex } = formState3.inputs.pictures.value;
            images.forEach((image, index) => {
                formData.append("pictures", image);
            });
            formData.append("primaryPictureIndex", primaryIndex);

            await sendRequest(
                "http://localhost:5000/api/places",
                "POST",
                formData,
                {
                    Authorization: "Bearer " + auth.token,
                }
            );
            setShowSuccessPopup(true); // Show success popup
        } catch (err) {
            console.log(err);
            setShowErrorMessage(true);
        }
    };

    return (
        <PageWrapper>
            <Card
                disableHover
                customClasses="flex flex-col justify-center items-center bg-bg dark:bg-bg-dark !md:border !md:border-hover !dark:md:border !dark:md:border-hover-dark md:max-w-xl dark:bg-transparent bg-transparent"
            >
                <div className="w-full p-4 md:p-8 space-y-6 md:space-y-8">
                    <form className="" onSubmit={placeSubmitHandler}>
                        <div
                            style={{
                                display: currentStep === 1 ? "block" : "none",
                            }}
                        >
                            <h2 className="text-lg md:text-xl font-semibold mb-2">
                                Add Place - Add General Information
                            </h2>
                            <p className="text-sm md:text-base mb-4 text-hover-dark dark:text-hover italic">
                                Step {currentStep} of 3
                            </p>
                            <div className="mb-4">
                                <Label htmlFor="title" text="Title" />
                                <Input
                                    id="title"
                                    element="input"
                                    type="text"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="Please enter a valid title."
                                    onInput={inputHandler1}
                                    value={formState1.inputs.title.value}
                                    isValid={formState1.inputs.title.isValid}
                                    showError={showValidationErrors}
                                />
                            </div>
                            <div className="mb-4">
                                <Label
                                    htmlFor="description"
                                    text="Description"
                                />
                                <Input
                                    id="description"
                                    element="textarea"
                                    validators={[VALIDATOR_MINLENGTH(5)]}
                                    errorText="Please enter a valid description (at least 5 characters)."
                                    onInput={inputHandler1}
                                    value={formState1.inputs.description.value}
                                    isValid={
                                        formState1.inputs.description.isValid
                                    }
                                    showError={showValidationErrors}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: currentStep === 2 ? "block" : "none",
                            }}
                        >
                            <h2 className="text-lg md:text-xl font-semibold mb-2">
                                Add Place - Tag People and Add Location
                            </h2>
                            <p className="text-sm md:text-base mb-4 text-hover-dark dark:text-hover italic">
                                Step {currentStep} of 3
                            </p>
                            <div className="mb-4">
                                <Label htmlFor="tags" text="Tags" />
                                <UserTagInput onTagsChange={handleTagsChange} />
                                {showValidationErrors &&
                                    !formState2.inputs.tags.isValid && (
                                        <p className="text-red-500 text-sm mt-1">
                                            Please select at least one tag.
                                        </p>
                                    )}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="location" text="Location" />
                                <input
                                    id="location"
                                    type="text"
                                    value={
                                        formState2.inputs.location.value.address
                                    }
                                    readOnly
                                    className="text-sm md:text-base w-full p-2 border rounded bg-bg dark:bg-bg-dark text-text dark:text-text-dark mb-2"
                                    placeholder="Select a location on the map"
                                />
                                <MapPicker
                                    onLocationSelect={handleLocationSelect}
                                    height="300px"
                                />
                                {showValidationErrors &&
                                    !formState2.inputs.location.isValid && (
                                        <p className="text-red-500 text-sm mt-1">
                                            Please select a location on the map.
                                        </p>
                                    )}
                            </div>
                        </div>
                        <div
                            style={{
                                display: currentStep === 3 ? "block" : "none",
                            }}
                        >
                            <h2 className="text-lg md:text-xl font-semibold mb-2">
                                Add Place - Add Pictures
                            </h2>
                            <p className="text-sm md:text-base mb-4 text-hover-dark dark:text-hover italic">
                                Step {currentStep} of 3
                            </p>
                            <div className="mb-4">
                                <Label
                                    htmlFor="pictures"
                                    text="Upload Pictures (Click on an image to set as primary)"
                                    customClasses="mb-2 md:mb-3"
                                />
                                <ImageUpload
                                    id="pictures"
                                    onInput={inputHandler3}
                                    value={formState3.inputs.pictures.value}
                                    isValid={formState3.inputs.pictures.isValid}
                                    showError={showValidationErrors}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            {currentStep > 1 && (
                                <Button
                                    type="button"
                                    customClasses="mt-2"
                                    onButtonClick={prevStep}
                                >
                                    Previous
                                </Button>
                            )}
                            {currentStep < 3 ? (
                                <Button
                                    type="button"
                                    customClasses="mt-2"
                                    onButtonClick={nextStep}
                                    disabled={!isStepValid(currentStep)}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    customClasses="mt-2"
                                    disabled={
                                        !isStepValid(currentStep) || isLoading
                                    }
                                >
                                    {isLoading ? "Adding..." : "Add Place"}
                                </Button>
                            )}
                        </div>
                    </form>
                    <ProgressBar
                        progress={progress}
                        steps={3}
                        height="h-2 md:h-3"
                        customClasses="mb-6 md:mb-8"
                    />
                    {error && showErrorMessage && <ErrorMessage text={error} />}
                </div>
            </Card>

            {/* Success Popup */}
            {showSuccessPopup && (
                <CornerPopup
                    message="Your place has been successfully added. Redirecting to your profile..."
                    type="success"
                    duration={3000}
                    onClose={() => setShowSuccessPopup(false)}
                />
            )}

            {/* Error Popup */}
            {showErrorMessage && (
                <CornerPopup
                    message={error || "An error occurred. Please try again."}
                    type="error"
                    duration={3000}
                    onClose={() => setShowErrorMessage(false)}
                />
            )}
        </PageWrapper>
    );
};

export default NewPlace;
