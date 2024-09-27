import Stats from "./Stats";
import Avatar from "../../../shared/components/ui/Avatar";
import ProfileOptions from "./ProfileOptions";
import Bio from "./Bio";
import { useState } from "react";
import ProfilePhotoModal from "./ProfilePhotoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProfileBio() {
    const [openProfilePhotoModal, setOpenProfilePhotoModal] = useState(false);
    return (
        <div className="flex items-center gap-x-5 md:gap-x-10 pb-3 md:pb-6 px-0 md:px-4">
            <div
                onClick={() => {
                    setOpenProfilePhotoModal(true);
                }}
                className="relative hover:opacity-85 cursor-pointer"
            >
                <div className="absolute inset-0 flex items-center justify-center w-full h-full text-bg-dark text-3xl z-10 opacity-0 hover:opacity-100 hover:pointer-events-auto">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <Avatar
                    src={"/places/thumbnail-images/place1.webp"}
                    alt={"User this and that"}
                    customClasses="w-20 h-20 md:w-32 md:h-32"
                />
            </div>
            <div>
                <ProfileOptions />
                <Stats />
                <Bio />
            </div>
            {openProfilePhotoModal && (
                <ProfilePhotoModal
                    onClose={() => setOpenProfilePhotoModal(false)}
                ></ProfilePhotoModal>
            )}
        </div>
    );
}
