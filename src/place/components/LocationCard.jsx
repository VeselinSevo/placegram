import Card from "../../shared/components/Ui/Card";
import Map from "../../shared/components/Ui/Map";

const LocationCard = ({ location }) => {
    return (
        <Card customClasses="p-4 bg-bg dark:bg-bg-dark border border-hover dark:border-hover-dark shadow-md rounded-lg h-full">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <Map location={location} height={300} />
        </Card>
    );
};

export default LocationCard;
