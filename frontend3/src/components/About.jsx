import React, { useState } from 'react';

export default function About() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    setShowAlert(true);
  };

  return (
    <div className="w-full p-10 bg-[#CDEA68] text-black">
      <h1 className="font-lato text-5xl tracking-tighter">
        Geolocation-based notifications, and admin verification. Plan the
        database schema for users, alerts, categories, and notifications. Choose
        a mapping service (e.g., Google Maps API, Leaflet, Mapbox) for the map
        interface.
      </h1>
      <div className="w-full flex border-t-2 border-[#738146] mt-10 pt-10">
        <div className="w-1/2">
          <h1 className="text-4xl">Some Images</h1>
          <button
            onClick={handleSubmit}
            className="flex uppercase gap-3 items-center px-10 py-4 bg-black text-white rounded-full mt-5"
          >
            Read More
            <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
          </button>
          {showAlert && (
            <div className="mt-4 p-4 font-lato tracking-tight text-2xl">
              <p className="text-4xl font-lato">Alert: Student met a horrible accident</p>
              <p className="text-2xl font-lato">
                Description: A KIT College student met with a horrible accident
                near Sanjay Ghodawat University Atigre
              </p>
            </div>
          )}
        </div>
        <div className="w-1/2 h-[50vh] bg-[#a3a3a3]">
       
        </div>
      </div>
    </div>
  );
}
