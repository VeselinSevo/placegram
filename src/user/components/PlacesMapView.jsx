import React, { useEffect, useRef } from "react";
import PlaceMapItem from "./PlaceMapItem";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const PlacesMapView = ({ places }) => {
    const mapRef = useRef(); // Ref to the map container

    // Custom hook to fit map bounds
    const FitMapBounds = ({ bounds }) => {
        const map = useMap(); // Get the map instance from context
        useEffect(() => {
            if (bounds && bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50] }); // Adjust padding as needed
            }
        }, [bounds, map]);

        return null;
    };

    // Calculate map bounds
    const calculateBounds = (places) => {
        const bounds = L.latLngBounds();
        places.forEach((place) => {
            const { latitude, longitude } = place.location;
            bounds.extend([latitude, longitude]);
        });
        return bounds;
    };

    const bounds =
        places.length > 0
            ? calculateBounds(places)
            : L.latLngBounds([
                  [-90, -180],
                  [90, 180],
              ]);

    // Custom hook to set zoom constraints
    const SetZoomConstraints = () => {
        const map = useMap(); // Get the map instance from context

        useEffect(() => {
            if (map) {
                map.setMaxZoom(15); // Set maximum zoom level
                map.setMinZoom(2); // Set minimum zoom level
            }
        }, [map]);

        return null;
    };

    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: "500px", width: "100%" }}
            className="rounded-md md:rounded-lg"
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Store the map instance
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {places.map((place) => (
                <Marker
                    key={place.id}
                    position={[
                        place.location.latitude,
                        place.location.longitude,
                    ]}
                >
                    <Popup>
                        <PlaceMapItem place={place} />
                    </Popup>
                </Marker>
            ))}
            <FitMapBounds bounds={bounds} /> {/* Apply bounds */}
            <SetZoomConstraints /> {/* Apply zoom constraints */}
        </MapContainer>
    );
};

export default PlacesMapView;
