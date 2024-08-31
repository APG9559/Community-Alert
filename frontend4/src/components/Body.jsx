import React from 'react';

const Body = () => {
  return (
    <div>
      <div className='flex pt-24'>
        {/* photo div starts */}
        <div className='flex items-center justify-center lg:flex-1 lg:h-[400px] lg:order-1 relative'>
          <img src="./assets/Blue-Shape.svg" alt="" className='-rotate-45 h-64 md:h-72 lg:h-[400px] absolute' />
          <img src="./assets/Pink-Shape.svg" alt="" className='absolute -rotate-[30deg] h-64 md:h-72 lg:h-[400px]' />
          <img src="./assets/Purple-Shape.svg" alt="" className='absolute -rotate-[15deg] h-64 md:h-72 lg:h-[400px]' />
          <img src="./assets/Hero-Model.png" alt="" className='absolute h-64 md:h-72 lg:h-[400px]' />
            
        </div>
{/* photo div ends */}
        <div className='flex-1 lg:order-2 lg:space-y-4'>
          <h1 className='uppercase text-7xl font-bold font-playfair leading-[5vw] tracking-tighter text-black'>
            Welcome! to the Community Alert System
          </h1>
          <p className='font-lato text-black lg:text-xl'>
          Neighbors Helping Neighbors, One Alert at a Time! Empowering Communities with Instant Alerts!
          </p>
          <p className='font-lato text-black lg:text-xl'>
          
          </p>
          {/* <form action="" className='flex flex-col md:flex-row md:gap-2'>
            <input className='rounded-md px-4 py-2 lg:px-10 placeholder:text-gray-400' type="email" name="email" id="" placeholder='Enter Your Email' />
            <button className='rounded-lg bg-emerald-400 hover:bg-emerald-600 px-4 py-2'>Join WishList</button>
          </form> */}
         
        </div>
      </div>

      <div className='border-t-2 border-zinc-400 mt-20 tracking-tight leading-none flex justify-between items-center px-20 py-5 text-black'>
        {["for public and local authorities", "for the Ordinary people", "Anyone can use"].map((item, index) => (
          <p key={index} className='text-md font-light'>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default Body;
