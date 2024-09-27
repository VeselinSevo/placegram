import React from "react";
import icons from "../../util/importIcons"; // Adjust the path as necessary

const TagDisplay = ({ tags }) => {
    return (
        <div className="flex flex-wrap gap-x-2 gap-y-4">
            {tags.map((tag, index) => (
                <div key={index} className="flex items-center ">
                    <img
                        src={icons[tag.iconLocation]}
                        alt={tag.name}
                        className="mr-1 w-4 h-4"
                    />
                    <span className="bg-hover dark:bg-hover-dark text-text dark:text-text-dark text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                        {tag.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default TagDisplay;
