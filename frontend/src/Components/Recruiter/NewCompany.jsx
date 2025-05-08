import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import axiosInstance from "../../assets/lib/axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../../redux/CompanySlice";
import { motion } from "motion/react"
const NewCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const createCompanyHandler = async () => {
    try {
      if(!companyName){
        return
      }
      const res = await axiosInstance.post("/company/createCompany", {
        companyName,
      });
      if (res?.data?.newCompany) {
        dispatch(setSingleCompany(res?.data?.newCompany));
        navigate(`/companySetup/${res?.data?.newCompany?._id}`);
      }
    } catch (error) {
      console.log("error in create compnay handler", error?.res?.data?.message);
    }
  };
  return (
    <>
      <Navbar />
      <motion.div 
      initial={{opacity:0, x:100}}
      animate={{opacity:1, x:0}}
      className="max-w-4xl mx-auto p-5">
        <div className="my-10">
          <h1 className="text-2xl font-bold">Your Company Name</h1>
          <p className="text-gray-300">
            Give the company name that you want to create. you can change it
            later
          </p>
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-xl">Create Company</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </fieldset>
        <div className="my-5 flex gap-5">
          <button
            className="btn btn-outline "
            onClick={() => navigate("/recruiter/companies")}
          >
            Cancel
          </button>
          <button
            className="btn btn-soft border border-zinc-500"
            onClick={createCompanyHandler}
          >
            Create
          </button>
        </div>
      </motion.div>
    </>
  );
};
export default NewCompany;
