import { useState } from "react";
import useForm from "../../shared/hooks/useForm";
import PageWrapper from "../../shared/components/ui/PageWrapper";
import googleLogo from "../../assets/icons/auth-icons/google-logo.svg";
import Button from "../../shared/components/ui/Button";
import Card from "../../shared/components/ui/Card";
import Input from "../../shared/components/ui/Input";
import Label from "../../shared/components/ui/Label";
import { login } from "../authSlice"; // Adjust the import path accordingly
import axios from "axios";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import CornerPopup from "../../shared/components/ui/CornerPopup";
import { useNavigate } from "react-router-dom";
import useLoading from "../../shared/hooks/useLoading";
import { useDispatch } from "react-redux";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [popup, setPopup] = useState(null);
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // Use the useLoading hook with the login logic
    const [loginRequest, isLoading] = useLoading(async (formData) => {
        const response = await axios.post(
            "http://localhost:3000/api/users/signin", // Change to your login API endpoint
            formData
        );
        return response;
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        if (formState.isValid) {
            try {
                const formData = {
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                };

                // Call the loginRequest function
                const response = await loginRequest(formData);
                const { token, user } = response.data; // Assuming the response contains token and user data

                // Store token in local storage
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                // Dispatch login action to Redux

                // Show success popup and navigate to dashboard or home
                setPopup({
                    type: "success",
                    message: "Login successful",
                });
                setTimeout(() => {
                    dispatch(login(user));
                    navigate("/");
                }, 1000);
            } catch (error) {
                // Handle error response
                console.log("Login error:", error.response);
                const errorMsg = error.response?.data.message || "Login failed";
                setPopup({ type: "error", message: errorMsg });
            }
        } else {
            console.log(
                "Login failed. Please check your inputs.",
                formState.inputs
            );
        }
    };

    return (
        <PageWrapper>
            <Card
                disableHover
                customClasses="flex justify-center items-center bg-bg dark:bg-bg-dark !md:border !md:border-border !dark:md:border !dark:md:border-border-dark md:max-w-md dark:bg-transparent bg-transparent"
            >
                <div className="w-full p-8">
                    <h2 className="md:text-2xl text-xl mb-4 font-bold text-text dark:text-text-dark text-center">
                        Login
                    </h2>
                    <form className="" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <Label htmlFor="email" text="Email address" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formState.inputs.email.value}
                                required
                                onInput={inputHandler}
                                validators={[VALIDATOR_EMAIL()]}
                                errorText="Please enter a valid email address"
                                showError={showValidationErrors}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" text="Password" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={formState.inputs.password.value}
                                required
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter your password"
                                showError={showValidationErrors}
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                customClasses="w-full mt-3"
                                onButtonClick={() =>
                                    setShowValidationErrors(true)
                                }
                                loading={isLoading}
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                    <div className="">
                        <div className="flex justify-between items-center">
                            <hr className="w-full border-border dark:border-border-dark" />
                            <span className="my-6 px-3 text-sm text-nowrap text-text dark:text-text-dark">
                                Or continue with
                            </span>
                            <hr className="w-full border-border dark:border-border-dark" />
                        </div>
                        <div className="flex justify-between items-center space-x-4">
                            <Card customClasses="flex-1 flex justify-center items-center p-2 cursor-pointer rounded-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 22.773 22.773"
                                    className="w-5 h-5 mr-3"
                                    fill="currentColor"
                                >
                                    <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                                    <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
                                </svg>
                                Apple
                            </Card>
                            <Card customClasses="flex-1 flex justify-center items-center p-2 cursor-pointer rounded-lg">
                                <img
                                    src={googleLogo}
                                    alt="Google"
                                    className="w-5 h-5 mr-3"
                                />
                                Google
                            </Card>
                        </div>
                    </div>
                    {popup && (
                        <CornerPopup
                            message={popup.message}
                            type={popup.type}
                            onClose={() => setPopup(null)}
                        />
                    )}
                </div>
            </Card>
        </PageWrapper>
    );
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMmFjN2IyZS1hMTQyLTQ3NDMtOGQ5NC1jMjdjMjEwZjUzZjQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNzcyOTUyMiwiZXhwIjoxNzI3NzMzMTIyfQ.bVxwafAfy-x_kXAqiJPQDG4rWa52HPnstFqNwMlrxIM
