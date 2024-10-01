import PageWrapper from "../../shared/components/ui/PageWrapper";
import ProfileBio from "../components/user-bio/ProfileBio";
import PostsDisplay from "../components/user-posts/PostsDisplay";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function User() {
    const { id } = useParams();
    const currentUser = useSelector((state) => state.auth.user);

    // Check if the current user is the owner of the profile
    const isOwner = currentUser?.id === id;

    return (
        <PageWrapper>
            <div className="w-full">
                <ProfileBio isOwner={isOwner} />

                <PostsDisplay isOwner={isOwner} userId={id} />
            </div>
        </PageWrapper>
    );
}
