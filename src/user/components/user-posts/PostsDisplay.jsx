import PostsListView from "./PostsListView";
import PostsMapView from "./PostsMapView";
import Loader from "../../../shared/components/ui/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Fallback from "../../../shared/components/ui/Fallback";

export default function PostsDisplay({ posts, isOwner, loading, error }) {
    const [view, setView] = useState("grid"); // "grid" or "map"

    let postDisplayContent = "";

    if (!loading) {
        if (posts.length > 0) {
            if (view === "grid") {
                postDisplayContent = (
                    <PostsListView posts={posts} isOwner={isOwner} />
                );
            } else {
                postDisplayContent = (
                    <PostsMapView posts={posts} isOwner={isOwner} />
                );
            }
        } else {
            postDisplayContent = (
                <Fallback>
                    <h3 className="font-semibold">
                        <FontAwesomeIcon
                            icon={faCamera}
                            className="text-primary h-7 w-7"
                        />
                    </h3>
                    <div className="font-semibold">No posts yet</div>
                </Fallback>
            );
        }
    } else {
        postDisplayContent = <Loader></Loader>;
    }

    if (error) {
        postDisplayContent = (
            <Fallback>
                <h3 className="font-semibold">
                    <FontAwesomeIcon
                        icon={faCamera}
                        className="text-primary h-7 w-7"
                    />
                </h3>
                <div className="font-semibold">{error}</div>
            </Fallback>
        );
    }

    return (
        <div className="">
            <div className="flex justify-center gap-x-3 p-2">
                <div
                    className={`cursor-pointer hover:text-hover-dark dark:hover:text-hover ${
                        view === "grid" ? "text-primary" : ""
                    }`}
                    onClick={() => setView("grid")}
                >
                    Grid
                </div>
                <div
                    className={`cursor-pointer hover:text-hover-dark dark:hover:text-hover ${
                        view === "map" ? "text-primary" : ""
                    }`}
                    onClick={() => setView("map")}
                >
                    Map
                </div>
            </div>
            <hr className="border-border dark:border-border-dark"></hr>

            <div className="w-full m-auto my-4 md:my-5 md:max-w-4xl">
                {postDisplayContent}
            </div>
        </div>
    );
}
