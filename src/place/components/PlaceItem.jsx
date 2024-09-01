import React from "react";
import { formatDistanceToNow } from "date-fns";
import Map from "../../shared/components/Ui/Map";
import Avatar from "../../shared/components/Ui/Avatar";
import Card from "../../shared/components/Ui/Card";
import Carousel from "../../shared/components/Ui/Carousel";

export default function PlaceItem({ place }) {
    const postDate = new Date(place.postDate);
    const isRecent = Date.now() - postDate.getTime() < 24 * 60 * 60 * 1000;

    const displayDate = isRecent
        ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
        : `${postDate.toLocaleDateString()}`;

    return (
        <Card customClasses="max-w-md md:max-w-2xl rounded-lg cursor-pointer">
            <Carousel images={place.images} />
            <div className="flex flex-col overflow-hidden w-full md:flex-row">
                <div className="flex flex-col p-4 leading-normal w-full md:w-2/3">
                    <div className="flex items-center mb-4 gap-4">
                        <Avatar
                            src={place?.user?.profilePicture}
                            alt={place?.user?.username || "Default User"}
                        />

                        <div>
                            <p className="text-text dark:text-text-dark font-bold">
                                {place.user.username}
                            </p>
                            <p className="text-text dark:text-text-dark text-sm">
                                Posted: {displayDate}
                            </p>
                        </div>
                    </div>
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-text dark:text-text-dark">
                        {place.title}
                    </h5>
                    <p className="mb-3 text-text dark:text-text-dark text-sm flex items-center">
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
                    <p className="mb-3 font-normal text-text dark:text-text-dark">
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
