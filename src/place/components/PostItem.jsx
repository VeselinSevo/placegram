import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import OptionsBar from "./OptionsBar";
import Map from "../../shared/components/Ui/Map";
import Avatar from "../../shared/components/Ui/Avatar";
import Card from "../../shared/components/Ui/Card";
import Carousel from "../../shared/components/Ui/Carousel";
import Button from "../../shared/components/Ui/Button";
import Modal from "../../shared/components/Ui/Modal";
import { Link } from "react-router-dom";

export default function PostItem({ post }) {
    const postDate = new Date(post.postDate);
    const isRecent = Date.now() - postDate.getTime() < 24 * 60 * 60 * 1000;

    const displayDate = isRecent
        ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
        : `${postDate.toLocaleDateString()}`;

    const [isModalOpen, setisModalOpen] = useState(false);

    function closeModal() {
        setisModalOpen(false);
    }

    function openModal() {
        setisModalOpen(true);
    }

    return (
        <>
            {isModalOpen && (
                <Modal disableHover onClose={closeModal} showCloseIcon>
                    <h2 className="mb-3 text-xl font-bold tracking-tight">
                        {post.location.address}
                    </h2>
                    <Map location={post.location} height="300px" />
                </Modal>
            )}

            <Card customClasses="max-w-md md:max-w-xl rounded-lg" disableHover>
                <Carousel images={post.images} />
                <div className="flex flex-col overflow-hidden w-full md:flex-row">
                    <div className="flex flex-col p-4 leading-normal w-full md:w-2/3">
                        <div className="flex items-center mb-4 gap-4">
                            <Link to={"/user/" + post.creator.id}>
                                <Avatar
                                    src={post?.creator?.profilePicture}
                                    alt={
                                        post?.creator?.username ||
                                        "Default User"
                                    }
                                />
                            </Link>
                            <div>
                                <Link to={"/user/" + post.creator.id}>
                                    <p className="text-text text-sm md:text-base dark:text-text-dark font-bold hover:text-hover-dark dark:hover:text-hover">
                                        {post.creator.username}
                                    </p>
                                </Link>
                                <p className="text-text text-sm md:text-base dark:text-text-dark">
                                    Posted: {displayDate}
                                </p>
                            </div>
                        </div>
                        <Link to={"/post/" + post.id}>
                            <h3 className="mb-1 text-xl md:text-2xl font-bold tracking-tight hover:text-hover-dark dark:hover:text-hover hover:underline text-text dark:text-text-dark cursor-pointer">
                                {post.title}
                            </h3>
                        </Link>
                        <p className="mb-3 text-sm">
                            {post.location.address} ,{" "}
                            {new Date(post.visitDate).toLocaleDateString()}
                        </p>
                        <p className="mb-3 text-sm md:text-base font-normal text-text dark:text-text-dark">
                            {post.description}
                        </p>
                    </div>
                    <div className="hidden md:block w-full md:w-1/3 pt-2 md:py-4">
                        <Map location={post.location} height="220px" />
                    </div>
                    <div className="md:hidden block px-4">
                        <Button
                            variant="secondary"
                            customClasses={"w-1/3 text-sm"}
                            onClick={openModal}
                        >
                            See on the map
                        </Button>
                    </div>
                </div>
                <div className="px-2 md:px-2">
                    <OptionsBar></OptionsBar>
                </div>
            </Card>
        </>
    );
}
