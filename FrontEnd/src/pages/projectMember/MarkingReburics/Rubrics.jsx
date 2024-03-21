import { FaPlusCircle } from "react-icons/fa";
 
function Rubrics() {
  return (
    <div className="main_container w-full h-full">
      <div className="item fw-bold text-center">
        <h5 className="pageName">Marking Rubrics</h5>
      </div>
      <div className="card p-5 grid grid-cols-2 bg-lightWhite">
        <div className="w-full mx-auto rounded-md">
          <div className="w-full flex flex-row justify-between items-end pl-10 pr-10">
            <div className="flex items-center mb-4">
              <input
                id="default-radio-01"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-black border-gray-300 checked:bg-black checked:border-black"
              />
              <label
                htmlFor="default-radio-01"
                className="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
              >
                Report
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                checked
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-black border-gray-300 checked:bg-black checked:border-blac"
              />
              <label
                htmlFor="default-radio-2"
                className="ms-2 text-sm font-medium  cursor-pointer"
              >
                Presentation
              </label>
            </div>
          </div>
          <div className="mt-5 mx-auto border rounded-md bg-white">
            <div className="flex items-center justify-center p-5">
              <h4 className="text-lg text-gray-90 font-bold">
                Create Marking Rubrics
              </h4>
            </div>
            <form className="max-w-sm mx-auto text-center">
              <div className="mb-5">

                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-white bg-blue-600 border border-e-0 border-gray-300 rounded-l-lg ">
                    Topic
                  </span>
                  <input
                    type="text"
                    id="topic"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg block w-full p-2.5   "
                    placeholder="Enter Topic"
                    required
                  />
                </div>
              </div>
 
              <div className="mb-5">
                <div className="mb-3 border pb-6 border-gray-200 px-4 rounded-lg">
                  <div className="text-gray-500 dark:text-gray-400">
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-start"
                        htmlFor="enteredCriteria"
                      >
                        Criteria
                      </label>
                      <input
                        id="enteredCriteria"
                        placeholder="toRaw(education.education_end_date)"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        disabled
                        readOnly
                        required
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 mt-2">
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-start"
                        htmlFor="enteredMarks"
                      >
                        Marks
                      </label>
                      <input
                        id="enteredMarks"
                        placeholder="toRaw(education.education_end_date)"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        disabled
                        readOnly
                        required
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-end">
                  <button>
                    <FaPlusCircle className="text-blue-600" />
                  </button>
                </div>
                <label
                  htmlFor="criteria"
                  className="text-start block mb-2 text-sm font-medium text-gray-900 "
                >
                  Enter Marking Criteria
                </label>
                <input
                  type="text"
                  id="criteria"
                  placeholder="Enter Marking Criteria"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="marks"
                  className="text-start block mb-2 text-sm font-medium text-gray-900 "
                >
                  Marks
                </label>
                <input
                  type="text"
                  id="marks"
                  placeholder="Enter Marks"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="mb-4 text-white hover:bg-green-500 bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create Marking Rubric
              </button>
            </form>
          </div>
        </div>
        <div className="w-full mx-auto rounded-md">
          <div className="mx-auto rounded-md flex justify-center w-full">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-5">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Marking
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Type
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="mt-2 border">
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Apple MacBook Pro 17
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Silver
                    </td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Apple MacBook Pro 17
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Silver
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Rubrics;