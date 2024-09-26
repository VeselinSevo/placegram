import PostItem from "./PostItem";
import Card from "../../shared/components/Ui/Card";

export default function PlacesListView(props) {
    return (
        <div className="grid grid-cols-3 gap-1 justify-center place-items-center md:gap-2 ">
            {props.posts.length > 0 ? (
                props.posts.map((post) => (
                    <PostItem
                        post={post}
                        isOwner={props.isOwner}
                        key={post.id}
                    />
                ))
            ) : (
                <Card className="h-full flex flex-col">
                    <div className="flex flex-col items-center justify-center p-3">
                        <h3>You have no posts shared. Share one</h3>
                        <button>Add post</button>
                    </div>
                </Card>
            )}
        </div>
    );
}
