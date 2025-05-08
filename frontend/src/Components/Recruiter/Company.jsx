import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyText } from "../../redux/CompanySlice";

const Company = () => {
    const navigate = useNavigate()
    const [searchCompanyState, setSearchCompanyState] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(setSearchCompanyText(searchCompanyState))
    },[searchCompanyState])
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex justify-between items-center p-2 gap-2">
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
            <input type="search" required placeholder="Search the company" onChange={(e) => setSearchCompanyState(e.target.value)} />
          </label>
          <button className="btn btn-info" onClick={() => navigate("/newCompany")}>New Company</button>
        </div>
      </div>
      <CompanyTable />
    </div>
  );
};

export default Company;
