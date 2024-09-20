import React from 'react'
import ComputerIcon from '@mui/icons-material/Computer';
const MiddleBarOnCarasoul = () => {
  return (
    <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-max z-10 md:block hidden'>
        <button className='p-14 bg-white text-blue-950 hover:bg-gray-100'>
            <ComputerIcon sx={{fontSize:'32px'}} /><br/>
            Contact Support
        </button>
        <button className='p-14 bg-white text-blue-950 hover:bg-gray-100'>
            <ComputerIcon sx={{fontSize:'32px'}} /><br/>
            Prototype
        </button>
        <button className='p-14 bg-white text-blue-950 hover:bg-gray-100'>
            <ComputerIcon sx={{fontSize:'32px'}} /><br/>
            Development
        </button>
        <button className='p-14 bg-white text-blue-950 hover:bg-gray-100'>
            <ComputerIcon sx={{fontSize:'32px'}} /><br/>
            Coming Soon
        </button>
        <button className='p-14 bg-white text-blue-950 hover:bg-gray-100'>
            <ComputerIcon sx={{fontSize:'32px'}} /><br/>
            Coming Soon
        </button>
    </div>
  )
}

export default MiddleBarOnCarasoul