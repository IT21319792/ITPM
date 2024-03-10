import React from "react";
import TopNav from "../../components/TopNav";
import Sidebar from "../../components/StudentSidebar";

function Research () {


    return(
        <>
        <Sidebar /> 
        
        <div style={{ marginLeft: '240px' }}>
        
            <TopNav />
            </div>

            <h1 style={{ marginLeft: '500px', marginTop: '200px'}}>THis is Research page</h1>
    </>


    );
}
export default Research;