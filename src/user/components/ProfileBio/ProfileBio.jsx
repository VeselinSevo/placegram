import Stats from "./Stats";
import Avatar from "../../../shared/components/Ui/Avatar";
import Options from "./Options";

export default function ProfileBio() {
    return (
        <div className="m-auto flex items-center gap-x-5 text-gray-900 dark:text-white w-full md:max-w-4xl px-4 md:px-0">
            <div>
                <Avatar
                    src={"/places/thumbnail-images/place1.webp"}
                    alt={"User this and that"}
                    customClasses="w-24 h-24"
                ></Avatar>
            </div>
            <div>
                <Options></Options>
                <Stats></Stats>
            </div>
        </div>
    );
}
