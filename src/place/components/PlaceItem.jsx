/* eslint-disable react/prop-types */
import { formatDistanceToNow } from "date-fns";

import Map from "../../shared/components/Ui/Map";
import Avatar from "../../shared/components/Ui/Avatar";
import Card from "../../shared/components/Ui/Card";

export default function PlaceItem({ place }) {
    const postDate = new Date(place.postDate);
    const isRecent = Date.now() - postDate.getTime() < 24 * 60 * 60 * 1000; // Checks if the post is within the last 24 hours

    const displayDate = isRecent
        ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
        : `${postDate.toLocaleDateString()}`;

    return (
        <Card className="rounded-lg">
            <img
                className="mb-2 object-cover w-full rounded-t-lg md:h-auto md:rounded-lg"
                src={place.image}
                alt={place.title}
            />
            <div className="flex flex-col overflow-hidden w-full md:flex-row">
                <div className="flex flex-col p-4 leading-normal w-full md:w-2/3">
                    <div className="flex items-center mb-4 gap-4">
                        <Avatar
                            src={place?.user?.profilePicture}
                            alt={place?.user?.username || "Default User"}
                        ></Avatar>

                        <div>
                            <p className="text-gray-900 dark:text-white font-bold">
                                {place.user.username}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Posted: {displayDate}
                            </p>
                        </div>
                    </div>
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {place.title}
                    </h5>
                    <p className="mb-3 text-gray-500 dark:text-gray-400 text-sm flex items-center">
                        {new Date(place.visitDate).toLocaleDateString()} -{" "}
                        {place.country}{" "}
                        <img
                            className="ml-2 h-4 w-6"
                            src={`https://flagcdn.com/${place.country
                                .toLowerCase()
                                .substring(0, 2)}.svg`}
                            alt={`${place.country} flag`}
                        />
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {place.description}
                    </p>
                </div>
                <div className="w-full md:w-1/3 pt-2 md:py-4">
                    <Map location={place.location} height="220px" />
                </div>
            </div>
        </Card>
    );
}
