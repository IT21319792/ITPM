import { useEffect, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import Sweetalert2 from "sweetalert2";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

function UpdateRubrics() {
  const { id } = useParams();

  const [enteredRubrics, setEnteredRubrics] = useState([]);

  const [rubric, setRubric] = useState({});

  const [isReportClicked, setIsReportClicked] = useState(false);

  const [reportList, setReportList] = useState([]);

  const [presentationList, setPresentationList] = useState([]);

  const navigate = useNavigate();

  const Toast = Sweetalert2.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Sweetalert2.stopTimer;
      toast.onmouseleave = Sweetalert2.resumeTimer;
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:510/rubric/searchrubricbyid/" + id)
      .then((response) => {
        setRubric({
          rubricID: response.data.data.rubricID,
          topic: response.data.data.topic,
        });
        setEnteredRubrics(response.data.data.criteriaDetails);
      });
  }, [id]);

  useEffect(() => {
    if (!isReportClicked) {
      loadAllReports();
    } else {
      loadAllPresentations();
    }
  }, [isReportClicked]);

  const loadAllReports = () => {
    axios
      .get("http://localhost:510/rubric/searchrubrictype/Report")
      .then((response) => {
        setReportList(response.data.data);
      });
  };

  const loadAllPresentations = () => {
    axios
      .get("http://localhost:510/rubric/searchrubrictype/Presentation")
      .then((response) => {
        setPresentationList(response.data.data);
      });
  };

  const handleOnChange = (e) => {
    setRubric({ ...rubric, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isReportClicked) {
      rubric.type = "Report";
    } else {
      rubric.type = "Presentation";
    }

    const filteredEnteredRubrics = enteredRubrics.map((rubric) => {
      return {
        criteria: rubric.criteria,
        marks: rubric.marks,
      };
    });

    const newRubric = {
      rubricID: rubric.rubricID,
      _id: id,
      topic: rubric.topic,
      criteriaDetails: filteredEnteredRubrics,
      type: rubric.type,
    };

    axios
      .put("http://localhost:510/rubric/putrubric/" + id, newRubric)
      .then((response) => {
        if (response.data.result.status === 200) {
          Toast.fire({
            icon: "success",
            title: `${response.data.message}`,
          });
          if (!isReportClicked) {
            loadAllReports();
            document.querySelector("#rubricsFrom").reset();
            setRubric({});
            navigate("/dashboard/markingRubric");
          } else {
            loadAllPresentations();
            document.querySelector("#rubricsFrom").reset();
            navigate("/dashboard/markingRubric");
            setRubric({});
          }
        }
      });
  };

  const checkReportRadioClicked = () => {
    setIsReportClicked(!isReportClicked);
  };

  const deleteRubric = (rubric) => {
    Toast.fire({
      icon: "warning",
      title: "Are you sure you want to delete?",
      confirmButtonColor: "#1044A7",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:510/rubric/deleterubric/${rubric.rubricID}`)
          .then((response) => {
            if (response.data.result.status === 200) {
              Toast.fire({
                icon: "success",
                title: `${response.data.message}`,
              });
              if (!isReportClicked) {
                loadAllReports();
                navigate("/dashboard/markingRubric");
              } else {
                loadAllPresentations();
                navigate("/dashboard/markingRubric");
              }
            }
          });
      }
    });
  };

  const renderReportList = () => {
    console.log(reportList);
    return reportList.map((report, index) => {
      return (
        <tr key={index} className="bg-white border-b hover:bg-gray-50">
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {report.topic}
          </td>
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {report.type}
          </td>
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            <Link to={`/dashboard/updateMarkingRubric/${report._id}`}>
              <button className="btn btn-default ml-7">
                <i
                  style={{ cursor: "pointer", color: "#1044A7" }}
                  className="fa-solid fa-pen me-3  d-inline"
                />
              </button>
            </Link>
            <button
              className="btn btn-default ml-3"
              onClick={() => deleteRubric(report)}
            >
              <i
                style={{ cursor: "pointer", color: "#ff0000" }}
                className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"
              />
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderPresentationList = () => {
    return presentationList.map((presentation, index) => {
      return (
        <tr key={index} className="bg-white border-b hover:bg-gray-50">
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {presentation.topic}
          </td>
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {presentation.type}
          </td>
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            <Link to={`/dashboard/updateMarkingRubric/${presentation._id}`}>
              <button className="btn btn-default ml-7">
                <i
                  style={{ cursor: "pointer", color: "#1044A7" }}
                  className="fa-solid fa-pen me-3  d-inline"
                />
              </button>
            </Link>
            <button
              className="btn btn-default ml-3"
              onClick={() => deleteRubric(presentation)}
            >
              <i
                style={{ cursor: "pointer", color: "#ff0000" }}
                className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"
              />
            </button>
          </td>
        </tr>
      );
    });
  };

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
                id="marks-radio"
                type="radio"
                name="default-radio"
                value={!isReportClicked}
                className="w-4 h-4 text-black border-gray-300 checked:bg-black checked:border-black"
                checked={!isReportClicked}
                onChange={() => {
                  checkReportRadioClicked();
                }}
              />
              <label
                htmlFor="marks-radio"
                className="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
              >
                Report
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                checked={isReportClicked}
                id="presentation-radio"
                type="radio"
                name="default-radio"
                value={isReportClicked}
                className="w-4 h-4 text-black border-gray-300 checked:bg-black checked:border-blac"
                onChange={() => {
                  checkReportRadioClicked();
                }}
              />
              <label
                htmlFor="presentation-radio"
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
            <form className="max-w-sm mx-auto text-center" id="rubricsFrom">
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
                    value={rubric.topic}
                    required
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="mb-5">
                <div
                  className={
                    enteredRubrics.length > 0
                      ? "mb-3 border pb-6 border-gray-200 px-4 rounded-lg block"
                      : "mb-3 border pb-6 border-gray-200 px-4 rounded-lg hidden"
                  }
                >
                  {enteredRubrics.map((rubric, index) => (
                    <div key={index} className="mt-3">
                      <div className="text-gray-500 dark:text-gray-400">
                        <div className="flex justify-end items-end">
                          <button>
                            <FaMinusCircle
                              className={
                                "text-red-600 " +
                                (index < 0 ? "hidden" : "block")
                              }
                              onClick={() => {
                                setEnteredRubrics(
                                  enteredRubrics.filter(
                                    (rubric, i) => i !== index
                                  )
                                );
                              }}
                            />
                          </button>
                        </div>
                        <div>
                          <label
                            className="block mb-2 text-sm font-medium text-start"
                            htmlFor="enteredCriteria"
                          >
                            Criteria
                          </label>
                          <input
                            id="enteredCriteria"
                            placeholder={rubric.criteria}
                            value={rubric.criteria}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            type="text"
                            onChange={(e) => {
                              enteredRubrics[index].criteria = e.target.value;
                              setEnteredRubrics([...enteredRubrics]);
                            }}
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
                            placeholder={rubric.marks}
                            value={rubric.marks}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            type="text"
                            onChange={(e) => {
                              enteredRubrics[index].marks = e.target.value;
                              setEnteredRubrics([...enteredRubrics]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-end">
                  <button>
                    <FaPlusCircle
                      className="text-green-600"
                      onClick={(e) => {
                        e.preventDefault();
                        if (rubric.criteria && rubric.marks) {
                          setEnteredRubrics([...enteredRubrics, rubric]);
                        } else {
                          Toast.fire({
                            icon: "error",
                            title: `Please fill the criteria and marks`,
                          });
                        }
                      }}
                    />
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
                  onChange={handleOnChange}
                  onFocus={(e) => {
                    e.preventDefault();
                    e.target.value = "";
                  }}
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
                  onChange={handleOnChange}
                  onFocus={(e) => {
                    e.preventDefault();
                    e.target.value = "";
                  }}
                />
              </div>
              <button
                type="submit"
                className="mb-4 text-white hover:bg-green-500 bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={onSubmit}
              >
                Update Marking Rubric
              </button>
            </form>
          </div>
        </div>
        <div className="w-full mx-auto rounded-md">
          <div className="mx-auto rounded-md flex justify-center w-full">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-fit">
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
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="mt-2 border">
                  {!isReportClicked
                    ? renderReportList()
                    : renderPresentationList()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateRubrics;
