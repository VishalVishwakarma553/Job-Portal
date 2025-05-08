import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBrowseCompanySearch } from "../redux/CompanySlice";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"
const HeroSection = () => {
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const browseJobHandler =() => {
    dispatch(setBrowseCompanySearch(input))
    navigate("/browse")
  }
  return (
    <div className="text-center max-w-6xl mx-auto">
      <div className="flex flex-col gap-5 my-10 space-y-4">
        <span className="px-4 py-2 mx-auto bg-gray-100 rounded-full font-medium text-[#F83002] ">
          No. 1 Job Search & Finding Website
        </span>
        <h1 className="text-5xl font-bold ">
          Search, Apply & <br /> Get Your{" "}
          <motion.span
          initial={{opacity:0, y:-100}}
          animate={{opacity:1, y:0}}
          transition={{duration:2}}
          className="text-[#6A38C2]">Dream Jobs</motion.span>
        </h1>
        <p className="text-zinc-300 font-medium ">
          <span className="heading ml-1">Get Hired</span> is fully functional platform which helps job seekers to grab their dream job by applying with smooth behaviour and also help recruiters to create job accept and reject the applicant job in real time
        </p>
        <div className="sm:w-[40%] w-[80%] flex items-center mx-auto border border-zinc-300 rounded-full pl-3">
          <input
            type="text"
            placeholder="Find your dream job"
            className="border-none w-full outline-none"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary rounded-r-full" onClick={browseJobHandler}>
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
