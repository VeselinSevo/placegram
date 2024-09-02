import Stats from "./Stats";
import Avatar from "../../../shared/components/Ui/Avatar";
import Options from "./Options";
import Bio from "./Bio";

export default function ProfileBio() {
    return (
        <div className="flex items-center gap-x-5 md:gap-x-10 px-4 md:px-0">
            <div>
                <Avatar
                    src={"/places/thumbnail-images/place1.webp"}
                    alt={"User this and that"}
                    customClasses="w-20 h-20 md:w-32 md:h-32"
                ></Avatar>
            </div>
            <div>
                <Options />
                <Stats />
                <Bio />
            </div>
        </div>
    );
}
