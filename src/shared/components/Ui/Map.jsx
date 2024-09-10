import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* eslint-disable react/prop-types */
// Fix for default marker icon not displaying correctly in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapComponent({ location, height }) {
    return (
        <div className="h-full overflow-hidden">
            <MapContainer
                center={[location.latitude, location.longitude]}
                zoom={7}
                style={{ height: height || "100%", width: "100%" }}
                className="rounded-b-lg md:rounded-bl-lg md:rounded-tl-lg md:rounded-none md:rounded-l-lg z-10"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[location.latitude, location.longitude]}>
                    <Popup>{location.adACCCdress}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
