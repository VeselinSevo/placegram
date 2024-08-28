export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
}) {
    const baseStyles =
        "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 rounded-lg";

    const variants = {
        primary: "bg-primary text-white",
        // Uncomment and customize additional variants if needed
        secondary: "bg-hover-dark dark:bg-hover text-text-dark dark:text-text",
        // outline:
        //     "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300 disabled:border-gray-200 disabled:text-gray-300",
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
