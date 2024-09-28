import PostItem from "./PostItem";
import Card from "../../shared/components/ui/Card";
import { useEffect, useState } from "react";
import axios from "axios";

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

    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col justify-center place-items-center gap-8 md:gap-8">
            {posts.length > 0 ? (
                posts.map((post) => <PostItem post={post} key={post.id} />)
            ) : (
                <Card>
                    <div className="flex flex-col items-center justify-center p-3">
                        <h3>
                            There are no posts shared with you. Let's add some
                            friends!
                        </h3>
                        <button>Add friend</button>
                    </div>
                </Card>
            )}
        </div>
    );
}
