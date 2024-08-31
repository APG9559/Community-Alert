import React from 'react'

export default function Featured() {
  return (
    <div className='w-full pu-20'>
        <div className='w-full px-20 border-b-[1px] border-zinc-700 pb-20'>
            <h1 className='text-9xl font-["Neue_Montreal"] tracking-tight'>Featured</h1>
         </div>
         <div className='cards w-full flex gap-10'>
         <div className='cardcontainer rounded-xl w-1/2 h-{75vh} bg-red-500'>
                <div className='card w-full h-full rounded-xl  overflow-hiddem '>
                          <img className="w-full h-full bg-cover" src="" alt="" />
                </div>
            </div>
            <div className='cardcontainer rounded-xl w-1/2 h-{75vh} bg-red-500'>
                <div className='card w-full h-full rounded-xl  overflow-hiddem '>
                          <img className="w-full h-full bg-cover" src="" alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
