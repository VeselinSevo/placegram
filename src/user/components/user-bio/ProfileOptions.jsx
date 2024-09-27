import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "../../../shared/components/ui/Button";
import OptionsModal from "../../../shared/components/ui/OptionsModal";

export default function ProfileOptions() {
    const [areOptionsOpen, setAreOptionsOpen] = useState(false);

    const OPTIONS = [
        { text: "Share", onClick: () => console.log("Share clicked") },
        { text: "Block", onClick: () => console.log("Block clicked") },
        { text: "Report", onClick: () => console.log("Report clicked") },
    ];

    return (
        <div className="mb-3 md:mb-4 flex items-center gap-x-5 text-text dark:text-text-dark">
            <div>
                <span className="mr-1 font-bold text-lg">@veselinsevo</span>
            </div>
            <div className="flex gap-x-3 items-center align-middle">
                <Button size="sm" variant="primary">
                    Follow
                </Button>
                <FontAwesomeIcon
                    icon={faEllipsis}
                    onClick={() => setAreOptionsOpen(true)}
                    className="cursor-pointer"
                />
            </div>
            {areOptionsOpen && (
                <OptionsModal
                    options={OPTIONS}
                    onClose={() => setAreOptionsOpen(false)}
                />
            )}
        </div>
    );
}
