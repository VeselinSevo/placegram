import PageWrapper from "../../shared/components/ui/PageWrapper";
import ProfileBio from "../components/user-bio/ProfileBio";
import PostsDisplay from "../components/user-posts/PostsDisplay";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function User() {
    const { userId } = useParams();
    const currentUser = useSelector((state) => state.auth.userId);
    // const isOwner = userId === currentUser;
    const isOwner = true;

    return (
        <PageWrapper>
            <div className="w-full">
                <ProfileBio />
                <PostsDisplay isOwner={isOwner} />
            </div>
        </PageWrapper>
    );
}
