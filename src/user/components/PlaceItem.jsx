/* eslint-disable react/prop-types */

import { formatDistanceToNow } from "date-fns";
import Card from "../../shared/components/Ui/Card";

export default function PlaceItem({ place }) {
    const postDate = new Date(place.postDate);
    const isRecent = Date.now() - postDate.getTime() < 24 * 60 * 60 * 1000; // Checks if the post is within the last 24 hours

    const displayDate = isRecent
        ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
        : `${postDate.toLocaleDateString()}`;

    return (
        <Card customClasses="rounded-sm md:rounded-md">
            <img
                className="object-cover w-full rounded-sm md:rounded-md"
                src={place.image}
                alt={place.title}
                style={{ height: "200px" }} // Fixed height for the image
            />
            <div className="md:flex flex-col !rounded-none !md:rounded-lg flex-grow p-4 w-full justify-between hidden">
                <h5 className="mb-1 text-xl font-bold tracking-tight text-text dark:text-text-dark">
                    {place.title}
                </h5>
                <p className="mb-2 text-text dark:text-text-dark text-sm flex items-center">
                    {place.country}

                    <img
                        className="ml-2 h-4 w-6"
                        src={`https://flagcdn.com/${place.country
                            .toLowerCase()
                            .substring(0, 2)}.svg`}
                        alt={`${place.country} flag`}
                    />
                </p>
                <p className="text-text dark:text-text-dark text-sm flex items-center">
                    Posted: {displayDate}
                </p>
            </div>
        </Card>
    );
}
