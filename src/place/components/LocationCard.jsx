import Card from "../../shared/components/ui/Card";
import Map from "../../shared/components/ui/Map";

const LocationCard = ({ location }) => {
    return (
        <Card customClasses="p-4 bg-bg dark:bg-bg-dark shadow-md rounded-lg h-full">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Location</h2>
            <Map location={location} height={300} />
        </Card>
    );
};

export default LocationCard;
