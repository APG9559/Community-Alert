import { useState } from 'react';
import * as React  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [message,setMessage] = useState('')

    const validateForm = () => {
      const errors = {};

      if (!name) {
          errors.name = 'Name is required';
      }

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

      if (!mobile) {
        errors.mobile = 'Mobile is required';
    } else if (mobile.length !== 10) {
        errors.password = 'Mobile must be 10 characters long';
    }

      return errors;
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
    } else {
        // Data to send to the backend
        const userData = { name, email, password, mobile };
        console.log(userData)
        await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessage('User registered successfully!');
            })
            .catch((error) => {
                console.error('There was an error registering the user!', error);
                setMessage('Failed to register user.');
            });
    }
};


  
    return (
        <div className="flex h-screen bg-gray-100">
          {/* Left Side */}
          <div className="flex items-center justify-center h-35 w-1/2">
            <div className="bg-white hover:scale-[1.02] px-8 py-8 rounded-3xl border-2 mt-5 border-gray-200 w-full max-w-md">
              <h1 className="text-4xl font-semibold">Signup Your Account</h1>
              <p className="font-medium text-lg mt-4 text-orange-600">
                Please SignUp to access our services
              </p>
    
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-lg font-medium">Name </label>
                  <input 
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 hover:scale-[1.03] border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                    placeholder="Enter Your Name"
                    type="text"
                  />
                  {error.name && <div className='error text-red-500'>{error.name}</div>}

                </div>
                <div>
                  <label className="text-lg font-medium">Mobile No.</label>
                  <input
                   value={mobile}
                   onChange={(e) => setMobile(e.target.value)}
                    className="w-full border-2 hover:scale-[1.03]  border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                    placeholder="Enter Your Mobile No."
                    type="text"
                  />
                  {error.mobile && <div className='error text-red-500'>{error.mobile}</div>}

                </div>
                <div>
                  <label className="text-lg font-medium ">Email</label>
                  <input
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 hover:scale-[1.03] border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                    placeholder="Enter Your email"
                    type="email"
                  />
                  {error.email && <div className='error text-red-500'>{error.email}</div>}
                </div>
                <div>
                  <label className="text-lg font-medium">Password</label>
                  <input
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 hover:scale-[1.03] border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                    placeholder="Enter Your password"
                    type="password"
                  />
                  {error.password && <div className='error text-red-500'>{error.password}</div>}
                </div>
              </div>
    
              <div className="mt-8 flex justify-between items-center">
                <div>
                  <input type="checkbox" id="remember" />
                  <label className="ml-2 font-medium text-base" htmlFor="remember">
                    Remember for 30 days
                  </label>
                </div>
                <button className="font-medium text-base text-violet-500 hover:scale-[.98]">
                  Forgot Password
                </button>
              </div>
    
              <div className="mt-8 flex flex-col gap-y-4">
                <button onClick={handleSubmit} className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">
                  Sign up
                </button>
                <button>
                <Link  className="flex rounded-xl py-3 border-2 items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out" to="/login">
                  Already Registered
                </Link></button>
              </div>
            </div>
          </div>
    
          <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
            {/* Centered Ball */}
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
            </div>
            {/* Bottom Blur Effect */}
            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" ></div>
          </div>
        </div>
      );
}
