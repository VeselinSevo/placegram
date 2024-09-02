import PageWrapper from "../../shared/components/Ui/PageWrapper";
import ProfileBio from "../components/ProfileBio/ProfileBio";
import PlaceDisplay from "../components/PlaceDisplay";

export default function User() {
    return (
        <PageWrapper>
            <div className="w-full">
                <ProfileBio> </ProfileBio>
                <PlaceDisplay></PlaceDisplay>
            </div>
        </PageWrapper>
    );
}
