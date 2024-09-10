// components/PostedBy.js
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/Ui/Avatar";
import Card from "../../shared/components/Ui/Card";

const PostedByCard = ({ user, taggedPeople }) => {
    return (
        <Card customClasses="p-4 bg-bg dark:bg-bg-dark border border-hover dark:border-hover-dark shadow-md rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Posted By</h2>
            <div className="flex items-center gap-4 mb-4">
                <Link to={"/user/" + user.id}>
                    <Avatar
                        src={user.profilePicture}
                        alt={user.username || "Default User"}
                        className="w-16 h-16"
                    />
                </Link>
                <div className="text-lg md:text-xl">
                    <Link
                        to={"/user/" + user.id}
                        className="hover:text-hover-dark dark:text-hover"
                    >
                        <p className="text-text dark:text-text-dark font-bold text-base md:text-lg hover:text-hover-dark dark:hover:text-hover">
                            {user.username}
                        </p>
                    </Link>
                    <p className="text-text dark:text-text-dark text-xs md:text-sm">
                        {user.email}
                    </p>
                </div>
            </div>
            {taggedPeople && taggedPeople.length > 0 && (
                <div>
                    <h2 className="text-base md:text-lg font-semibold mb-4">
                        With
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {taggedPeople.map((person, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <Link
                                    to={"/user/" + person.id}
                                    className=" dark:text-hover hover:text-hover-dark dark:hover:text-hover"
                                >
                                    <Avatar
                                        src={person.profilePicture}
                                        alt={person.username}
                                        className="w-12 h-12"
                                    />
                                </Link>
                                <Link to={"/user/" + person.id}>
                                    <p className="text-text dark:text-text-dark font-semibold text-base md:text-lg hover:text-hover-dark dark:hover:text-hover">
                                        {person.username}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default PostedByCard;
