import React from "react";
import Sidebar from '../../components/Sidebar';

function CoDash () {


    return (
        <div className="flex h-screen  bg-gray-100 ">
        <Sidebar/>
  
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
            <div >
              {/* Header Component */}
            </div>
  
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome Cordinator!</h1>
            <p className="mt-2 text-gray-600">Cordinator dashboard dummy</p>
          </div>
        </div>
      </div>
  
    )
}
export default CoDash;