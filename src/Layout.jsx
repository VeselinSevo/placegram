import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./shared/components/Navigation/Navbar";
import Footer from "./shared/components/Footer/Footer";
import useDynamicHeight from "./hooks/useDynamicHeight";

export default function Layout() {
    const { height, navbarRef, footerRef } = useDynamicHeight();

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return (
        <div className="relative min-h-screen flex flex-col bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
            {/* Glowing Effect in Light Mode */}
            <div
                className="absolute transform
                w-full h-[200px] md:h-[600px] bg-light-glow pointer-events-none 
                dark:hidden z-0 mix-blend-multiply filter blur-2xl opacity-50"
            ></div>
            {/* Glowing Effect in Dark Mode */}
            <div
                className={`absolute transform w-full h-[200px] md:h-[600px] ${
                    height ? "bg-dark-glow" : "hidden"
                } pointer-events-none z-0 mix-blend-lighten filter blur-2xl opacity-10`}
            ></div>

            {/* Navbar */}
            <Navbar ref={navbarRef} />

            {/* Main Content with dynamic height */}
            <main
                className="flex-grow flex flex-col justify-center relative z-10 my-4 md:my-10"
                style={{ minHeight: height }}
            >
                <Outlet />
            </main>

            {/* Footer */}
            <Footer ref={footerRef} />
        </div>
    );
}
