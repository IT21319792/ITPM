import React from 'react'
// import BasicDateCalendar from './BasicDateCalendar'


const Footer = () => {
    return (
        <div className='bg-gray-500 border-t-8 border-blue-950 flex md:flex-row flex-col items-center justify-between px-10' id='support'>
            <div className='text-white'>
                <h5 className='md:mt-20' style={{ marginTop: '20px' }}>DO YOU NEED ANY<br />SUPPORT ?</h5>
                <a href="/">system.ProjectModuleManagement.lk</a><br/>
                <a href="tel:+94 11 754 4801">+94 11 754 4801</a><br />
                <p className='p-5 bg-blue-950 hover:bg-blue-900 cursor-pointer my-8 md:my-0'> Provide Feedback to Project Module Management System</p>
            </div>
            <div>
                {/* <BasicDateCalendar /> */}
            </div>
        </div>
    )
}

export default Footer