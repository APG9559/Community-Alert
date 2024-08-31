import { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

import { AlertAddContext } from './AddAlert';

const AddMap = () => {
    const { latitude, longitude, alerts } = useContext(AlertAddContext);
    
    const defaultIcon = new Icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <div>
            <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                style={{ height: '100%', width: '100%', position: 'relative' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Display the user's current position */}
                <Marker position={[latitude, longitude]} icon={defaultIcon}>
                    <Popup>Your location</Popup>
                </Marker>

                {/* Display alerts */}
                {alerts && alerts.map((alert, index) => (
                    <Marker
                        key={index}
                        position={[alert.latitude, alert.longitude]}
                        icon={defaultIcon}
                    >
                        <Popup>
                            <div>
                                <h4>{alert.title}</h4>
                                <p>Type: {alert.type}</p>
                                <p>Posted by: {alert.postedBy}</p>
                                <p>Status: {alert.active ? 'Active' : 'Inactive'}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default AddMap;
