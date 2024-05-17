import React from 'react'
import LoaderAnim from '../../assets/loader.gif'
const Loader = () => {
    return (
        <div className='absolute top-0 left-0 w-full h-full bg-white py-20 transition-all flex items-center justify-center z-10'>
            <div className='md:w-1/4 w-full aspect-video mx-auto'>
                <img src={LoaderAnim} alt="loading..." className='w-full h-full' />
            </div>
        </div>
    )
}

export default Loader