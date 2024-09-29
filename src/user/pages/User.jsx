import PageWrapper from "../../shared/components/ui/PageWrapper";
import ProfileBio from "../components/user-bio/ProfileBio";
import PostsDisplay from "../components/user-posts/PostsDisplay";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function User() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const currentUser = useSelector((state) => state.auth.userId);
    const [postsData, setPostsData] = useState([]);
    console.log(error);

    useEffect(() => {
        const fetchPostByUserId = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/posts/user/${id}`
                );
                const fetchedPosts = response.data.posts;

                setPostsData(fetchedPosts);
                console.log(fetchedPosts);
                setError("");
            } catch (error) {
                if (error.response) {
                    // If the backend responds with an error message, extract it
                    const errorMessage =
                        error.response.data.message ||
                        "An error occurred while fetching posts.";
                    setError(errorMessage);
                } else {
                    // Handle network or unexpected errors
                    setError("An error occurred while fetching posts.");
                }
                setPostsData([]);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPostByUserId();
        }
    }, [id]);

    // const isOwner = id === currentUser; // Check if the current user owns the profile
    const isOwner = true; // For now, assuming the user is the owner

    return (
        <PageWrapper>
            <div className="w-full">
                <ProfileBio />

                <PostsDisplay
                    isOwner={isOwner}
                    posts={postsData}
                    loading={loading}
                    error={error}
                />
            </div>
        </PageWrapper>
    );
}
