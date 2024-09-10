import Stats from "./Stats";
import Avatar from "../../../shared/components/Ui/Avatar";
import ProfileOptions from "./ProfileOptions";
import Bio from "./Bio";

export default function ProfileBio() {
    return (
        <div className="flex items-center gap-x-5 md:gap-x-10 pb-3 md:pb-6 px-0 md:px-4">
            <div>
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
        </div>
    );
}
