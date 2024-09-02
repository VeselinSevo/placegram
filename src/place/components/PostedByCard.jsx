// components/PostedBy.js
import React from "react";
import Avatar from "../../shared/components/Ui/Avatar";
import Card from "../../shared/components/Ui/Card";

const PostedByCard = ({ user, taggedPeople }) => {
    return (
        <Card customClasses="p-4 bg-bg dark:bg-bg-dark border border-hover dark:border-hover-dark shadow-md rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Posted By</h2>
            <div className="flex items-center gap-4 mb-4">
                <Avatar
                    src={user.profilePicture}
                    alt={user.username || "Default User"}
                    className="w-16 h-16"
                />
                <div className="text-lg md:text-xl">
                    <p className="text-text dark:text-text-dark font-bold text-lg">
                        {user.username}
                    </p>
                    <p className="text-text dark:text-text-dark text-sm">
                        {user.email}
                    </p>
                </div>
            </div>
            {taggedPeople && taggedPeople.length > 0 && (
                <div>
                    <h2 className="text-lg md:text-xl font-semibold mb-4">
                        With
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {taggedPeople.map((person, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <Avatar
                                    src={person.profilePicture}
                                    alt={person.username}
                                    className="w-12 h-12"
                                />
                                <p className="text-text dark:text-text-dark font-semibold text-md md:text-lg">
                                    {person.username}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default PostedByCard;
