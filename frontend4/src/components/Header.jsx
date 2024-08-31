import React from 'react';
import { FaBars } from 'react-icons/fa'; // Assuming you want to use this for mobile menu toggle
import {Routes, Route, useNavigate} from 'react-router-dom';

const Header = () => {

  return (
    <div className='flex justify-between items-center fixed top-0 left-0 w-full z-[999] bg-white shadow-md px-8'>
      
      <div className='py-2 flex items-center'>
        {/* Uncomment and use icon if needed */}
        {/* <FaLightbulb className='text-3xl text-orange-400' /> */}
        <h1 className='text-2xl font-bold flex items-center ml-2'>
          Team <span className='text-5xl text-orange-400'>x</span> Zero
        </h1>
      </div>

      <ul className='hidden lg:flex justify-between items-center font-lato text-gray-500 gap-6'>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Sign up</a></li>
      </ul>

      <div className='hidden lg:flex justify-center items-center gap-2 font-lato'>
        <a className="text-gray-600" href="/login">About</a>
        {/* <button className='rounded-lg bg-emerald-400 hover:bg-emerald-600 px-4 py-2' >Get Started</button> */}
      </div>

      <div className='lg:hidden flex items-center pr-4'>
        <FaBars className='text-gray-600 text-2xl cursor-pointer' />
      </div>
    </div>
  );
}

export default Header;
