import React from 'react'
import {motion} from 'framer-motion'

export default function Marquee() {
  return (
    <div className='w-full py-15s rounded-tr-3xl rounded-tl-3xl bg-[#004D43]'>
      
        <div className='text border-t-2 border-zinc-600 flex gap-10 whitespace-nowrap overflow-hidden text-white'>
            <motion.h1 initial={{x:0}} animate={{x: '-100%'}} transition={{ease: 'linear', repeat: Infinity, duration:5}} className='text-[15vw] leading-none font-playfiar font-semibold uppercase -mb-[2vw] pt-10'>Be Alert, Stay Ahead!</motion.h1> 
            <motion.h1 initial={{x:0}} animate={{x: '-100%'}} transition={{ease: 'linear', repeat: Infinity, duration:5}} className='text-[15vw] leading-none font-playfiar font-semibold uppercase -mb-[2vw] pt-10'>Be Alert, Stay Ahead!</motion.h1>
        </div>
    </div>
  )
}
