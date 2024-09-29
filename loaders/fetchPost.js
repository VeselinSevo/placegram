import axios from "axios";

const fetchPost = async ({ params }) => {
    const postId = params.id; // Get the post ID from the route parameters

    try {
        const response = await axios.get(
            `http://localhost:3000/api/posts/${postId}`
        );
        const postData = response.data.post;
        return postData; // This will include both post and user data
    } catch (error) {
        if (error.response) {
            // Extract error message from the backend's response
            const errorMessage =
                error.response.data.message || "An error occurred";

            throw new Error(errorMessage);
        }
    }
};

export default fetchPost;
