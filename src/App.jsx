import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Posts from "./place/pages/Posts";
import NewPost from "./place/pages/NewPost";
import User from "./user/pages/User";
import Post from "./place/pages/Post"; // Changed 'Place' to 'Post'
import Login from "./auth/pages/Login/Login";
import Register from "./auth/pages/Register/Register";
import Layout from "./Layout";
import AdminLayout from "./AdminLayout";
import { useSelector } from "react-redux";

const fetchPost = async ({ params }) => {
    const postData = {
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

    return postData;
};

export default function App() {
    let isLoggedIn = useSelector((state) => state.auth.value.isLoggedIn);
    // isLoggedIn = true;
    let isAdmin = false;

    let routes = [];

    if (isLoggedIn) {
        routes = [
            {
                path: "/",
                element: <Layout />,
                children: [
                    { path: "/", element: <Posts /> },
                    { path: "/posts/new", element: <NewPost /> },
                    { path: "/user/:id", element: <User /> },
                    {
                        path: "/post/:id",
                        element: <Post />,
                        loader: fetchPost,
                    },
                    { path: "*", element: <Posts /> },
                ],
            },
        ];
    } else {
        routes = [
            {
                path: "/",
                element: <Layout />,
                children: [
                    { path: "/", element: <Posts /> },
                    { path: "/user/:id", element: <User /> },
                    {
                        path: "/post/:id",
                        element: <Post />,
                        loader: fetchPost,
                    },
                    { path: "/login", element: <Login /> },
                    { path: "/register", element: <Register /> },
                    { path: "*", element: <Posts /> },
                ],
            },
        ];
    }

    if (isAdmin) {
        routes = [
            {
                path: "/admin",
                element: <AdminLayout />,
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
