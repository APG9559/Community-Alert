import React from 'react';

const Body = () => {
  return (
    <div>
      
      {/* <div style={{"
    background-image: url('./earth.jpg');
    background-size: 'cover';
    background-position: 'center';
    background-repeat: 'no-repeat';
    width: 100%;
    height: '100vh';"}}>
    </div> */}

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ab, consequatur exercitationem ipsa quis deserunt.
          </p>
          <form action="" className='flex flex-col md:flex-row md:gap-2'>
            <input className='rounded-md px-4 py-2 lg:px-10 placeholder:text-gray-400' type="email" name="email" id="" placeholder='Enter Your Email' />
            <button className='rounded-lg bg-emerald-400 hover:bg-emerald-600 px-4 py-2'>Join WishList</button>
          </form>

          <div className='flex gap-2'>
            <img src="./assets/Checkmark.svg" alt="" />
            <p className='font-lato text-black'>No spam, ever, Unsubscribe anytime</p>
          </div>
        </div>
      </div>

      <div className='border-t-2 border-zinc-400 mt-20 tracking-tight leading-none flex justify-between items-center px-20 py-5 text-white'>
        {["for public and private companies", "for the Ordinary people", "Anyone can use"].map((item, index) => (
          <p key={index} className='text-md font-light'>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default Body;
