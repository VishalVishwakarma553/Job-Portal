import { useState } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import axiosInstance from "../../assets/lib/axios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"

const NewJob = () => {
  const { userCompany } = useSelector((store) => store.company);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    experience: "",
    location: "",
    jobType: "",
    position: "",
    Salary: "",
    companyId: "",
  });
  const onChangeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const selectChangeHandler = (e) => {
    const selectedCompany = userCompany.find(
      (company) => company.name === e.target.value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const res = await axiosInstance.post("/job/createJob", input)
      if (res.data.job){
        navigate("/recruiterJobs")
      }
    }catch(error){
      console.log("Error in job creation", error)
    }finally{
      setLoading(false)
    }
  };
  return (
    <div className="overflow-x-hidden">
      <Navbar></Navbar>
      <motion.div
      initial={{opacity:0, y:40}}
      animate={{opacity:1, y:0}}
      className="flex justify-center items-center w-screen my-10 p-3">
        <form
          className="border border-zinc-600  shadow-md shadow-zinc-400 p-4 rounded-md "
          onSubmit={submitHandler}
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 ">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                What is your Job title?
              </legend>
              <input
                type="text"
                className="input"
                placeholder="title"
                onChange={onChangeInputHandler}
                value={input.title}
                name="title"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                What is your Job description?
              </legend>
              <input
                type="text"
                className="input"
                placeholder="description"
                onChange={onChangeInputHandler}
                value={input.description}
                name="description"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                What is your Job requirements?
              </legend>
              <input
                type="text"
                className="input"
                placeholder="requirements"
                onChange={onChangeInputHandler}
                value={input.requirements}
                name="requirements"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is experience?</legend>
              <input
                type="text"
                className="input"
                placeholder="experience"
                onChange={onChangeInputHandler}
                value={input.experience}
                name="experience"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is location?</legend>
              <input
                type="text"
                className="input"
                placeholder="location"
                onChange={onChangeInputHandler}
                value={input.location}
                name="location"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is jobType?</legend>
              <input
                type="text"
                className="input"
                placeholder="jobType"
                onChange={onChangeInputHandler}
                value={input.jobType}
                name="jobType"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is position?</legend>
              <input
                type="text"
                className="input"
                placeholder="position"
                onChange={onChangeInputHandler}
                value={input.position}
                name="position"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is Salary?</legend>
              <input
                type="text"
                className="input"
                placeholder="Salary"
                onChange={onChangeInputHandler}
                value={input.Salary}
                name="Salary"
              />
            </fieldset>
            {userCompany.length > 0 && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Select Company</legend>
                <select
                  
                  defaultValue="Pick a company"
                  className="select"
                  onChange={selectChangeHandler}
                >
                  <option disabled={true}>Pick a browser</option>
                  {userCompany.map((company) => (
                    <option key={company._id}>{company.name}</option>
                  ))}
                </select>
              </fieldset>
            )}
            
          </div>
          {
            loading ? <button
            className="btn btn-active btn-primary w-full my-4"
            type="submit"
          >
            <Loader className="w-4 h-4 mr-2 animate-spin"/>
            Create
          </button>:<button
            className="btn btn-active btn-primary w-full my-4"
            type="submit"
          >
            Create
          </button>
          }
          
          {userCompany.length > 0 && (
            <p className="text-sm text-zinc-300">
              Please register a company first before posting a job
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};
export default NewJob;
