import React, { useReducer, useEffect } from "react";
import { validate } from "../../util/validators";
import ErrorMessage from "./ErrorMessage";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || "",
        isTouched: false,
        isValid: props.isValid || false,
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        if (onInput) {
            onInput(id, value, isValid);
        }
    }, [id, value, isValid, onInput]);

    const changeHandler = (event) => {
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({
            type: "TOUCH",
        });
    };

    const element =
        props.element !== "textarea" ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                className={`text-sm md:text-base mt-1 block w-full px-3 py-2 bg-bg dark:bg-bg-dark border text-text dark:text-text-dark border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                    !inputState.isValid && inputState.isTouched
                        ? "border-red-500 dark:border-red-500"
                        : ""
                }`}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                className={`text-sm md:text-base mt-1 block w-full px-3 py-2 bg-bg dark:bg-bg-dark border text-text dark:text-text-dark border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                    !inputState.isValid && inputState.isTouched
                        ? "border-red-500 dark:border-red-500"
                        : ""
                }`}
            />
        );

    const showErrors =
        (!inputState.isValid && inputState.isTouched) ||
        (!inputState.isValid && props.showError);

    return (
        <div className="form-control">
            <label
                htmlFor={props.id}
                className="block text-sm font-medium text-text dark:text-text-dark"
            >
                {props.label}
            </label>
            {element}
            {showErrors && <ErrorMessage text={props.errorText} />}
        </div>
    );
};

export default Input;
