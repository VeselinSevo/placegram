export default function MoreOptionsOption({ optionText, isLast }) {
    return (
        <div>
            <div className="min-w-[220px] md:min-w-[350px] text-center p-2 hover:bg-hover dark:hover:bg-hover-dark cursor-pointer">
                {optionText}
            </div>
            {/* Conditionally render the hr only if it's not the last option */}
            {!isLast && (
                <hr className="border-hover dark:border-hover-dark"></hr>
            )}
        </div>
    );
}
