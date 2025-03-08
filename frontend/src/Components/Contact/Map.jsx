import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';
import { BACKENDURL } from "../Functionalities/functionalites"
import axios from 'axios';
export default function Map() {
    const [mapApiKey, setMapApiKey] = useState("")
    const mapContainer = useRef(null);
    const map = useRef(null);
    const jntua = { lng: 77.60725603143146, lat: 14.649565621413073 };
    const zoom = 16;
    maptilersdk.config.apiKey = 'gwhXiEg1IhKoflmgkJks';
    useEffect(() => {
        async function getMapApi() {
            const response = await axios.get(`${BACKENDURL}/map/key`)
            if (response && response.data.data) {
                setMapApiKey(response.data.data)
            }
        }
        getMapApi()
    }, [])
    useEffect(() => {
        if (map.current) return;
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [jntua.lng, jntua.lat],
            zoom: zoom
        });

        const marker = new maptilersdk.Marker()
            .setLngLat([jntua.lng, jntua.lat])
            .addTo(map.current);
        marker.setPopup(
            new maptilersdk.Popup({ offset: 25 })
                .setHTML("<div class='jntua-map-card'><h3>JNTUA</h3><p>JNTUA College of Engineering Ananthapur</p></div>")
        ).getPopup();
    }, [jntua.lng, jntua.lat, zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
