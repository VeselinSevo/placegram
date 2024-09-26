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
        <div className="flex justify-between items-center py-4 border-t border-hover dark:border-hover-dark rounded-t-sm mt-8">
            {/* Report Button */}
            <Button
                variant="outline"
                customClasses="flex items-center gap-2 text-text dark:text-text-dark self-end text-sm md:text-base"
            >
                <FontAwesomeIcon icon={faFlag} />
                <span>Report</span>
            </Button>
            {/* Left Side Buttons */}
            <div className="flex items-center gap-4">
                {/* Share Button */}
                <Button
                    variant="outline"
                    customClasses="flex items-center gap-2 text-text dark:text-text-dark text-sm md:text-base"
                >
                    <FontAwesomeIcon icon={faShareAlt} />
                    <span>Share</span>
                </Button>

                {/* Save Button */}
                <Button
                    variant="outline"
                    customClasses="flex items-center gap-2 text-text dark:text-text-dark text-sm md:text-base"
                >
                    <FontAwesomeIcon icon={faBookmark} />
                    <span>Save</span>
                </Button>

                {/* Like Button */}
                <Button
                    variant="outline"
                    customClasses="flex items-center gap-2 text-text dark:text-text-dark text-sm md:text-base"
                >
                    <FontAwesomeIcon icon={faHeart} className="text-red-600" />
                    <span>Like</span>
                </Button>
            </div>
        </div>
    );
};

export default OptionsBar;
