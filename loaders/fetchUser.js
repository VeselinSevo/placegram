import axios from "axios";

const fetchUser = async ({ params }) => {
    const userId = params.id; // Get the user ID from the route parameters

    try {
        const response = await axios.get(
            `http://localhost:3000/api/users/${userId}`
        );
        const userData = response.data.user;
        return userData; // Return the user data if successful
    } catch (error) {
        if (error.response) {
            // Extract error message from the backend's response
            const errorMessage =
                error.response.data.message || "An error occurred";

            throw new Error(errorMessage);
        }
    }
};

export default fetchUser;
