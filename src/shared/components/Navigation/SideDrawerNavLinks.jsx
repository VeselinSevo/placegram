/* eslint-disable react/prop-types */

import ModeSwitcher from "./ModeSwitcher";

export default function NavLinks(props) {
    return (
        <ul className="font-medium gap-y-3 items-start flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li onClick={props.toggleMenu}>
                <a
                    href="#"
                    className="block py-2 px-3 text-text rounded hover:bg-hover md:hover:bg-transparent md:border-0 md:p-0 dark:text-text-dark hover:text-primary dark:hover:bg-hover-dark dark:hover:text-primary md:dark:hover:bg-transparent"
                    aria-current="page"
                >
                    Home
                </a>
            </li>
            <li onClick={props.toggleMenu}>
                <a
                    href="#"
                    className="block py-2 px-3 text-text rounded hover:bg-hover md:hover:bg-transparent md:border-0 md:p-0 dark:text-text-dark hover:text-primary dark:hover:bg-hover-dark dark:hover:text-primary md:dark:hover:bg-transparent"
                >
                    About
                </a>
            </li>
            <li onClick={props.toggleMenu}>
                <a
                    href="#"
                    className="block py-2 px-3 text-text rounded hover:bg-hover md:hover:bg-transparent md:border-0 md:p-0 dark:text-text-dark hover:text-primary dark:hover:bg-hover-dark dark:hover:text-primary md:dark:hover:bg-transparent"
                >
                    Services
                </a>
            </li>
            <li onClick={props.toggleMenu}>
                <a
                    href="#"
                    className="block py-2 px-3 text-text rounded hover:bg-hover md:hover:bg-transparent md:border-0 md:p-0 dark:text-text-dark hover:text-primary dark:hover:bg-hover-dark dark:hover:text-primary md:dark:hover:bg-transparent"
                >
                    Pricing
                </a>
            </li>
            <li onClick={props.toggleMenu}>
                <a
                    href="#"
                    className="block py-2 px-3 text-text rounded hover:bg-hover md:hover:bg-transparent md:border-0 hover:text-primary md:p-0 dark:text-text-dark dark:hover:bg-hover-dark dark:hover:text-primary md:dark:hover:bg-transparent"
                >
                    Contact
                </a>
            </li>
            <li>
                <ModeSwitcher isSideDrawer={true} />
            </li>
        </ul>
    );
}
