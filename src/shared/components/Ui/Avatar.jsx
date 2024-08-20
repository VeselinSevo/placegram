/* eslint-disable react/prop-types */

export default function Avatar(props) {
    return (
        <div
            className={`w-10 h-10 relative rounded-full overflow-hidden ${props?.customClasses}`}
        >
            <img
                className={`absolute inset-0 w-full h-full object-cover`}
                src={props.src}
                alt={props.alt}
            />
        </div>
    );
}
