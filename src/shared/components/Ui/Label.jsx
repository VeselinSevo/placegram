export default function Label(props) {
    return (
        <label
            htmlFor={props.htmlFor}
            className="block text-sm font-medium text-text dark:text-text-dark"
        >
            {props.text}
        </label>
    );
}
