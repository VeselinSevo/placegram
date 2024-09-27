import { useState, useEffect, forwardRef } from "react";
import Burger from "./Burger";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../ui/Backdrop";

const Navbar = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Clean up scroll event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    return (
        <>
            <SideDrawer toggleMenu={toggleMenu} show={isOpen} />
            {isOpen && <Backdrop onClick={toggleMenu} />}
            <nav
                ref={ref}
                className={`transition-all duration-300 ease-in-out border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 
                    ${
                        scrolled
                            ? "bg-opacity-100 backdrop-blur-lg bg-bg dark:bg-bg-dark"
                            : "bg-opacity-50 backdrop-blur-lg bg-bg dark:bg-bg-dark"
                    }
                    ${!scrolled && "bg-transparent"}
                   `}
            >
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Logo />
                    {!isOpen && (
                        <Burger toggleMenu={toggleMenu} isOpen={isOpen} />
                    )}
                    <NavLinks toggleMenu={toggleMenu} />
                </div>
            </nav>
        </>
    );
});

export default Navbar;
