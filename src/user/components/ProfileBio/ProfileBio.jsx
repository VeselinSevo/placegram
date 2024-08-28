import Stats from "./Stats";
import Avatar from "../../../shared/components/Ui/Avatar";
import Options from "./Options";
import Bio from "./Bio";

export default function ProfileBio() {
    return (
        <div className="m-auto flex items-center gap-x-5 md:gap-x-10 text-text dark:text-text-dark w-full md:max-w-4xl px-4 md:px-0">
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
