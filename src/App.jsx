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
import fetchPost from "../loaders/fetchPost";
import fetchUser from "../loaders/fetchUser";
import ErrorPage from "./shared/pages/ErrorPage";
import { useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "./auth/authSlice";

export default function App() {
    const dispatch = useDispatch();
    let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    let isAdmin = false;

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");

        console.log(token);

        if (token) {
            // axiosInstance will automatically attach the token via the interceptor
            axiosInstance
                .get("/auth/me") // Make API call using axiosInstance
                .then((response) => {
                    const user = response.data;
                    dispatch(login(user)); // Set user in state
                    localStorage.setItem("user", JSON.stringify(user)); // Optionally update user info
                })
                .catch((error) => {
                    console.log("usli");
                    console.error("Token is invalid or expired:", error);
                    // If token is invalid or expired, remove it from localStorage
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    // Optionally, you can redirect to login here
                    // window.location.href = "/login";
                });
        }
    }, []);

    let routes = [];

    if (isLoggedIn) {
        routes = [
            {
                path: "/",
                element: <Layout />,
                errorElement: <ErrorPage />,
                children: [
                    { path: "/", element: <Posts /> },
                    { path: "/posts/new", element: <NewPost /> },
                    {
                        path: "/user/:id",
                        element: <User />,
                        loader: fetchUser,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: "/post/:id",
                        element: <Post />,
                        errorElement: <ErrorPage />,
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
                errorElement: <ErrorPage />,
                children: [
                    { path: "/", element: <Posts /> },
                    {
                        path: "/user/:id",
                        element: <User />,
                        loader: fetchUser,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: "/post/:id",
                        element: <Post />,
                        errorElement: <ErrorPage />,
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
                errorElement: <ErrorPage />,
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
