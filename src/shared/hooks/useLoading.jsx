import { useState } from "react";

const useLoading = (asyncFunction) => {
    const [loading, setLoading] = useState(false);

    const execute = async (...args) => {
        setLoading(true);
        try {
            const response = await asyncFunction(...args);
            return response;
        } finally {
            // Add a delay of 5 seconds before setting loading to false
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setLoading(false);
        }
    };

    return [execute, loading];
};

export default useLoading;
