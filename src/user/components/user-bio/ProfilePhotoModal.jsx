import Modal from "../../../shared/components/ui/Modal";
import Avatar from "../../../shared/components/ui/Avatar";
import { useEffect } from "react";
import {
    disableBodyScroll,
    enableBodyScroll,
} from "../../../shared/util/bodyScroll";
import ProfilePhotoOptions from "./ProfilePhotoOptions";

export default function ProfilePhotoModal(props) {
    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);
    return (
        <Modal onClose={props.onClose}>
            <Avatar
                src={"/places/thumbnail-images/place1.webp"}
                alt={"User this and that"}
                customClasses="w-20 h-20 md:w-32 md:h-32"
            />
            <ProfilePhotoOptions></ProfilePhotoOptions>
        </Modal>
    );
}
