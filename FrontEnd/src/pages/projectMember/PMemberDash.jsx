import React from "react";
import PMemberWelcomeard from "../../components/PMemberWelcomeCard";
import { Link } from "react-router-dom";

function PMemberDash() {
  return (
    <>
      <PMemberWelcomeard />

      <div className="row mt-5 vh-100">
    <div className="ml-80 flex-column justify-content-center align-items-center h-100">
        <Link to="/dashboard/pMemberDash/SchedulePresentation">
            <button
                type="button"
                className="btnSchedule bg-blue-800 text-white font-bold rounded-md px-4 py-2 mb-3"
            >
                Create Schedule
            </button>
        </Link>
        <Link to="/dashboard/pMemberDash/ScheduledPresentations">
            <button
                type="button"
                className="btnSchedule bg-green-800 text-white font-bold rounded-md px-4 py-2 ml-20 mr-20"
            >
               Schedueled List  
            </button>
        </Link>
    </div>
</div>

    </>
  );
}
export default PMemberDash;
