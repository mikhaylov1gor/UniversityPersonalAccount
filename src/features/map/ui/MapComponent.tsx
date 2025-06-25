import React from "react";
import {YMaps, Map, Placemark} from "react-yandex-maps";

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
    const mapState = {center: [latitude, longitude], zoom};
    return (
        <YMaps>
            <div className="my-map-wrapper" style={{width: "100%", height: "100%"}}>
                <Map state={mapState} width={'100%'} height={'100%'}>
                    <Placemark geometry={[latitude, longitude]} options={{ preset: "islands#redDotIcon" }}/>
                </Map>
            </div>
        </YMaps>
    );
};

export default MapComponent;
