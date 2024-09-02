export default function Input(props) {
    return (
        <div>
            <input
                id={props.id}
                name={props.name}
                type={props.type}
                autoComplete={props.autoComplete}
                required={props.required}
                value={props.value}
                onChange={(e) => props.setFullName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-bg dark:bg-bg-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
        </div>
    );
}
