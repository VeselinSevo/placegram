import React, { useState } from "react";

const TagSelector = ({ tags, onTagsChange }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleTagSelection = (tag) => {
        setSelectedTags((prevSelected) => {
            const newSelected = prevSelected.includes(tag)
                ? prevSelected.filter((t) => t !== tag)
                : [...prevSelected, tag];

            onTagsChange(newSelected); // Update immediately on selection
            return newSelected;
        });
    };

    return (
        <div>
            <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm md:text-base">
                {tags.map((tag) => (
                    <div
                        key={tag.id}
                        onClick={() => toggleTagSelection(tag.label)}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition duration-200 ease-in-out justify-center ${
                            selectedTags.includes(tag.label)
                                ? "bg-primary text-text-dark border-gray-300 dark:border-gray-600"
                                : "bg-bg dark:bg-hover-dark text-text dark:text-text-dark border-gray-300 dark:border-gray-600"
                        }`}
                    >
                        <span className="mr-3">{tag.label}</span>
                        <img src={tag.icon} alt={tag.label} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
