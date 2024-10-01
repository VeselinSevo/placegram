import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/useForm";
import { useSelector } from "react-redux";
import Input from "../../shared/components/ui/Input";
import Button from "../../shared/components/ui/Button";
import Label from "../../shared/components/ui/Label";
import PageWrapper from "../../shared/components/ui/PageWrapper";
import Card from "../../shared/components/ui/Card";
import ProgressBar from "../../shared/components/ui/ProgressBar";
import ImageUpload from "../components/post-creation/ImageUpload";
import UserTagInput from "../components/post-creation/UserTagInput";
import MapPicker from "../../shared/components/ui/MapPicker";
import CornerPopup from "../../shared/components/ui/CornerPopup";
import StepIndicator from "../components/post-creation/StepIndicator";
import TagSelector from "../components/post-creation/TagSelector";
import useLoading from "../../shared/hooks/useLoading";
import axiosInstance from "../../../axiosInstance";

const NewPost = () => {
    // Use the useLoading hook with the login logic
    const [createNewPostRequest, isLoading] = useLoading(async (formData) => {
        const response = await axiosInstance.post("/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [popup, setPopup] = useState({});
    const progress = ((currentStep - 1) / 3) * 100; // Update progress calculation
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const navigate = useNavigate();

    const [formState1, inputHandler1] = useForm(
        {
            title: { value: "", isValid: false },
            description: { value: "", isValid: false },
        },
        false
    );

    const [formState2, inputHandler2] = useForm(
        {
            tagPeople: { value: [], isValid: true }, // Renamed from tags to tagPeople
            location: {
                value: { latitude: null, longitude: null, address: "" },
                isValid: false,
            },
        },
        false
    );

    const [formState3, inputHandler3] = useForm(
        {
            generalTags: { value: [], isValid: false },
        },
        false
    );

    const [formState4, inputHandler4] = useForm(
        {
            pictures: {
                value: { images: [], primaryIndex: 0 },
                isValid: false,
            },
        },
        false
    );

    const isStepValid = (step) => {
        switch (step) {
            case 1:
                return (
                    formState1.inputs.title.isValid &&
                    formState1.inputs.description.isValid
                );
            case 2:
                return (
                    formState2.inputs.tagPeople.isValid &&
                    formState2.inputs.location.isValid
                );
            case 3:
                return formState3.inputs.generalTags.isValid; // Validate general tags
            case 4:
                return formState4.inputs.pictures.isValid;
            default:
                return false;
        }
    };

    const nextStep = (event) => {
        event.preventDefault();
        if (isStepValid(currentStep)) {
            setCurrentStep((prevStep) => prevStep + 1);
            setShowValidationErrors(false);
        } else {
            setShowValidationErrors(true);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        setShowValidationErrors(false);
    };

    const handleTagsChange = (selectedTags) => {
        inputHandler2("tagPeople", selectedTags, selectedTags.length < 5);
    };

    const handleGeneralTagsChange = (selectedTags) => {
        inputHandler3(
            "generalTags",
            selectedTags,
            selectedTags.length > 0 && selectedTags.length < 6
        );
    };

    const handleLocationSelect = (location) => {
        inputHandler2("location", location, true);
    };

    const postSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();

            // 1. Add title and description
            formData.append("title", formState1.inputs.title.value);
            formData.append("description", formState1.inputs.description.value);

            // 2. Add visitDate (Assuming you have a field for this in the form)
            const visitDate = new Date(); // Use the date input value from your form
            formData.append("visitDate", visitDate.toISOString()); // Convert date to ISO string

            // 3. Add tagged users (Array of UUIDs)
            const taggedUsers = formState2.inputs.tagPeople.value.map(
                (user) => user.id
            );
            formData.append("taggedUsers", JSON.stringify(taggedUsers));

            // 4. Add general tags (Array of tag IDs)
            const generalTags = formState3.inputs.generalTags.value; // Already an array of UUIDs

            formData.append("tags", JSON.stringify(generalTags));

            // 6. Add location (including country extraction logic)
            const address = formState2.inputs.location.value.address;
            const addressParts = address.split(",");
            const country = addressParts[addressParts.length - 1].trim();

            const location = {
                ...formState2.inputs.location.value,
                country: country,
            };
            formData.append("location", JSON.stringify(location)); // Location as JSON

            // 7. Add images
            const { images, primaryIndex } = formState4.inputs.pictures.value;
            images.forEach((image) => {
                formData.append("images", image); // Assuming `image` is a File object
            });
            // formData.append("primaryImageIndex", primaryIndex); // Optionally, if you need to send this

            // Log the form data for debugging
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            console.log("Form Data:", formDataObject); // Debugging the formData

            // Submit the form data to the backend
            await createNewPostRequest(formData);

            // Display success popup and navigate after a short delay
            setPopup({
                type: "success",
                message: "Post successfully created!",
            });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            // Handle error and display a popup
            setPopup({
                type: "error",
                message: error.response?.data.message || "An error occurred",
            });
        }
    };

    return (
        <PageWrapper>
            <div className="w-full md:w-[60rem] flex flex-col md:flex-row gap-5 md:gap-10">
                <StepIndicator
                    steps={[
                        "Add General Information",
                        "Tag People and Add Location",
                        "Add Tags", // New step for general tags
                        "Add Pictures",
                    ]}
                    currentStep={currentStep}
                    isStepValid={isStepValid}
                    onStepClick={setCurrentStep}
                />
                <div className="w-full md:w-3/4">
                    <Card
                        disableHover
                        customClasses="flex flex-col justify-center items-center bg-bg dark:bg-bg-dark !md:border !md:border-border !dark:md:border !dark:md:border-border-dark md:max-w-5xl dark:bg-transparent bg-transparent"
                    >
                        <div className="w-full p-4 md:p-8 space-y-6 md:space-y-8">
                            <form onSubmit={postSubmitHandler}>
                                <div
                                    style={{
                                        display:
                                            currentStep === 1
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    <h2 className="text-lg md:text-xl font-semibold mb-2">
                                        Add Post - Add General Information
                                    </h2>
                                    <p className="text-sm md:text-base mb-4 text-hover-dark dark:text-hover italic">
                                        Step {currentStep} of 4
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
                                            value={
                                                formState1.inputs.title.value
                                            }
                                            isValid={
                                                formState1.inputs.title.isValid
                                            }
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
                                            validators={[
                                                VALIDATOR_MINLENGTH(5),
                                            ]}
                                            errorText="Please enter a valid description (at least 5 characters)."
                                            onInput={inputHandler1}
                                            value={
                                                formState1.inputs.description
                                                    .value
                                            }
                                            isValid={
                                                formState1.inputs.description
                                                    .isValid
                                            }
                                            showError={showValidationErrors}
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display:
                                            currentStep === 2
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    <h2 className="text-lg md:text-xl font-semibold mb-2">
                                        Add Post - Tag People and Add Location
                                    </h2>
                                    <p className="text-sm md:text-base mb-4 text-hover-dark dark:text-hover italic">
                                        Step {currentStep} of 4
                                    </p>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="tagPeople"
                                            text="Tag People"
                                        />
                                        <UserTagInput
                                            onTagsChange={handleTagsChange}
                                            taggedUsers={
                                                formState2.inputs.tagPeople
                                                    .value
                                            }
                                        />
                                        {showValidationErrors &&
                                            !formState2.inputs.tagPeople
                                                .isValid && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    Please select at least one
                                                    tag.
                                                </p>
                                            )}
                                    </div>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="location"
                                            text="Location"
                                        />
                                        <input
                                            id="location"
                                            type="text"
                                            value={
                                                formState2.inputs.location.value
                                                    .address
                                            }
                                            readOnly
                                            className="text-sm md:text-base w-full p-2 border rounded bg-bg dark:bg-bg-dark text-text dark:text-text-dark mb-2"
                                            placeholder="Select a location on the map"
                                        />
                                        <MapPicker
                                            onLocationSelect={
                                                handleLocationSelect
                                            }
                                            height="300px"
                                        />
                                        {showValidationErrors &&
                                            !formState2.inputs.location
                                                .isValid && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    Please select a location on
                                                    the map.
                                                </p>
                                            )}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display:
                                            currentStep === 3
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    <h2 className="text-lg md:text-xl font-semibold mb-2">
                                        Add Post - Add Tags
                                    </h2>
                                    <p className="text-sm md:text-base mb-4 text-hover-dark dark:text-hover italic">
                                        Step {currentStep} of 4
                                    </p>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="tags"
                                            text="Select Tags"
                                        />
                                        <TagSelector
                                            id="tags"
                                            onTagsChange={
                                                handleGeneralTagsChange
                                            }
                                        />
                                        {showValidationErrors &&
                                            !formState3.inputs.generalTags
                                                .isValid && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    Please select at least 1 and
                                                    maximum 5 tags.
                                                </p>
                                            )}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display:
                                            currentStep === 4
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    <h2 className="text-lg md:text-xl font-semibold mb-2">
                                        Add Post - Add Pictures
                                    </h2>
                                    <p className="text-sm md:text-base mb-4 text-hover-dark dark:text-hover italic">
                                        Step {currentStep} of 4
                                    </p>
                                    <div className="mb-4">
                                        <Label
                                            htmlFor="pictures"
                                            text="Upload Pictures (Click on an image to set as primary)"
                                            customClasses="mb-2 md:mb-3"
                                        />
                                        <ImageUpload
                                            id="pictures"
                                            onInput={inputHandler4}
                                            value={
                                                formState4.inputs.pictures.value
                                            }
                                            isValid={
                                                formState4.inputs.pictures
                                                    .isValid
                                            }
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
                                    {currentStep < 4 ? ( // Update to 4 steps
                                        <Button
                                            type="button"
                                            customClasses="mt-2"
                                            onButtonClick={nextStep}
                                        >
                                            Next
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            customClasses="mt-2"
                                            disabled={!isStepValid(currentStep)}
                                            loading={isLoading}
                                        >
                                            Crete Post
                                        </Button>
                                    )}
                                </div>
                            </form>
                            <ProgressBar
                                progress={progress}
                                steps={4}
                                height="h-2 md:h-3"
                                customClasses="mb-6 md:mb-8"
                            />
                        </div>
                    </Card>

                    {popup.message && (
                        <CornerPopup
                            message={popup.message}
                            type={popup.type}
                            onClose={() => setPopup({})}
                        />
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

export default NewPost;
