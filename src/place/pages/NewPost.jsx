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
import ProgressBar from "../../shared/components/Ui/ProgressBar";
import ImageUpload from "../../shared/components/Ui/ImageUpload";
import UserTagInput from "../../shared/components/Ui/UserTagInput";
import MapPicker from "../../shared/components/Ui/MapPicker";
import CornerPopup from "../../shared/components/Ui/CornerPopup";
import StepIndicator from "../../shared/components/Ui/StepIndicator";
import TagSelector from "../../shared/components/Ui/TagSelector";
import icons from "../../shared/util/importIcons"; // Adjust the path as necessary

const NewPost = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const progress = ((currentStep - 1) / 3) * 100; // Update progress calculation
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const auth = useSelector((state) => state.auth.value);
    const { isLoading, error, sendRequest } = useHttpClient();
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

    const generalTags = [
        { id: 1, label: "Hiking", icon: icons.HikingIcon },
        { id: 2, label: "Beach", icon: icons.BeachIcon },
        { id: 3, label: "Urban", icon: icons.UrbanIcon },
        { id: 4, label: "Mountain", icon: icons.MountainIcon },
        { id: 5, label: "Adventure", icon: icons.AdventureIcon },
        { id: 6, label: "Camping", icon: icons.CampingIcon },
        { id: 7, label: "Travel", icon: icons.TravelIcon },
        { id: 8, label: "Nature", icon: icons.NatureIcon },
        { id: 9, label: "Photo", icon: icons.PhotographyIcon },
        { id: 10, label: "Fitness", icon: icons.FitnessIcon },
        { id: 11, label: "Food", icon: icons.FoodIcon },
        { id: 12, label: "Music", icon: icons.MusicIcon },
        { id: 13, label: "Art", icon: icons.ArtIcon },
        { id: 14, label: "Sports", icon: icons.SportsIcon },
    ];

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
                navigate(`/profile/${auth.userId}`);
            }, 3000);
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
            formData.append("title", formState1.inputs.title.value);
            formData.append("description", formState1.inputs.description.value);
            formData.append(
                "tagPeople",
                JSON.stringify(formState2.inputs.tagPeople.value) // Updated to tagPeople
            );
            formData.append(
                "exactLocation",
                JSON.stringify(formState2.inputs.location.value)
            );
            formData.append(
                "generalTags",
                JSON.stringify(formState3.inputs.generalTags.value)
            ); // Append general tags
            formData.append("creator", auth.userId);

            const { images, primaryIndex } = formState4.inputs.pictures.value;
            images.forEach((image) => {
                formData.append("pictures", image);
            });
            formData.append("primaryPictureIndex", primaryIndex);

            await sendRequest(
                "http://localhost:5000/api/posts",
                "POST",
                formData,
                {
                    Authorization: "Bearer " + auth.token,
                }
            );
            setShowSuccessPopup(true);
        } catch (err) {
            setShowErrorMessage(true);
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
                        customClasses="flex flex-col justify-center items-center bg-bg dark:bg-bg-dark !md:border !md:border-hover !dark:md:border !dark:md:border-hover-dark md:max-w-5xl dark:bg-transparent bg-transparent"
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
                                            tags={generalTags}
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
                                            disabled={
                                                !isStepValid(currentStep) ||
                                                isLoading
                                            }
                                        >
                                            {isLoading
                                                ? "Adding..."
                                                : "Add Post"}
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

                    {showSuccessPopup && (
                        <CornerPopup
                            message="Your post has been successfully added. Redirecting to your profile..."
                            type="success"
                            duration={3000}
                            onClose={() => setShowSuccessPopup(false)}
                        />
                    )}

                    {showErrorMessage && (
                        <CornerPopup
                            message={
                                error || "An error occurred. Please try again."
                            }
                            type="error"
                            duration={3000}
                            onClose={() => setShowErrorMessage(false)}
                        />
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

export default NewPost;
