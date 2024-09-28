import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "../../../shared/components/ui/Button";
import OptionsModal from "../../../shared/components/ui/OptionsModal";

export default function ProfileOptions(props) {
    const [openProfileOptions, setOpenProfileOptions] = useState(false);
    const [openUserOptions, setOpenUserOptions] = useState(false);

    const isOwner = false;

    const PROFILE_OPTIONS = [
        { text: "Share", onClick: () => console.log("Share clicked") },
        { text: "Report", onClick: () => console.log("Report clicked") },
        {
            text: "Block",
            onClick: () => console.log("Block clicked"),
            style: "danger",
        },
        { text: "Cancel", onClick: () => setOpenProfileOptions(false) },
    ];

    const USER_OPTIONS = [
        {
            text: "Settings & Privacy",
            onClick: () => console.log("Settings & Privacy clicked"),
        },
        {
            text: "Edit Profile",
            onClick: () => console.log("Edit Profile clicked"),
        },
        {
            text: "Log out",
            onClick: () => console.log("Log out clicked"),
            style: "danger",
        },
        {
            text: "Cancel",
            onClick: () => setOpenUserOptions(false),
        },
    ];

    return (
        <div className="mb-3 md:mb-4 flex items-center gap-x-5 text-text dark:text-text-dark">
            <div>
                <span className="mr-1 font-bold text-lg">
                    {props.user.username}
                </span>
            </div>
            <div className="flex gap-x-3 items-center align-middle">
                {!isOwner && (
                    <div>
                        <Button size="sm" variant="primary">
                            Follow
                        </Button>
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            onClick={() => setOpenProfileOptions(true)}
                            className="cursor-pointer mx-3"
                        />
                    </div>
                )}

                {isOwner && (
                    <FontAwesomeIcon
                        icon={faGear}
                        onClick={() => setOpenUserOptions(true)}
                        className="cursor-pointer"
                    />
                )}
            </div>
            {openProfileOptions && (
                <OptionsModal
                    options={PROFILE_OPTIONS}
                    onClose={() => setOpenProfileOptions(false)}
                />
            )}
            {openUserOptions && (
                <OptionsModal
                    options={USER_OPTIONS}
                    onClose={() => setOpenUserOptions(false)}
                />
            )}
        </div>
    );
}
