import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Button from "../../../shared/components/Ui/Button";
import Modal from "../../../shared/components/Ui/Modal";
import MoreOptionsOption from "./MoreOptionsOption";

export default function Options() {
    const [areOptionsOpen, setAreOptionsOpen] = useState(false);

    const OPTIONS = ["Share", "Block", "Report"];

    return (
        <div className="mb-2 md:mb-3 flex items-center gap-x-5 text-text dark:text-text-dark">
            <div>
                <span className="mr-1 font-bold text-lg">@veselinsevo</span>
            </div>
            <div className="flex gap-x-2 md:gap-x-3 items-center align-middle">
                <Button size="sm" variant="secondary">
                    Follow
                </Button>
                <FontAwesomeIcon
                    icon={faEllipsis}
                    onClick={() => setAreOptionsOpen(true)}
                    className="cursor-pointer"
                />
            </div>
            {areOptionsOpen && (
                <Modal
                    onClose={() => setAreOptionsOpen(false)}
                    customClasses="!w-auto !p-0"
                    disableHover // Disable the hover effect
                >
                    {OPTIONS.map((option, index) => (
                        <MoreOptionsOption
                            key={index}
                            optionText={option}
                            isLast={index === OPTIONS.length - 1}
                        />
                    ))}
                </Modal>
            )}
        </div>
    );
}
