import PostsListView from "./PostsListView";
import PostsMapView from "./PostsMapView";
import { useState } from "react";

export default function PostsDisplay({ isOwner }) {
    const [view, setView] = useState("grid"); // "grid" or "map"
    const USER_POSTS = [
        // Changed 'USER_PLACES' to 'USER_POSTS'
        {
            id: "1234567890",
            user: {
                username: "john_doe",
                profilePicture: "/users/profile-images/user1.jpg",
            },
            title: "Sunset at Grand Canyon",
            location: {
                latitude: 36.1069652,
                longitude: -112.1129972,
                address: "Grand Canyon, Arizona, USA",
            },
            image: "/places/thumbnail-images/place1.webp",
            description:
                "Witnessed an amazing sunset at the Grand Canyon. The view was breathtaking, with the colors of the sky reflecting off the canyon walls.",
            country: "USA",
            visitDate: "2024-08-13T18:30:00Z",
            postDate: "2024-08-14T10:00:00Z",
        },
        {
            id: "2345678901",
            user: {
                username: "john_doe",
                profilePicture: "/users/profile-images/user1.jpg",
            },
            title: "Eiffel Tower at Night",
            location: {
                latitude: 48.8583701,
                longitude: 2.2944813,
                address: "Eiffel Tower, Paris, France",
            },
            image: "/places/thumbnail-images/place1.webp",
            description:
                "The Eiffel Tower lit up at night is a sight to behold. The lights sparkle every hour, making it a magical experience.",
            country: "France",
            visitDate: "2024-07-22T21:00:00Z",
            postDate: "2024-07-23T09:00:00Z",
        },
        {
            id: "3456789012",
            user: {
                username: "john_doe",
                profilePicture: "/users/profile-images/user1.jpg",
            },
            title: "Hiking in the Swiss Alps",
            location: {
                latitude: 46.577694,
                longitude: 8.027008,
                address: "Swiss Alps, Switzerland",
            },
            image: "/places/thumbnail-images/place1.webp",
            description:
                "Spent a day hiking in the Swiss Alps. The scenery was stunning, with snow-capped peaks and lush green valleys.",
            country: "Switzerland",
            visitDate: "2024-06-15T10:00:00Z",
            postDate: "2024-06-16T08:00:00Z",
        },
        {
            id: "4567890123",
            user: {
                username: "john_doe",
                profilePicture: "/users/profile-images/user1.jpg",
            },
            title: "Exploring the Great Wall of China",
            location: {
                latitude: 40.4319077,
                longitude: 116.5703749,
                address: "Great Wall of China, Beijing, China",
            },
            image: "/places/thumbnail-images/place1.webp",
            description:
                "Walked along the Great Wall of China. The sheer scale and history of the wall are awe-inspiring.",
            country: "China",
            visitDate: "2024-05-05T14:00:00Z",
            postDate: "2024-05-06T11:00:00Z",
        },
        {
            id: "5678901234",
            user: {
                username: "john_doe",
                profilePicture: "/users/profile-images/user1.jpg",
            },
            title: "Safari in Serengeti National Park",
            location: {
                latitude: -2.333333,
                longitude: 34.833333,
                address: "Serengeti National Park, Tanzania",
            },
            image: "/places/thumbnail-images/place1.webp",
            description:
                "Had an unforgettable safari experience in Serengeti National Park. Saw lions, elephants, and a beautiful sunset over the savannah.",
            country: "Tanzania",
            visitDate: "2024-04-10T16:00:00Z",
            postDate: "2024-04-11T10:00:00Z",
        },
    ];
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
                {view === "grid" ? (
                    <PostsListView posts={USER_POSTS} isOwner={isOwner} /> // Changed 'places' to 'posts'
                ) : (
                    <PostsMapView posts={USER_POSTS} isOwner={isOwner} /> // Changed 'places' to 'posts'
                )}
            </div>
        </div>
    );
}
