import PageWrapper from "../../shared/components/ui/PageWrapper";
import ProfileBio from "../components/user-bio/ProfileBio";
import PostsDisplay from "../components/user-posts/PostsDisplay";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function User() {
    const { id } = useParams(); // 'id' should match the dynamic URL parameter in your route
    const currentUser = useSelector((state) => state.auth.userId);
    const [postsData, setPostsData] = useState([]); // State to store fetched posts

    useEffect(() => {
        const fetchPostByUserId = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/posts/user/${id}` // Use id from useParams
                );
                const fetchedPosts = response.data.posts;
                console.log(fetchedPosts);
                setPostsData(fetchedPosts); // Save the posts in state
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        if (id) {
            fetchPostByUserId(); // Call the function if id exists
        }
    }, [id]); // Add id as a dependency to re-fetch when the URL changes

    // const isOwner = id === currentUser; // Check if the current user owns the profile
    const isOwner = true; // For now, assuming the user is the owner

    return (
        <PageWrapper>
            <div className="w-full">
                <ProfileBio />
                <PostsDisplay isOwner={isOwner} posts={postsData} />
            </div>
        </PageWrapper>
    );
}
