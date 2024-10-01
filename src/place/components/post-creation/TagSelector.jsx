import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed and imported
import icons from "../../../shared/util/importIcons"; // Adjust the path as necessary
import useLoading from "../../../shared/hooks/useLoading";
import Fallback from "../../../shared/components/ui/Fallback";
import Loader from "../../../shared/components/ui/Loader";

const TagSelector = ({ onTagsChange }) => {
    const [tags, setTags] = useState([]); // State for storing fetched tags
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [getTagsRequest, loading] = useLoading(async () => {
        const response = await axios.get(
            "http://localhost:3000/api/tags" // Change to your login API endpoint
        );
        return response;
    });

    // Fetch tags from API when component mounts
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await getTagsRequest();
                const tags = response.data.tags;
                setTags(tags);
            } catch (error) {
                const errorMsg = error.response?.data.message || "Login failed";
                setErrorMessage(errorMsg);
            }
        };

        fetchTags();
    }, []); // Empty dependency array ensures this runs only once

    const toggleTagSelection = (tag) => {
        setSelectedTags((prevSelected) => {
            const newSelected = prevSelected.includes(tag)
                ? prevSelected.filter((t) => t !== tag)
                : [...prevSelected, tag];

            // Use setTimeout to defer the state update
            setTimeout(() => {
                onTagsChange(newSelected); // Update immediately on selection
            }, 0);
            return newSelected;
        });
    };

    let content = "";

    if (loading) {
        content = <Loader customClasses="my-10"></Loader>;
    } else {
        if (errorMessage) {
            content = (
                <Fallback customClasses="my-10">
                    <div>{errorMessage}</div>
                </Fallback>
            );
        } else if (tags.length == 0) {
            content = (
                <Fallback>
                    <div>There are no available tags</div>
                </Fallback>
            );
        } else {
            content = (
                <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm md:text-base">
                    {tags.map((tag) => (
                        <div
                            key={tag.id}
                            onClick={() => toggleTagSelection(tag.id)}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition duration-200 ease-in-out justify-center ${
                                selectedTags.includes(tag.id)
                                    ? "bg-primary text-text-dark border-border dark:border-border-dark"
                                    : "bg-bg dark:bg-hover-dark text-text dark:text-text-dark border-border dark:border-border-dark"
                            }`}
                        >
                            <span className="mr-3">{tag.name}</span>
                            <img src={icons[tag.icon]} alt={tag.name} />
                        </div>
                    ))}
                </div>
            );
        }
    }

    return <div>{content}</div>;
};

export default TagSelector;
