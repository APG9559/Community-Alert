
import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L, { icon } from "leaflet";
import './map.css';
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { TileLayer } from 'leaflet';
import {Icon} from 'leaflet'
import axios from 'axios'




const Map = (props) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lat = props.latitude
    const lng = props.longitude
    const center = { lng: 72.72, lat: 15.42 };
    const [zoom] = useState(12);
    const [currentLocation ,setCurrentLocation] = useState([])
    var data = null
    
    useEffect(() => {
        
        if (map.current) return; // stops map from intializing more than once
      
        map.current = new L.Map(mapContainer.current, {
          
          center: L.latLng(center.lat, center.lng),
          zoom: zoom
        });
      
        console.log("My location " + currentLocation.latitude + "  " + currentLocation.longitude)

        // Create a MapTiler Layer inside Leaflet
        const mtLayer = new MaptilerLayer({
          // Get your free API key at https://cloud.maptiler.com
          apiKey: "uez5OdXatVrCebVvLBVR",
        }).addTo(map.current);
          
        data = props.alerts
        
        
        // axios.get('http://localhost:5000/loadAlerts?lat=' +lat +'&lng='+lng)
        // .then((res) =>{
        //     const alerts = res.data

          if( data) {
            data.map((alert) =>{
              console.log(alert.longitude  + "   " +  alert.latitude)
              var marker = new L.Marker([alert.latitude, alert.longitude], {icon : new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})});
              marker.addTo(map.current)
              var popup = L.popup()
              .setContent("Title 1 " + alert.title +" Description : " + alert.description);
     
              marker.bindPopup(popup).openPopup();
          })
          }  

      }, [center.lng, center.lat, zoom]);



      return (
        <div className="map-wrap w-full h-full" >
          <div ref={mapContainer} className="map"  >
          
            </div>
        

        </div>
      );



}

export default Map;