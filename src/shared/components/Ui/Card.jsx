/* eslint-disable react/prop-types */
export default function Card(props) {
    return (
        <div
            className={`bg-white md:border text-gray-900 dark:text-gray-100 md:border-gray-200 shadow w-full md:max-w-3xl md:hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 md:dark:hover:bg-gray-700 overflow-hidden ${props?.customClasses}`}
        >
            {props.children}
        </div>
    );
}
