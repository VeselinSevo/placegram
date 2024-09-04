import { useEffect, useReducer } from "react";
import { validate } from "../../util/validators";

export default function Input(props) {
    function inputReducer(state, action) {
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
    }

    const [inputState, dispacth] = useReducer(inputReducer, {
        value: "",
        isValid: false,
        isTouched: false,
    });

    function changeHandler(e) {
        dispacth({
            type: "CHANGE",
            val: e.target.value,
            validators: props.validators,
        });
    }

    function touchHandler(e) {
        dispacth({
            type: "TOUCH",
        });
    }

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        props.onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const element =
        props?.element == "textarea" ? (
            <textarea
                id={props.id}
                name={props.name}
                autoComplete={props.autoComplete}
                required={props.required}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
                rows={props.rows || 3}
                className={`mt-1 block w-full px-3 py-2 bg-bg dark:bg-bg-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                    !inputState.isValid && inputState.isTouched
                        ? "border-red-500 dark:border-red-500"
                        : ""
                }`}
            />
        ) : (
            <input
                id={props.id}
                name={props.name}
                type={props.type}
                autoComplete={props.autoComplete}
                required={props.required}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
                className={`mt-1 block w-full px-3 py-2 bg-bg dark:bg-bg-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                    !inputState.isValid && inputState.isTouched
                        ? "border-red-500 dark:border-red-500"
                        : ""
                }`}
            />
        );

    return (
        <>
            <div>{element}</div>
            {!inputState.isValid && inputState.isTouched && (
                <p className="text-sm text-red-500 mt-1">{props.errorText}</p>
            )}
        </>
    );
}
