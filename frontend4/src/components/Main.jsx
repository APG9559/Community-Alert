import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import NewMap from './NewMap';

export const MapContext = createContext();

const getPermission = () => {
    return new Promise((resolve, reject) => {
        var options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };

        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: 'geolocation' })
                .then((result) => {
                    if (result.state === 'granted' || result.state === 'prompt') {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const crd = position.coords;
                                resolve(crd);
                            },
                            (error) => {
                                reject(error);
                            },
                            options
                        );
                    } else if (result.state === 'denied') {
                        alert('Location access denied. Please enable location services.');
                        reject(new Error('Location access denied'));
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            alert('Geolocation is not supported by your browser.');
            reject(new Error('Geolocation not supported'));
        }
    });
};

const getAlerts = async () => {
    try {
        const res = await axios.get('http://localhost:5000/alert');
        return res.data;
    } catch (error) {
        console.log('Internal Server Error', error);
    }
};

export default function Main() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        getPermission()
            .then((crd) => {
                setLatitude(crd.latitude);
                setLongitude(crd.longitude);
            })
            .catch((error) => {
                console.log('Failed to get location:', error);
            });

        getAlerts().then((data) => {
            if (data) {
                setAlerts(data);  // This line updates the alerts state
            }
        });
    }, []); // Empty dependency array to run only on mount

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '100%',
                height: '100vh',
                padding: '60px 0px 0px 0px',
            }}
        >    
            <MapContext.Provider value={{ latitude, longitude, alerts }}>
                <NewMap />
            </MapContext.Provider>
        </div>
    );
}
