import axios from "axios";

const fetchPost = async ({ params }) => {
    const postId = params.id; // Get the post ID from the route parameters

    try {
        const response = await axios.get(
            `http://localhost:3000/api/posts/${postId}`
        );
        const postData = response.data.post;

        console.log(postData);
        return postData; // This will include both post and user data
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error; // You can handle the error as needed
    }
};

export default fetchPost;
