import React, { useState } from "react";
import icons from "../../../shared/util/importIcons"; // Adjust the path as necessary

const tags = [
    { id: 1, label: "Hiking", icon: icons.HikingIcon },
    { id: 2, label: "Beach", icon: icons.BeachIcon },
    { id: 3, label: "Urban", icon: icons.UrbanIcon },
    { id: 4, label: "Mountain", icon: icons.MountainIcon },
    { id: 5, label: "Adventure", icon: icons.AdventureIcon },
    { id: 6, label: "Camping", icon: icons.CampingIcon },
    { id: 7, label: "Travel", icon: icons.TravelIcon },
    { id: 8, label: "Nature", icon: icons.NatureIcon },
    { id: 9, label: "Photo", icon: icons.PhotographyIcon },
    { id: 10, label: "Fitness", icon: icons.FitnessIcon },
    { id: 11, label: "Food", icon: icons.FoodIcon },
    { id: 12, label: "Music", icon: icons.MusicIcon },
    { id: 13, label: "Art", icon: icons.ArtIcon },
    { id: 14, label: "Sports", icon: icons.SportsIcon },
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
                        <img src={tag.icon} alt={tag.label} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
