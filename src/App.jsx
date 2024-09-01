import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Places from "./place/pages/Places";
import NewPlace from "./place/pages/NewPlace";
import User from "./user/pages/User";
import Place from "./place/pages/Place";
import Login from "./auth/pages/Login/Login";
import Register from "./auth/pages/Register/Register";
import Navbar from "./shared/components/Navigation/Navbar";
import Footer from "./shared/components/Footer/Footer";
import useDynamicHeight from "./hooks/useDynamicHeight";

// Mock API call for loaders
// const fetchUser = async ({ params }) => {
//     // Replace with your API call logic
//     const response = await fetch(`/api/users/${params.id}`);
//     const userData = await response.json();
//     return userData;
// };

const fetchPlace = async ({ params }) => {
    // Replace with your API call logic
    // const response = await fetch(`/api/places/${params.id}`);
    // const placeData = await response.json();
    // Sample placeData with tagged people
    const placeData = {
        id: "1234567890",
        user: {
            username: "john_doe",
            profilePicture: "/users/profile-images/user1.jpg",
            email: "john@example.com",
        },
        title: "Sunset at Grand Canyon",
        location: {
            latitude: 36.1069652,
            longitude: -112.1129972,
            address: "Grand Canyon, Arizona, USA",
        },
        image: "/places/thumbnail-images/place1.webp",
        images: [
            "/places/thumbnail-images/place1.webp",
            "/places/thumbnail-images/place1.webp",
            "/places/thumbnail-images/place1.webp",
            "/places/thumbnail-images/place1.webp",
        ],
        description:
            "Witnessed an amazing sunset at the Grand Canyon. The view was breathtaking, with the colors of the sky reflecting off the canyon walls.",
        country: "USA",
        visitDate: "2024-08-13T18:30:00Z",
        postDate: "2024-08-14T10:00:00Z",
        taggedPeople: [
            {
                username: "jane_doe",
                profilePicture: "/users/profile-images/user1.jpg",
            },
            {
                username: "alice_smith",
                profilePicture: "/users/profile-images/user1.jpg",
            },
        ],
    };

    return placeData;
};

// Define routes with loaders
const router = createBrowserRouter([
    {
        path: "/",
        element: <Places />,
    },
    {
        path: "/user/:id",
        element: <User />,
    },
    {
        path: "/place/:id",
        element: <Place />,
        loader: fetchPlace,
    },
    {
        path: "/places/new",
        element: <NewPlace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "*",
        element: <Places />,
    },
]);

export default function App() {
    const { height, navbarRef, footerRef } = useDynamicHeight();
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("mode") === "dark"
    );

    useEffect(() => {
        const handleClassChange = () => {
            setIsDarkMode(document.body.classList.contains("dark"));
        };

        const observer = new MutationObserver(handleClassChange);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

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
                    isDarkMode ? "bg-dark-glow" : "hidden"
                } pointer-events-none z-0 mix-blend-lighten filter blur-2xl opacity-10`}
            ></div>

            {/* Navbar */}
            <Navbar ref={navbarRef} />

            {/* Main Content with dynamic height */}
            <main
                className="flex-grow flex flex-col justify-center relative z-10 my-4 md:my-10"
                style={{ minHeight: height }}
            >
                <RouterProvider router={router} />
            </main>

            {/* Footer */}
            <Footer ref={footerRef} />
        </div>
    );
}
