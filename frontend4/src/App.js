import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'
import About from './components/About'
import './App.css'
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';
import NewMap from './components/NewMap.jsx';
import AddAlert from './components/AddAlert.jsx';
import VerifyAlerts from './components/VerifyAlert.jsx';
import Main from './components/Main.jsx'

export default function App() {
  return ( 
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
         <Route path="/" element={< Home />} />
       <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         <Route path="/about" element={<About />} />
         <Route path="/main" element={<Main/>} />
         <Route path='/oldmap' element={<Map/>} /> 

        <Route path='/map' element={<NewMap/>} /> 
        <Route path='/verifyAlerts' element={<VerifyAlerts/>} /> 
        <Route path='/addAlert' element={<AddAlert/>}/>
      </Routes>
      
    </BrowserRouter>
    
    </>
  );
}

