import { useLoaderData } from "react-router-dom";
import PageWrapper from "../../shared/components/Ui/PageWrapper";
import ImageGallery from "../../shared/components/Ui/ImageGridGallery";
import LocationCard from "../components/LocationCard";
import DescriptionCard from "../components/DescriptionCard";
import PostedByCard from "../components/PostedByCard";
import OptionsBar from "../components/OptionsBar";

const Place = () => {
    const place = useLoaderData();

    return (
        <PageWrapper>
            <div className="">
                {/* Title and Posting Details */}
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-2">{place.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Posted on:{" "}
                        {new Date(place.postDate).toLocaleDateString()} |
                        Location: {place.location.address}, {place.country} |
                        Visited on:{" "}
                        {new Date(place.visitDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Image Gallery */}
                <ImageGallery images={place.images} />

                {/* Additional Information */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2 space-y-4">
                        <PostedByCard
                            user={place.user}
                            taggedPeople={place.taggedPeople}
                        />
                        <DescriptionCard description={place.description} />
                    </div>

                    {/* Map Section */}
                    <div className="w-full md:w-1/2">
                        <LocationCard location={place.location} />
                    </div>
                </div>

                <OptionsBar />
            </div>
        </PageWrapper>
    );
};

export default Place;
