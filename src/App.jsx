import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Places from "./place/pages/Places";
import NewPlace from "./place/pages/NewPlace";
import User from "./user/pages/User";
import Place from "./place/pages/Place";
import Login from "./auth/pages/Login/Login";
import Register from "./auth/pages/Register/Register";
import Layout from "./Layout";
import AdminLayout from "./AdminLayout";

const fetchPlace = async ({ params }) => {
    // Sample placeData with tagged people
    const placeData = {
        id: "1234567890",
        creator: {
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Use the Layout component
        children: [
            { path: "/", element: <Places /> },
            { path: "/places/new", element: <NewPlace /> },
            { path: "/user/:id", element: <User /> },
            { path: "/place/:id", element: <Place />, loader: fetchPlace },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "*", element: <Places /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />, // Use the AdminLayout for admin routes
        // children: [
        //     { path: "dashboard", element: <AdminDashboard /> }, // Example admin dashboard route
        //     { path: "users", element: <AdminUsers /> }, // Example admin users management route
        //     // Add more admin routes here
        // ],
    },
]);

export default function App() {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}
