import SideDrawerNavLinks from "./SideDrawerNavLinks";
import { createPortal } from "react-dom";

export default function SideDrawer() {
    const content = (
        <aside className="block pt-10 pl-5 md:hidden absolute z-[100] w-2/3 h-screen bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-bgDark over">
            <SideDrawerNavLinks></SideDrawerNavLinks>
        </aside>
    );

    return createPortal(content, document.getElementById("side-drawer"));
}
