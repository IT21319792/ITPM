import React from "react";
import PMemberWelcomeard from '../../components/PMemberWelcomeCard';
import { Link } from 'react-router-dom';


function PMemberDash() {
    return (
        <>
            <PMemberWelcomeard />
            <Link to="/pMemberDash/SchedulePresentation">
            <button type="button" className="btnSchedule bg-green-800 text-white font-bold rounded-md px-4 py-2">
                Schedule Presentation
            </button>

            </Link>
        </>
    );
}
export default PMemberDash;