import axios from "axios";

const fetchUser = async ({ params }) => {
    const userId = params.id; // Get the post ID from the route parameters

    try {
        const response = await axios.get(
            `http://localhost:3000/api/users/${userId}`
        );
        const userData = response.data.user;

        console.log(userData);
        return userData; // This will include both post and user data
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // You can handle the error as needed
    }
};

export default fetchUser;
