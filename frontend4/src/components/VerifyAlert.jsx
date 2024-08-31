import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import NewMap from './NewMap'
import VerifyMap from './VerifyMap'
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import {createContext} from 'react'

export const AlertVerifyContext = createContext()
const getPermission = () =>{
    return new Promise((resolve, reject) => {
    
    var options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };
      
      
      function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        reject(err);
      }
       
      if (navigator.geolocation) {
        navigator.permissions
            .query({ name: "geolocation" })
            .then((result) => {
                if (result.state === "granted" || result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const crd = position.coords;
                            console.log('Coordinates:', crd);
                            resolve(crd);
                            // You can now use 'crd' here
                        },
                        (error) => {
                            console.error('Error getting location:', error);
                            reject(error);
                        }
                    );
                } else if (result.state === "denied") {
                    alert('Location access denied. Please enable location services.');
                    reject(new Error('Location access denied'));
                }
            })
            .catch((error) => {
                console.error('Permission query error:', error);
                reject(error);
            });
    } else {
        alert('Geolocation is not supported by your browser.');
        reject(new Error('Geolocation not supported'));
    }
             
    })

}


const getAlerts = async (alert) =>{
    console.log("hello")
    await axios.get('http://localhost:5000/alert')
    .then((res) =>{
        return res.data
    }).catch( (error)=>{
        console.log("Internal Server Error" + error)
    })
  }



export default function VerifyAlert() {
  const [alerts, setAlerts] = useState('')
  const [latitude,setLatitude] = useState('')
  const [longitude,setLongitude] = useState('')

  useEffect( () =>{
    getPermission().then((crd) => {
        setLatitude(crd.latitude);
        setLongitude(crd.longitude);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      }).catch((error) => {
        console.log("Failed to get location:", error);
      });


    getAlerts().then(setAlerts)
  
},[alerts,setAlerts,latitude,longitude])


  return (
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: '50% 50%',
      height: '100vh',
      padding: '60px 0px 0px 0px'
    }}>

  <div style={{ width: '50%', backgroundColor: '#f7fafc', left:'0px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '' }}>Alerts</h1>
        <ul>
         
          {/* {alerts.map((alert) => (
            <li
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '0.375rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#c6f6d5',
                transition: 'transform 0.3s',
                transform: 'scale(1)',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', textTransform: 'uppercase' }}>{alert.title}</h2>
                <p style={{ color: '#4a5568' }}>{alert.desc}</p>
                <p style={{ color: '#718096' }}>Reported by: {alert.name}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <FaCheck
                  style={{
                    color: '#38a169',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#2f855a'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#38a169'}
                />
                <MdCancel
                  style={{
                    color: '#e53e3e',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#c53030'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#e53e3e'}
                />
              </div>
            </li>
          ))} */}
        </ul>
      </div>
  
            
            <AlertVerifyContext.Provider value={{ latitude, longitude, alerts }}>
    <VerifyMap/>
            </AlertVerifyContext.Provider>
    
         
      </div>
  
   
  );
}