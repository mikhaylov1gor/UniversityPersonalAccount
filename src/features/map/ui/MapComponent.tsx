import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
interface MapComponentProps {
    latitude: number;
    longitude: number;
    zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
                                                       latitude,
                                                       longitude,
                                                       zoom = 13,
                                                   }) => {
    const mapState = { center: [latitude, longitude], zoom };
    console.log(latitude, longitude)
    return (
        <YMaps>
            <Map state={mapState} width={'100%'} height={'200px'}>
                <Placemark geometry={[latitude, longitude]}/>
            </Map>
        </YMaps>
    );
};

export default MapComponent;
