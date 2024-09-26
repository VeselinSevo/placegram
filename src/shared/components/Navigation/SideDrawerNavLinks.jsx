import { NavLink } from "react-router-dom";
import ModeSwitcher from "./ModeSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCompass,
    faHeart,
    faHouse,
    faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Ui/Avatar";
import { useSelector } from "react-redux";
/* eslint-disable react/prop-types */
export default function SideDrawerNavLinks({ toggleMenu }) {
    const isLoggedIn = useSelector((state) => state.auth.value.isLoggedIn);
    return (
        <ul className="font-medium gap-y-3 items-start flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li onClick={toggleMenu}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `block py-2 px-3 rounded ${
                            isActive && "text-primary"
                        } hover:bg-hover hover:text-primary md:p-0 dark:text-text-dark dark:hover:bg-hover-dark dark:hover:text-primary`
                    }
                    aria-current="page"
                >
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faHouse} />
                        <p>Home</p>
                    </div>
                </NavLink>
            </li>
            <li onClick={toggleMenu}>
                <NavLink
                    to="/explore"
                    className={({ isActive }) =>
                        `block py-2 px-3 rounded ${
                            isActive && "text-primary"
                        } hover:bg-hover hover:text-primary md:p-0 dark:text-text-dark dark:hover:bg-hover-dark dark:hover:text-primary`
                    }
                >
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faCompass} />
                        <p>Explore</p>
                    </div>
                </NavLink>
            </li>
            {isLoggedIn && (
                <li onClick={toggleMenu}>
                    <NavLink
                        to="/notifications"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:bg-hover hover:text-primary md:p-0 dark:text-text-dark dark:hover:bg-hover-dark dark:hover:text-primary`
                        }
                    >
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faHeart} />
                            <p>Notifications</p>
                        </div>
                    </NavLink>
                </li>
            )}
            {isLoggedIn && (
                <li onClick={toggleMenu}>
                    <NavLink
                        to="/posts/new"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:bg-hover hover:text-primary md:p-0 dark:text-text-dark dark:hover:bg-hover-dark dark:hover:text-primary`
                        }
                    >
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <p>Create</p>
                        </div>
                    </NavLink>
                </li>
            )}
            {isLoggedIn && (
                <li onClick={toggleMenu}>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:bg-hover hover:text-primary md:p-0 dark:text-text-dark dark:hover:bg-hover-dark dark:hover:text-primary`
                        }
                    >
                        <div className="flex gap-2 items-center">
                            <Avatar
                                src="/users/profile-images/user1.jpg"
                                customClasses="w-6 h-6"
                            />
                            <p>Profile</p>
                        </div>
                    </NavLink>
                </li>
            )}
            {!isLoggedIn && (
                <li onClick={toggleMenu}>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:bg-hover hover:text-primary md:p-0 dark:text-text-dark dark:hover:bg-hover-dark dark:hover:text-primary`
                        }
                    >
                        Login
                    </NavLink>
                </li>
            )}
            {!isLoggedIn && (
                <li onClick={toggleMenu}>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:bg-hove hover:text-primary md:p-0 dark:text-text-dark dark:hover:bg-hover-dark dark:hover:text-primary`
                        }
                    >
                        Register
                    </NavLink>
                </li>
            )}
            <li>
                <ModeSwitcher isSideDrawer={true} />
            </li>
        </ul>
    );
}
