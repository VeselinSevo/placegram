import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import SideDrawerNavLinks from "./SideDrawerNavLinks";

export default function SideDrawer(props) {
    return createPortal(
        <CSSTransition
            in={props.show}
            timeout={300} // Duration should match the animation duration
            classNames={{
                enter: "transition-transform transform -translate-x-full", // Starting off-screen
                enterActive: "animate-slideIn", // Apply slide-in animation
                exit: "transition-transform transform translate-x-0", // Start from current position
                exitActive: "animate-slideOut", // Apply slide-out animation
            }}
            mountOnEnter
            unmountOnExit
        >
            <aside className="fixed top-0 left-0 block pt-10 pl-5 md:hidden z-[100] w-2/3 h-screen bg-bg dark:bg-bg-dark border-b border-border-dark dark:border-border-dark">
                <div
                    onClick={props.toggleMenu}
                    className="w-8 h-8 fill-current text-text dark:text-text-dark dark:hover:text-primary hover:text-primary cursor-pointer ml-auto mr-5"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="collapse-left"
                    >
                        <path d="M13,17a1,1,0,0,1-.71-.29l-4-4a1,1,0,0,1,0-1.41l4-4a1,1,0,0,1,1.41,1.41L10.41,12l3.29,3.29A1,1,0,0,1,13,17Z"></path>
                        <path d="M19 13H9a1 1 0 0 1 0-2H19a1 1 0 0 1 0 2zM5 20a1 1 0 0 1-1-1V5A1 1 0 0 1 6 5V19A1 1 0 0 1 5 20z"></path>
                    </svg>
                </div>
                <SideDrawerNavLinks toggleMenu={props.toggleMenu} />
            </aside>
        </CSSTransition>,
        document.getElementById("side-drawer")
    );
}
