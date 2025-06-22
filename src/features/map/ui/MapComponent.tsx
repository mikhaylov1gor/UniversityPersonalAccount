import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const FixMapSize = () => {
    const map = useMap();
    React.useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 0);
    }, [map]);
    return null;
};

const MapComponent = ({ latitude, longitude, zoom = 13 }) => {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            dragging={false}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            touchZoom={false}
            keyboard={false}
            boxZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
                <Popup>Местоположение: {latitude}, {longitude}</Popup>
            </Marker>
            <FixMapSize />
        </MapContainer>
    );
};

export default MapComponent;
