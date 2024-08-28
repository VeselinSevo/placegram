/* eslint-disable react/prop-types */

export default function Burger(props) {
    return (
        <button
            onClick={props.toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text rounded-lg md:hidden hover:bg-hover focus:outline-none focus:ring-2 focus:ring-hover dark:text-text-dark dark:hover:bg-hover-dark dark:focus:ring-hover-dark"
            aria-controls="navbar-default"
            aria-expanded={props.isOpen}
        >
            <span className="sr-only">Open main menu</span>
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                />
            </svg>
        </button>
    );
}
