import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RecruiterJobTable from "./RecruiterJobTable";
import { setSearchJobText } from "../../redux/JobSlice";

const RecruiterCreatedJobs = () => {
    const navigate = useNavigate()
    const [searchJobState, setSearchJobState] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(setSearchJobText(searchJobState))
    },[searchJobState])
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex justify-between items-center gap-2 p-2">
          <label className="input ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search the job" onChange={(e) => setSearchJobState(e.target.value)} />
          </label>
          <button className="btn btn-info" onClick={() => navigate("/newJob")}>New Job</button>
        </div>
      </div>
      <RecruiterJobTable />
    </div>
  );
};

export default RecruiterCreatedJobs;
