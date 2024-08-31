
import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L, { icon } from "leaflet";
import './map.css';
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { TileLayer } from 'leaflet';
import {Icon} from 'leaflet'
import axios from 'axios'

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lat = 19.0842
    const lng = 72.8851
    const center = { lng: lng, lat: lat };
    const [zoom] = useState(12);
    // const [latitude , setLatitude] = useState('')
    // const [longitude, setLongitude] = useState('')
    var latitude ;
    var longitude;


    
var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};


function errors(err) {
  console.log("Error")
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
    
    useEffect(() => {

      if (navigator.geolocation) {
         navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted" || result.state === "prompt") {
              navigator.geolocation.getCurrentPosition( async (position) =>{
               
                const crd = position.coords
                 
                let latitude = crd.latitude
                let longitude = crd.longitude
                await axios.get('http://localhost:5000/userLocation?lat=' +latitude +"&lng="+ longitude)
                  .then((res) =>{
                    console.log(res)
                    latitude = res.data.latitude
                    longitude = res.data.longitude
                    
                var marker = new L.Marker([latitude, longitude], {icon : new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})});
                marker.addTo(map.current)
                var popup = L.popup()
                .setContent("Title 4" + latitude +" \nDescription : " + longitude);
       
                marker.bindPopup(popup).openPopup();
            })
              
              }, errors, options)

              
            }else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
              alert('Location Denied')
            }
            result.onchange = function () {
              console.log(result.state);
            };
          });
      } else {
        alert("Sorry Not available!");
      }
  
        
        if (map.current) return; // stops map from intializing more than once
      
        map.current = new L.Map(mapContainer.current, {
          
          center: L.latLng(center.lat, center.lng),
          zoom: zoom
        });
      
        console.log("My location " + latitude + "  " + longitude)

        // Create a MapTiler Layer inside Leaflet
        const mtLayer = new MaptilerLayer({
          // Get your free API key at https://cloud.maptiler.com
          apiKey: "uez5OdXatVrCebVvLBVR",
        }).addTo(map.current);
            
        
        
        
        axios.get('http://localhost:5000/loadAlerts?lat=' +lat +'&lng='+lng)
        .then((res) =>{
            const alerts = res.data

            alerts.map(alert =>{
                console.log(alert.longitude  + "   " +  alert.latitude)
                var marker = new L.Marker([alert.latitude, alert.longitude], {icon : new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})});
                marker.addTo(map.current)
                var popup = L.popup()
                .setContent("Title 1 " + alert.title +" Description : " + alert.description);
       
                marker.bindPopup(popup).openPopup();
            })
              
          
            
           
           
            // console.log("alerts :" + alerts)
        }).catch( (error)=>{
            console.log("Internal Server Error" + error)
        })
       
        // var marker = new L.Marker([17.385044, 78.486671], {icon : new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})});
        // marker.addTo(map.current)
      }, [center.lng, center.lat, zoom]);



      return (
        <div className="map-wrap w-full h-full" >
          <div ref={mapContainer} className="map"  >
          
            </div>
        

        </div>
      );



}

export default Map;