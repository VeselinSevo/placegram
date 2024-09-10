import { useState, useEffect, useCallback } from "react";
import useForm from "../../../shared/hooks/useForm";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import PageWrapper from "../../../shared/components/Ui/PageWrapper";
import Button from "../../../shared/components/Ui/Button";
import Card from "../../../shared/components/Ui/Card";
import googleLogo from "../../../assets/auth/google-logo.svg";
import Input from "../../../shared/components/Ui/Input"; // Import custom Input
import Label from "../../../shared/components/Ui/Label"; // Import custom Label
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.value.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

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

    const handleLogin = (e) => {
        console.log(123);
        e.preventDefault();
        console.log(formState.isValid);
        if (formState.isValid) {
            const { email, password } = formState.inputs;
            // Implement login logic here using email.value and password.value
            console.log("Logging in with:", email.value, password.value);
            dispatch(login({ email: email.value, password: password.value }));
            navigate("/");
        } else {
            // Handle form validation errors
            console.log("Form is invalid");
        }
    };

    return (
        <PageWrapper>
            <Card
                disableHover
                customClasses="flex justify-center items-center bg-bg dark:bg-bg-dark !md:border !md:border-hover !dark:md:border !dark:md:border-hover-dark md:max-w-md dark:bg-transparent bg-transparent"
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
                                required
                                errorText="Please enter valid email address"
                                validators={[
                                    VALIDATOR_REQUIRE(),
                                    VALIDATOR_EMAIL(),
                                ]}
                                value={formState.inputs.email.value}
                                onInput={inputHandler}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" text="Password" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                errorText="Please enter valid password"
                                validators={[
                                    VALIDATOR_REQUIRE(),
                                    VALIDATOR_MINLENGTH(8),
                                ]}
                                value={formState.inputs.password.value}
                                onInput={inputHandler}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-primary"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                customClasses="w-full mt-2"
                                // disabled={!formState.isValid}
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                    <div className="">
                        <div className="flex justify-between items-center">
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                            <span className="my-6 px-3 text-sm text-nowrap text-text dark:text-text-dark">
                                Or continue with
                            </span>
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
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
                </div>
            </Card>
        </PageWrapper>
    );
}
