import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    setShowAlert(true);
  };

  const handleReadMore = () => {
    setShowAlert((prev) => !prev);
  };
  return (
    <div className="w-full p-10 bg-[#CDEA68] text-black">
      <h1 className="font-playfiar text-3xl tracking-tighter">
        <b>Why Choose us:</b>
        <div className='gap-10 mb-10'>
        <ul className='mt-5'>
          <li className='mb-4'>- <u>Real-Time Alerts</u>   We provide instant, real-time alerts tailored to your location, ensuring you’re always informed of important events, emergencies, or hazards as they happen.</li>
          <li className='mb-4'>- <u>Community-Driven</u> Our platform is powered by the community. You and your neighbors contribute to a safer environment by sharing timely and relevant updates.</li>
          <li className='mb-4'>- <u>Verified Information</u> We offer a verification system where local authorities or trusted community members can validate alerts, ensuring that the information you receive is accurate and reliable.</li>
          <li>- <u>location Based Information</u> Receive Geo_locations that near to you based on your current location, helping you focus on what’s important.</li>
        </ul>
        </div>
      </h1>
      <div className="w-full flex border-t-2 border-[#738146] mt-10 pt-10">
      <div className="w-1/2">
        <h1 className="text-4xl">Some Images</h1>
        <button
          onClick={handleReadMore}
          className="flex uppercase gap-3 items-center px-10 py-4 bg-black text-white rounded-full mt-5">Read More<div className="w-3 h-3 bg-gray-100 rounded-full bg-white"></div>
        </button>
        {showAlert && (
          <motion.div
            className="mt-4 p-4 font-lato tracking-tight text-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-4xl font-lato">
          
          </motion.div>
        )}
      </div>
      <img
        className="w-1/2 h-[50vh] bg-[#a3a3a3]"
        src="https://economictimes.indiatimes.com/thumb/msid-84717861,width-1600,height-900,resizemode-4/news/india/maharashtra-flood-drone-footage-of-submerged-kolhapur-watch.jpg"
        alt="Protest"
      />
    </div>  
    </div>
  );
}
