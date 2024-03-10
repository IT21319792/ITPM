import React from "react";
import Sidebar from "../../components/StudentSidebar";
import TopNav from "../../components/TopNav";


function Assignments() {

    return(
        <>
            <Sidebar /> 
            
            <div style={{ marginLeft: '240px' }}>
            
                <TopNav />
                </div>

                <h1 style={{ marginLeft: '500px', marginTop: '200px'}}>THis is Assignments page</h1>
        </>

    );
}
export default Assignments;