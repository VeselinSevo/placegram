import { useState, useEffect, useReducer, useCallback } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            const updatedInputs = {
                ...state.inputs,
                [action.inputId]: {
                    value: action.value,
                    isValid: action.isValid,
                },
            };

            const formIsValid = Object.values(updatedInputs).every(
                (input) => input.isValid
            );

            return {
                inputs: updatedInputs,
                isValid: formIsValid,
            };
        default:
            return state;
    }
};

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    return [formState, inputHandler];
};

export default useForm;
