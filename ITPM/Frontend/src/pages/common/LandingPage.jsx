import React from 'react';
import TopNav from '../../components/TopNav';

function MainHeroContent() {

  return (
    <div>
      <TopNav />


      <section className="w-full px-6 pb-12 antialiased bg-white flex items-center justify-center">




        <div className="container max-w-lg px-4 py-32 text-center">

          <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
            <span className="inline md:block">Manage Your Projects Efficiently</span>
            <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">with Our Project Management Tool</span>
          </h1>
          <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg lg:text-lg">
            Organize tasks, collaborate with your team, and stay on top of deadlines with our intuitive project management tool.
          </div>
          <div className=" items-center mt-12 mx-6 text-center gap-5">
            <span className="relative inline-flex w-full md:w-auto">
              <a href="/studentsignup" className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                SignUp
              </a>{/* Student registration walata wenama form ekakata yanawa */}
            </span>
          </div>



          <div className=" items-center mt-12 mx-6 text-center gap-5">


            <span className="relative inline-flex mx-6 w-full md:w-auto">
              <a href="/login" className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Login
              </a>{/* same login page eka */}
            </span>

          </div>

        </div>

      </section>


    </div>

  );
}

export default MainHeroContent;
