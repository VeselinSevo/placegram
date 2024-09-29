import { useEffect, useState } from "react";
import axios from "axios";

import PostItem from "./PostItem";
import Fallback from "../../shared/components/ui/Fallback";
import Card from "../../shared/components/ui/Card";
import Loader from "../../shared/components/ui/Loader";
import Button from "../../shared/components/ui/Button";

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/posts"
                ); // Adjust the URL based on your backend route
                setPosts(response.data.posts);
            } catch (err) {
                setError("Failed to fetch posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    let postsContent = "";

    if (loading) {
        postsContent = <Loader></Loader>;
    } else {
        if (posts.length > 0) {
            postsContent = posts.map((post) => (
                <PostItem post={post} key={post.id} />
            ));
        } else {
            postsContent = (
                <Fallback>
                    <h3 className="font-semibold">
                        There are no posts shared with you. Let's{" "}
                        <span className="text-primary">follow </span>
                        some people!
                    </h3>
                    <Button customClasses="justify-self-center !w-52">
                        Go to Explore
                    </Button>
                </Fallback>
            );
        }
    }

    return (
        <div className="flex flex-col justify-center place-items-center gap-8 md:gap-8">
            {postsContent}
        </div>
    );
}
