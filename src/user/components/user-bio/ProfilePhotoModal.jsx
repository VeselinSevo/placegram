import Modal from "../../../shared/components/ui/Modal";
import Avatar from "../../../shared/components/ui/Avatar";
import { useEffect } from "react";
import {
    disableBodyScroll,
    enableBodyScroll,
} from "../../../shared/util/bodyScroll";
import ProfilePhotoOptions from "./ProfilePhotoOptions";

export default function ProfilePhotoModal(props) {
    console.log(props);
    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);
    return (
        <Modal
            onClose={props.onClose}
            customClasses="!w-auto !p-0 !pt-4"
            disableHover
        >
            <div className="flex flex-col justify-center items-center gap-5">
                <Avatar
                    src={props.user.profilePicture}
                    alt={"User this and that"}
                    customClasses="w-20 h-20 md:w-32 md:h-32"
                />
                <ProfilePhotoOptions
                    onClose={props.onClose}
                ></ProfilePhotoOptions>
            </div>
        </Modal>
    );
}
