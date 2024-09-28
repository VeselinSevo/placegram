export default function MoreOptionsOption({
    optionText,
    isLast,
    onClick,
    style,
}) {
    return (
        <div>
            <div
                onClick={onClick}
                className={`min-w-[220px] md:min-w-[350px] text-center text-sm md:text-base p-2 hover:bg-hover dark:hover:bg-hover-dark cursor-pointer ${
                    style == "danger" && "text-red-500 font-semibold"
                } ${style == "primary" && "text-primary font-semibold"} ${
                    style == "edit" && "text-green-700 font-semibold"
                }`}
            >
                {optionText}
            </div>
            {/* Conditionally render the hr only if it's not the last option */}
            {!isLast && (
                <hr className="border-border dark:border-border-dark"></hr>
            )}
        </div>
    );
}
