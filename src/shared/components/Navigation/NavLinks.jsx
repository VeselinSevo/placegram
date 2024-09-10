import { NavLink } from "react-router-dom";
import ModeSwitcher from "./ModeSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCompass,
    faHeart,
    faHouse,
    faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Avatar from "../Ui/Avatar";

export default function NavLinks() {
    const isLoggedIn = useSelector((state) => state.auth.value.isLoggedIn);
    console.log(isLoggedIn);
    return (
        <ul className="hidden font-medium items-center md:flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `block py-2 px-3 rounded ${
                            isActive && "text-primary"
                        } hover:text-primary`
                    }
                    aria-current="page"
                >
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faHouse} />
                        <p>Home</p>
                    </div>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/explore"
                    className={({ isActive }) =>
                        `block py-2 px-3 rounded ${
                            isActive && "text-primary"
                        } hover:text-primary`
                    }
                >
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faCompass} />
                        <p>Explore</p>
                    </div>
                </NavLink>
            </li>
            {isLoggedIn && (
                <li>
                    <NavLink
                        to="/notifications"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:text-primary`
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
                <li>
                    <NavLink
                        to="/places/new"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:text-primary`
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
                <li>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:text-primary`
                        }
                    >
                        <div className="flex gap-2 items-center">
                            <Avatar
                                src="/users/profile-images/user1.jpg"
                                customClasses="w-6 h-6"
                            ></Avatar>
                            <p>Profile</p>
                        </div>
                    </NavLink>
                </li>
            )}
            {!isLoggedIn && (
                <li>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:text-primary`
                        }
                    >
                        Login
                    </NavLink>
                </li>
            )}
            {!isLoggedIn && (
                <li>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `block py-2 px-3 rounded ${
                                isActive && "text-primary"
                            } hover:text-primary`
                        }
                    >
                        Register
                    </NavLink>
                </li>
            )}
            <li>
                <ModeSwitcher isSideDrawer={false}></ModeSwitcher>
            </li>
        </ul>
    );
}
