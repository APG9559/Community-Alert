import React from 'react'
import Header from './Header'
import Body from './Body'
import Marquee from './Marquee'
import About from './About'

export default function Home() {
  return (
    <div className="bg-amber-50 min-h-screen px-6 py-3 flex flex-col  md:px-10 md:py-7 md:justify-between  lg:px-8 lg:py-5">
       
       <Body/>
       <Marquee/>
       <About/>
  
     </div>
  )
}
