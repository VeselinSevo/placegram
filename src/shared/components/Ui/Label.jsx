export default function Label(props) {
    return (
        <label
            htmlFor={props.htmlFor}
            className={`block my-2 text-sm font-medium text-text dark:text-text-dark ${props.customClasses}`}
        >
            {props.text}
        </label>
    );
}
