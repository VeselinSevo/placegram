import PlaceItem from "./PlaceItem";

export default function PlacesList() {
    const PLACES = [
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
            date: "2024-08-13T18:30:00Z",
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
            image: "https://example.com/images/eiffel-tower-night.jpg",
            description:
                "The Eiffel Tower lit up at night is a sight to behold. The lights sparkle every hour, making it a magical experience.",
            country: "France",
            date: "2024-07-22T21:00:00Z",
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
            image: "https://example.com/images/swiss-alps-hiking.jpg",
            description:
                "Spent a day hiking in the Swiss Alps. The scenery was stunning, with snow-capped peaks and lush green valleys.",
            country: "Switzerland",
            date: "2024-06-15T10:00:00Z",
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
            image: "https://example.com/images/great-wall-of-china.jpg",
            description:
                "Walked along the Great Wall of China. The sheer scale and history of the wall are awe-inspiring.",
            country: "China",
            date: "2024-05-05T14:00:00Z",
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
            image: "https://example.com/images/serengeti-safari.jpg",
            description:
                "Had an unforgettable safari experience in Serengeti National Park. Saw lions, elephants, and a beautiful sunset over the savannah.",
            country: "Tanzania",
            date: "2024-04-10T16:00:00Z",
        },
    ];

    return (
        <div className="container m-auto flex flex-col justify-center place-items-center gap-8 md:gap-4 my-4 px-10 md:my-10">
            {PLACES.length > 0 ? (
                PLACES.map((place) => (
                    <PlaceItem place={place} key={place.id} />
                ))
            ) : (
                <h2>Places not found</h2>
            )}
        </div>
    );
}
