/* eslint-disable react/prop-types */

import { formatDistanceToNow } from "date-fns";
import Card from "../../shared/components/Ui/Card";

export default function PlaceMapItem({ place }) {
    const postDate = new Date(place.postDate);
    const isRecent = Date.now() - postDate.getTime() < 24 * 60 * 60 * 1000; // Checks if the post is within the last 24 hours

    const displayDate = isRecent
        ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
        : `${postDate.toLocaleDateString()}`;

    return (
        <div>
            <img
                className="object-cover w-full rounded-sm md:rounded-md"
                src={place.image}
                alt={place.title}
                style={{ height: "200px" }} // Fixed height for the image
            />
            <div className="md:flex flex-col !rounded-none !md:rounded-md flex-grow p-2 w-full justify-between hidden">
                <h5 className="text-lg font-bold tracking-tight text-text-dark dark:text-text">
                    {place.title}
                </h5>
                <p className="!m-0 !mb-2 text-text-dark dark:text-text text-sm flex items-center">
                    Posted: {displayDate}
                </p>
                <p className="text-text-dark dark:text-text text-sm flex items-center !m-0">
                    {place.description}
                </p>
            </div>
        </div>
    );
}
