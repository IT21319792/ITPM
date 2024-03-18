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
            <form id="itemForm" className="ml-7">
              <div className="grid grid-cols-2">
                <div className="col">
                  <label class="block text-sm font-medium text-slate-500" htmlFor="group ">Select Group</label>
                  <div class="relative h-10 w-72 min-w-[425px]">
                    <select class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                      <option selected="Select Group">Select Group</option>
                      <option value="Group 01">Group 01</option>
                      <option value="Group 02">Group 02</option>
                      <option value="Group 03">Group 03</option>
                      <option value="Group 04">Group 04</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <label class="block">
                    <span class="block text-sm font-medium text-slate-500">
                      Select Date
                    </span>
                    <input
                      type="date"
                      class="block min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                    <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                      Please provide a valid date.
                    </p>
                  </label>
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
