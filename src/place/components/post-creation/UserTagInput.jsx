import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useLoading from "../../../shared/hooks/useLoading";
import Loader from "../../../shared/components/ui/Loader";
import Fallback from "../../../shared/components/ui/Fallback";

const UserTagInput = ({ onTagsChange, taggedUsers }) => {
    // Add taggedUserIds prop
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [getUsersRequest, loading] = useLoading(async (searchString) => {
        const taggedUserIds = taggedUsers.map((tag) => tag.id);
        const response = await axios.get(
            `http://localhost:3000/api/users/search?q=${searchString}`,
            {
                params: {
                    excludeIds: taggedUserIds.join(","), // Convert array to comma-separated string
                },
            }
        );
        return response;
    });

    useEffect(() => {
        setSelectedIndex(0);
    }, [suggestions]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim() !== "") {
            try {
                const response = await getUsersRequest(value);
                const users = response.data.users; // Assuming response.data contains the list of users
                setSuggestions(users); // Limit to max 4 users
            } catch (error) {
                console.error(error.message);
                const errorMsg =
                    error.response?.data.message || "Failed to fetch users";
                setErrorMessage(errorMsg);
            }
        } else {
            setSuggestions([]);
        }
    };

    const addTag = (user) => {
        if (!tags.some((tag) => tag.id === user.id)) {
            const newTags = [...tags, user];
            setTags(newTags);
            onTagsChange(newTags);
        }
        setInputValue("");
        setSuggestions([]);
        inputRef.current.focus();
    };

    const removeTag = (userId) => {
        const newTags = tags.filter((tag) => tag.id !== userId);
        setTags(newTags);
        onTagsChange(newTags);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            if (suggestions.length > 0) {
                addTag(suggestions[selectedIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        }
    };

    let content;

    if (loading) {
        content = (
            <div className="relative">
                <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="bg-primary text-text-dark px-2 py-1 rounded-full text-sm mb-4"
                        >
                            {tag.username}
                            <button
                                onClick={() => removeTag(tag.id)}
                                className="ml-2 font-bold"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full text-sm md:text-base p-2 border rounded bg-bg dark:bg-bg-dark text-text dark:text-text-dark"
                    placeholder="Type to search users..."
                />
                {suggestions.length > 0 && (
                    <ul className="absolute z-50 w-full text-sm md:text-base bg-bg dark:bg-bg-dark text-text dark:text-text-dark border rounded mt-1 max-h-40 overflow-y-auto">
                        <li className={`p-2`}>
                            <Loader customClasses="my-10" />
                        </li>
                    </ul>
                )}
            </div>
        );
    } else {
        if (errorMessage) {
            content = (
                <Fallback customClasses="my-10">
                    <div>{errorMessage}</div>
                </Fallback>
            );
        } else {
            content = (
                <div className="relative">
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="bg-primary text-text-dark px-2 py-1 rounded-full text-sm mb-4"
                            >
                                {tag.username}
                                <button
                                    onClick={() => removeTag(tag.id)}
                                    className="ml-2 font-bold"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="w-full text-sm md:text-base p-2 border rounded bg-bg dark:bg-bg-dark text-text dark:text-text-dark"
                        placeholder="Type to search users..."
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute z-50 w-full text-sm md:text-base bg-bg dark:bg-bg-dark text-text dark:text-text-dark border rounded mt-1 max-h-40 overflow-y-auto">
                            {suggestions.map((user, index) => (
                                <li
                                    key={user.id}
                                    onClick={() => addTag(user)}
                                    className={`p-2 cursor-pointer ${
                                        index === selectedIndex
                                            ? "dark:bg-hover-dark bg-hover text-text dark:text-text-dark"
                                            : "hover:bg-hover dark:hover:bg-hover-dark hover:text-text hover:dark:text-text-dark"
                                    }`}
                                >
                                    {user.username}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        }
    }

    return <div>{content}</div>;
};

export default UserTagInput;
