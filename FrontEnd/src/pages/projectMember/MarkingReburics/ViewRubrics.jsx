import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function ViewRubrics() {
  
  return (
    <div className="main_container w-full h-full" id="print">
      <div className="item fw-bold text-left">
        <h5 className="pageName">Marking Rubrics Report</h5>
      </div>
      <div className="  item p-5 bg-lightWhite">
        <div className="flex justify-between mb-5 ">
          <h3 className="text-center w-full font-bold text-xl">
            {rubric.topic}
          </h3>
          <button
            className="btn btn-primary flex justify-between items-center w-52 text-white  bg-blue-800 rounded-md px-5 py-2"
            onClick={generatePDF}
          >
            <i className="fas fa-print"></i>
            download PDF
          </button>
        </div>
        <div className="flex justify-between mb-5">
          <div className="flex flex-col">
            <h3 className="text-black text-l font-bold">Type: {rubric.type}</h3>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-white uppercase bg-blue-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Criteria
                </th>
                <th scope="col" className="px-6 py-3 text">
                  Marks
                </th>
              </tr>
            </thead>
            <tbody>
              {renderReportList()}
              <tr className="text-black bg-lightWhite">
                <th scope="col" className="px-6 py-3 0">
                  Total Marks
                </th>
                <th scope="col" className="px-6 py-3 text">
                  {totalMarks}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
