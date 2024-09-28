import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Posts from "./place/pages/Posts";
import NewPost from "./place/pages/NewPost";
import User from "./user/pages/User";
import Post from "./place/pages/Post"; // Changed 'Place' to 'Post'
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import Layout from "./layout/Layout";
import AdminLayout from "./layout/AdminLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import fetchPost from "../loaders/fetchPost";
import fetchUser from "../loaders/fetchUser";

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
                    { path: "/user/:id", element: <User />, loader: fetchUser },
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
