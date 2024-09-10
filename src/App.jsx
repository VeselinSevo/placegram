import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Places from "./place/pages/Places";
import NewPlace from "./place/pages/NewPlace";
import User from "./user/pages/User";
import Place from "./place/pages/Place";
import Login from "./auth/pages/Login/Login";
import Register from "./auth/pages/Register/Register";
import Layout from "./Layout";
import AdminLayout from "./AdminLayout";
import { useSelector } from "react-redux";

const fetchPlace = async ({ params }) => {
    // Sample placeData with tagged people
    const placeData = {
        id: "1234567890",
        creator: {
            id: "1",
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
                id: "2",
                username: "jane_doe",
                profilePicture: "/users/profile-images/user1.jpg",
            },
            {
                id: "3",
                username: "alice_smith",
                profilePicture: "/users/profile-images/user1.jpg",
            },
        ],
    };

    return placeData;
};

export default function App() {
    const isLoggedIn = useSelector((state) => state.auth.value.isLoggedIn);
    // const isLoggedIn = true;
    let isAdmin = false;

    let routes = [];

    if (isLoggedIn) {
        routes = [
            {
                path: "/",
                element: <Layout />, // Use the Layout component
                children: [
                    { path: "/", element: <Places /> },
                    { path: "/places/new", element: <NewPlace /> },
                    { path: "/user/:id", element: <User /> },
                    {
                        path: "/place/:id",
                        element: <Place />,
                        loader: fetchPlace,
                    },
                    { path: "*", element: <Places /> },
                ],
            },
        ];
    } else {
        routes = [
            {
                path: "/",
                element: <Layout />, // Use the Layout component
                children: [
                    { path: "/", element: <Places /> },
                    { path: "/user/:id", element: <User /> },
                    {
                        path: "/place/:id",
                        element: <Place />,
                        loader: fetchPlace,
                    },
                    { path: "/login", element: <Login /> },
                    { path: "/register", element: <Register /> },
                    { path: "*", element: <Places /> },
                ],
            },
        ];
    }

    if (isAdmin) {
        routes = [
            {
                path: "/admin",
                element: <AdminLayout />, // Use the AdminLayout for admin routes
            },
        ];
    }

    const router = createBrowserRouter(routes);

    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}
