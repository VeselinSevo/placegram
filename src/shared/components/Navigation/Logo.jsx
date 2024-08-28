export default function Logo() {
    return (
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="logo/logo.png" className="h-12" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-text dark:text-text-dark">
                Places Tracker
            </span>
        </a>
    );
}
