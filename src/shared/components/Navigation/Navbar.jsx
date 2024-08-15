import { useState, useEffect } from "react";

import Burger from "./Burger";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../Ui/Backdrop";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            // Disable scrolling by adding a class to the body
            document.body.classList.add("overflow-hidden");
        } else {
            // Re-enable scrolling by removing the class from the body
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            // Clean up by removing the class when the component unmounts
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && <SideDrawer></SideDrawer>}
            {isOpen && <Backdrop onClick={toggleMenu}></Backdrop>}
            <nav className="bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-bgDark sticky top-0 z-40">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Logo></Logo>
                    {!isOpen && (
                        <Burger
                            toggleMenu={toggleMenu}
                            isOpen={isOpen}
                        ></Burger>
                    )}
                    {/* <div
                    className={`${
                        isOpen ? "block" : "hidden"
                    } w-full md:block md:w-auto`}
                    id="navbar-default"
                >
               
                </div> */}

                    <NavLinks></NavLinks>
                </div>
            </nav>
        </>
    );
}
