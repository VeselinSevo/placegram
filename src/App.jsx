import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Places from "./place/pages/Places";
import NewPlace from "./place/pages/NewPlace";
import User from "./user/pages/User";
import Navbar from "./shared/components/Navigation/Navbar";
import Footer from "./shared/components/Footer/Footer";
import useDynamicHeight from "./hooks/useDynamicHeight"; // Import the custom hook

function App() {
    const { height, navbarRef, footerRef } = useDynamicHeight();
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("mode") == "dark" && true
    );

    // Update dark mode state when the class on the body changes
    useEffect(() => {
        // setIsDarkMode(localStorage.getItem("mode") == "dark" && true);
        const handleClassChange = () => {
            setIsDarkMode(document.body.classList.contains("dark"));
        };

        // Add an observer to listen for class changes
        const observer = new MutationObserver(handleClassChange);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-100 dark:bg-bgDark">
            {/* Glowing Effect in Light Mode */}
            <div
                className="absolute transform
                w-full h-[200px] md:h-[600px] bg-light-glow pointer-events-none 
                dark:hidden z-0  mix-blend-multiply filter blur-2xl opacity-50"
            ></div>
            {/* Glowing Effect in Dark Mode */}
            <div
                className={`absolute transform w-full h-[200px] md:h-[600px] ${
                    isDarkMode ? "bg-dark-glow" : "hidden"
                } pointer-events-none z-0 mix-blend-lighten filter blur-2xl opacity-10`}
            ></div>

            {/* Navbar */}
            <Navbar ref={navbarRef} />
            {/* Main Content with dynamic height */}
            <main
                className="relative z-10 my-4 md:my-10"
                style={{ minHeight: height }}
            >
                <Router>
                    <Routes>
                        <Route path="/" element={<Places />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/places/new" element={<NewPlace />} />
                        <Route path="*" element={<Places />} />
                    </Routes>
                </Router>
            </main>
            {/* Footer */}
            <Footer ref={footerRef} />
        </div>
    );
}

export default App;
