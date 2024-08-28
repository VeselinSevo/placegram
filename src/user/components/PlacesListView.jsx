import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/Ui/Card";

export default function PlacesListView(props) {
    return (
        <div className="grid grid-cols-3 gap-1 justify-center place-items-center md:gap-2 ">
            {props.places.length > 0 ? (
                props.places.map((place) => (
                    <PlaceItem place={place} key={place.id} />
                ))
            ) : (
                <Card className="h-full flex flex-col">
                    <div className="flex flex-col items-center justify-center p-3">
                        <h3>You have no places shared. Share one</h3>
                        <button>Add place</button>
                    </div>
                </Card>
            )}
        </div>
    );
}
