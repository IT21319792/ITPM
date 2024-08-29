import React from 'react';

const ThirdSection = () => {
    return (
        <div className='bg-gray-200 px-0 md:px-5 flex flex-col items-center justify-between md:py-40 py-10 space-y-5'>
            <div className='md:px-20 px-5 md:mb-0 mb-4 py-10 w-5/6 md:w-full border border-2 border-blue-900 rounded-xl' id='vision'>
                <h5 className='text-center font-bold'>VISION</h5>
                <br />
                <h1 className='text-blue-950 font-bold text-2xl text-center'>To advance knowledge, foster and promote innovation to enrich lives & broaden horizons</h1>
            </div>
            <div className='md:px-20 px-5 md:w-full py-10 w-5/6 border border-2 border-blue-900 rounded-xl' id='mission'>
                <h5 className='text-center font-bold'>MISSION</h5>
                <br />
                <p className='text-blue-950 font-bold text-2xl text-center'>To create a learning and research environment with best possible resources for our students and staff to be innovative and dedicated to excellence and to produce graduates with strong analytical, problem solving and communication skills.</p>
            </div>
            <div className='md:px-20 px-5 md:mb-0 mb-4 py-10 w-5/6 md:w-full border border-2 border-blue-900 rounded-xl' id='objectives'>
                <h5 className='text-center font-bold'>OUR OBJECTIVES</h5>
                <br />
                <h1 className='text-blue-950 font-bold text-2xl text-center'>Education & training of professionals at a high level of excellence in the fields of IT, business and engineering assisting and promoting enterprises, innovators and start-up companies with the necessary expertise to achieve business objectives provision of consultancy services and software services to public and private sector enterprises of Sri Lanka at a reasonable cost conduct and promotion of research & development leading to specialized applications, services and innovative technology products. Expanding horizons in the fields of IT, business and engineering to reach international level</h1>
            </div>
        </div>
    );
};

export default ThirdSection;


