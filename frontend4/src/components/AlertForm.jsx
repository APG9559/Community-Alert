import React from 'react'
import { useState } from 'react'
import axios from 'axios'


export default function AlertForm(location) {
    // location = props.data
    const [title, setTile] = useState()
    const [description,setDescription] = useState()
    const [type , setType] = useState()
    const handleSubmit = async(e) => {
        e.preventDefault();
        var latitude = location.latitude
        var longitude = location.longitude
        var postedBy = 1,
        alert = {title , description, type , latitude, longitude ,postedBy} 
        console.log("Alert : " + alert)
            await axios.post('http://localhost:5000/alert',alert)
            .then((res) =>{
                console.log("Alern added")
            }).catch( (error)=>{
                console.log("Internal Server Error" + error)
            })
    }
    
  return (
    <div className="flex flex-col justify-center bg-amber-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="w-full max-w-sm mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Alert Information</h1>
          <p className="mb-4 text-gray-600 text-lg">
            Provide the details for the alert below.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-2xl font-medium text-gray-700">Title</label>
              <input
              value={title}
              onChange={(e)=> e.target.value}
                type="text"
                placeholder="Enter Your Name"
                className="w-full border-2 border-gray-800 rounded-2xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-2xl font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e)=> e.target.value}
                placeholder="Enter Alert Description"
                className="resize-none w-full border-2 border-gray-800 rounded-lg px-6 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-2xl font-medium text-gray-700">Type of Alert</label>
              <select
              value={type}
              onChange={(e)=> e.target.value}
                className="w-full border-2 border-gray-800 rounded-2xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select alert type</option>
                <option value="info">Information</option>
                <option value="warning">Warning</option>
                <option value="disaster">Disaster</option>
                <option value="accident">Accident</option>
                <option value="warning">Traffic</option>
                <option value="event">Event</option>
              </select>
            </div>
            <button
                onClick={handleSubmit}
              type="submit"
              className="w-full py-3 mt-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              ADD ALERT
            </button>
          </form>
        </div>
      </div>
  )
}
