import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShareAlt,
    faHeart,
    faFlag,
    faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../shared/components/Ui/Button";

const OptionsBar = () => {
    return (
        <div className="flex justify-between items-center py-4 border-t bg-bg dark:bg-bg-dark rounded-t-sm mt-8">
            {/* Report Button */}
            <Button
                variant="outline"
                className="flex items-center gap-2 text-text dark:text-text-dark self-end"
            >
                <FontAwesomeIcon icon={faFlag} />
                <span>Report</span>
            </Button>
            {/* Left Side Buttons */}
            <div className="flex items-center gap-4">
                {/* Share Button */}
                <Button
                    variant="outline"
                    className="flex items-center gap-2 text-text dark:text-text-dark"
                >
                    <FontAwesomeIcon icon={faShareAlt} />
                    <span>Share</span>
                </Button>

                {/* Save Button */}
                <Button
                    variant="outline"
                    className="flex items-center gap-2 text-text dark:text-text-dark "
                >
                    <FontAwesomeIcon icon={faBookmark} />
                    <span>Save</span>
                </Button>

                {/* Like Button */}
                <Button
                    variant="outline"
                    className="flex items-center gap-2 text-text dark:text-text-dark"
                >
                    <FontAwesomeIcon icon={faHeart} className="text-red-600" />
                    <span>Like</span>
                </Button>
            </div>
        </div>
    );
};

export default OptionsBar;
