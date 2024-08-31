import React from 'react'
import axios from 'axios'

const getAlerts = async (alert) =>{
    await axios.get('http://localhost:5000/addAlert?lat=' +lat +'&lng='+lng)
    .then((res) =>{
        return res
    }).catch( (error)=>{
        console.log("Internal Server Error" + error)
    })
  }

export default function VerifyAlerts() {
  return (
    <div>VerifyAlerts</div>
  )
}
