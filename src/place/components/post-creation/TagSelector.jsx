import React, { useState } from "react";
import icons from "../../../shared/util/importIcons"; // Adjust the path as necessary

const tags = [
    { id: 1, name: "Hiking", icon: "hiking" },
    { id: 2, name: "Beach", icon: "beach" },
    { id: 3, name: "Urban", icon: "urban" },
    { id: 4, name: "Mountain", icon: "mountain" },
    { id: 5, name: "Adventure", icon: "advanture" },
    { id: 6, name: "Camping", icon: "camping" },
    { id: 7, name: "Travel", icon: "travel" },
    { id: 8, name: "Nature", icon: "nature" },
    { id: 9, name: "Photo", icon: "photography" },
    { id: 10, name: "Fitness", icon: "fitness" },
    { id: 11, name: "Food", icon: "food" },
    { id: 12, name: "Music", icon: "music" },
    { id: 13, name: "Art", icon: "art" },
    { id: 14, name: "Sports", icon: "sports" },
];

const TagSelector = ({ onTagsChange }) => {
    const [selectedTags, setSelectedTags] = useState([]);

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

    return (
        <div>
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
                        <span className="mr-3">{tag.label}</span>
                        <img src={icons[tag.icon]} alt={tag.label} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
