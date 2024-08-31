import React  from 'react'
// import Form from './Form'
import axios from 'axios'
import { useState } from 'react';
import {createContext} from 'react'
import {Link} from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

import Signup from './Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const errorcontext = createContext();
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [message,setMessage] = useState('')

    const validateForm = () => {
      const errors = {};

      if (!email) {
          errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = 'Email is invalid';
      }
      
      if (!password) {
          errors.password = 'Password is required';
      } else if (password.length < 6) {
          errors.password = 'Password must be at least 6 characters long';
      }

      return errors;
    };  

    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log("Hello login")
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
          setError(validationErrors);
      } else {
          // Data to send to the backend
          const userData = { email, password};

          console.log(userData)
          await fetch('http://localhost:5000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
          })
              .then((response) => {
                const data = response.data
                if(data.isLogin === 'success'){
                  
                }
              })
              .then((data) => {
                  console.log(data);
                  setMessage('Login successfully!');
              })
              .catch((error) => {
                  console.error('There was an error login the user!', error);
                  setMessage('Failed to login user.');
              })
      }
  };

    

    return (
        <div className="flex w-full h-screen items-center">
          {/* Left Side */}
          <div className="w-full flex items-center justify-center lg:w-1/2">
          <errorcontext.Provider value = {{error}}>
          <div className="bg-white px-10 py-12 rounded-3xl border-2 border-gray-200 max-w-screen-md shadow-xl">
          <h1 className="text-5xl font-semibold">Welcome Back</h1>
          <p className="font-medium text-lg mt-4 text-orange-600">
            Welcome Back! Please enter your details
          </p>
          
    
          <div className="mt-4">
            <div>
              <label classNanameme="text-lg font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 hover:scale-[1.03] border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Your email"
                type="email"
              />
              
            </div>
    
            <div className="mt-4">
              <label className="text-lg font-medium">Password</label>
              <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                className="w-full hover:scale-[1.03] border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter Your password"
                type="password"
              />
            </div>
    
            <div className="mt-8 flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label className="ml-2 font-medium text-base" htmlFor="remember">
                  Remember for 30 days
                </label>
              </div>
              <button className="font-medium text-base hover:scale-[.98] text-violet-500">
                Forgot Password
              </button>
            </div>
    
            <div className="mt-8 flex flex-col gap-y-4">
              <button onClick={handleSubmit } className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">
                Sign in
              </button>
              {/* <button className="flex rounded-xl py-3 border-2 items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out">
                Sign in with Google
              </button> */}
            </div>
    
            <div className="mt-8 flex items-center justify-center">
              <p className="font-medium text-base">Don't have an account?</p>
              <Link className="hover:scale-[.98] text-violet-900 ml-2" to="/signup">
                Signup
              </Link>
            </div>
          </div>
        </div>
          </errorcontext.Provider>
          </div>
    
          {/* Right Side */}
          <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
            {/* Centered Ball */}
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
            </div>
            {/* Bottom Blur Effect */}
            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
          </div>
        </div>
    
      );
}
