/* eslint-disable react/prop-types */
import MapComponent from "../../shared/components/Map";

export default function PlaceItem({ place }) {
    return (
        <div className=" bg-white md:border md:border-gray-200 rounded-lg shadow w-full md:flex-row md:max-w-3xl md:hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 md:dark:hover:bg-gray-700 overflow-hidden">
            <img
                className="mb-2 object-cover w-full rounded-t-lg md:h-auto md:rounded-none md:rounded-s-lg"
                src={place.image}
                alt={place.title}
            />
            <div className="flex flex-col overflow-hidden w-full md:flex-row">
                <div className="flex flex-col p-4 leading-normal w-full md:w-2/3">
                    <div className="flex items-center mb-4 gap-4">
                        <div className="w-10 h-10 relative rounded-full overflow-hidden">
                            <img
                                className="absolute inset-0 w-full h-full object-cover"
                                src={place?.user?.profilePicture}
                                alt={place?.user?.username || "Default User"}
                            />
                        </div>
                        <div>
                            <p className="text-gray-900 dark:text-white font-bold">
                                {place.user.username}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                {new Date(place.date).toLocaleDateString()} -{" "}
                                {place.country}
                            </p>
                        </div>
                    </div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {place.title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {place.description}
                    </p>
                </div>
                <div className="w-full md:w-1/3 pt-2 md:py-4">
                    <MapComponent location={place.location} />
                </div>
            </div>
        </div>
    );
}
