import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

function LocationMarker({ onLocationChange }) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationChange(e.latlng);
        },
    });

    return position === null ? null : <Marker position={position}></Marker>;
}

export default function MapPicker({ onLocationSelect, height = "400px" }) {
    const [center, setCenter] = useState([51.505, -0.09]); // Default to London
    const mapRef = useRef();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter([latitude, longitude]);
                    if (mapRef.current) {
                        mapRef.current.setView([latitude, longitude], 13);
                    }
                },
                () => {
                    console.log("Unable to retrieve your location");
                }
            );
        }
    }, []);

    const handleLocationChange = async (latlng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`
            );
            const data = await response.json();
            const address = data.display_name;

            onLocationSelect({
                latitude: latlng.lat,
                longitude: latlng.lng,
                address: address,
            });
        } catch (error) {
            console.error("Error fetching address:", error);
            onLocationSelect({
                latitude: latlng.lat,
                longitude: latlng.lng,
                address: "Address not found",
            });
        }
    };

    return (
        <div className="h-full overflow-hidden mt-2">
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: height, width: "100%" }}
                className="rounded-lg z-10"
                ref={mapRef}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker onLocationChange={handleLocationChange} />
            </MapContainer>
        </div>
    );
}
