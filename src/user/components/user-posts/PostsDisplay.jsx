import PostsListView from "./PostsListView";
import PostsMapView from "./PostsMapView";
import Loader from "../../../shared/components/ui/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Fallback from "../../../shared/components/ui/Fallback";
import useLoading from "../../../shared/hooks/useLoading";
import { useEffect } from "react";
import axios from "axios";

export default function PostsDisplay({ isOwner, userId }) {
    const [view, setView] = useState("grid"); // "grid" or "map"
    // useLoading hook for handling fetch request and loading state
    const [getPostsRequest, loading] = useLoading(async (userId) => {
        const response = await axios.get(
            `http://localhost:3000/api/posts/user/${userId}`
        );
        return response.data.posts;
    });

    const [postsData, setPostsData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchPostByUserId = async () => {
        try {
            const fetchedPosts = await getPostsRequest(userId);
            setPostsData(fetchedPosts);
            setErrorMessage(""); // Clear any previous errors
        } catch (error) {
            if (error.response) {
                // Handle backend error response
                const errorMessage =
                    error.response.data.message ||
                    "An error occurred while fetching posts.";
                setErrorMessage(errorMessage);
            } else {
                // Handle network or unexpected errors
                setErrorMessage("An error occurred while fetching posts.");
            }
            setPostsData([]); // Clear posts if there's an error
        }
    };

    const handlePostDeleted = () => {
        // Logic to re-fetch posts or update the state
        console.log("A post has been deleted. Re-fetching posts...");
        fetchPostByUserId(); // Or however you fetch posts
    };

    useEffect(() => {
        if (userId) {
            fetchPostByUserId();
        }
    }, [userId]);

    let postDisplayContent = "";

    if (!loading) {
        if (postsData.length > 0) {
            if (view === "grid") {
                postDisplayContent = (
                    <PostsListView
                        posts={postsData}
                        isOwner={isOwner}
                        handlePostDeleted={handlePostDeleted}
                    />
                );
            } else {
                postDisplayContent = <PostsMapView posts={postsData} />;
            }
        } else {
            postDisplayContent = (
                <Fallback>
                    <h3 className="font-semibold">
                        <FontAwesomeIcon
                            icon={faCamera}
                            className="text-primary h-7 w-7"
                        />
                    </h3>
                    <div className="font-semibold">No posts yet</div>
                </Fallback>
            );
        }
    } else {
        postDisplayContent = <Loader></Loader>;
    }

    if (errorMessage) {
        postDisplayContent = (
            <Fallback>
                <h3 className="font-semibold">
                    <FontAwesomeIcon
                        icon={faCamera}
                        className="text-primary h-7 w-7"
                    />
                </h3>
                <div className="font-semibold">{errorMessage}</div>
            </Fallback>
        );
    }

    return (
        <div className="">
            <div className="flex justify-center gap-x-3 p-2">
                <div
                    className={`cursor-pointer hover:text-hover-dark dark:hover:text-hover ${
                        view === "grid" ? "text-primary" : ""
                    }`}
                    onClick={() => setView("grid")}
                >
                    Grid
                </div>
                <div
                    className={`cursor-pointer hover:text-hover-dark dark:hover:text-hover ${
                        view === "map" ? "text-primary" : ""
                    }`}
                    onClick={() => setView("map")}
                >
                    Map
                </div>
            </div>
            <hr className="border-border dark:border-border-dark"></hr>

            <div className="w-full m-auto my-4 md:my-5 md:max-w-4xl">
                {postDisplayContent}
            </div>
        </div>
    );
}
