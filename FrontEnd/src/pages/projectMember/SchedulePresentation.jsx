import React, { useEffect, useState } from "react";
import "../../styles/SchedulePresentation.css";

function SchedulePresentation() {
  return (
    <div className="main_container w-full h-full">
      <div className="item fw-bold">
        <h5 className="pageName">Schedule Presentation</h5>
      </div>

      <div className="card p-5">
        <div className="smallcard row max-w-5xl mx-auto border rounded-md py-10 px-10">
          <div className="col-md-6">
            <form id="itemForm">
              <div className="grid grid-cols-2">
                <div className="col">
                  <label class="block text-sm font-medium text-slate-500" htmlFor="group ">Select Group</label>
                  <div class="relative h-10 w-72 min-w-[200px] mt-2">
                    <select class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200">
                      <option value="Group 01">Group 01</option>
                      <option value="Group 02">Group 02</option>
                      <option value="Group 03">Group 03</option>
                      <option value="Group 04">Group 04</option>
                    </select>
                  </div>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePresentation;
