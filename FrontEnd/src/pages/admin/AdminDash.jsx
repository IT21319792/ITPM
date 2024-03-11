import React from "react";
import AddUsersSuperAdmin from "../../components/AddUsersSuperAdmin";
import Sidebar from "../../components/Sidebar";

function AdminDash () {


    return (
        <div className="flex">
           
            <h1 className="text-2xl font-bold">Welcome Cordinator!</h1>
            <p className="mt-2 text-gray-600">Cordinator dashboard dummy</p>
       
            <Sidebar/>
   <AddUsersSuperAdmin/>
        
        </div>
     
    );
}

export default AdminDash;