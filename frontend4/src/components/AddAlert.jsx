import React, { useState } from 'react'
import AlertForm from './AlertForm'
import axios from 'axios'
import { useEffect } from 'react'

import AddMap from './AddMap'
import { useActionData } from 'react-router-dom'
import {createContext} from 'react'

export const AlertAddContext = createContext();

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
        // console.log("Error")
        // console.warn(`ERROR(${err.code}): ${err.message}`);
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
        await axios.get('http://localhost:5000/alert',alert)
        .then((res) =>{
            return res.data;
        }).catch( (error)=>{
            console.log("Internal Server Error" + error)
        })
      }

export default function AddAlert() {
  const [latitude,setLatitude] = useState('')
  const [longitude,setLongitude] = useState('')
  const [alerts, setAlerts] = useState([])
    // const [title, setTile] = useState()
    // const [description,setDescription] = useState()
    // const [type , setType] = useState()
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
      }, [] );

      return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '30% 70%',
            height: '100vh',
            padding: '60px 0px 0px 0px'
          }}>
             <AlertForm latitude={latitude} longitude={longitude}/>
             <AlertAddContext.Provider value={{ latitude, longitude, alerts }}>
                <AddMap />
            </AlertAddContext.Provider>
             
        </div>
         
     )

}