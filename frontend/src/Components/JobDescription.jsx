import { useParams } from "react-router-dom";
import axiosInstance from "../assets/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/JobSlice";
import { useEffect, useState } from "react";
import { motion } from "motion/react"

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axiosInstance.get(`/job/getJobId/${jobId}`);
        if (res.data?.job) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log("Error in getting singal job", error);
      }
    };
    fetchSingleJob();
  }, [jobId, user?._id]);

  //Apply job handler
  const applyJobHandler = async() =>{
    try{
      const res = await axiosInstance.get(`/application/applyJob/${jobId}`)
      if (res.data?.newApplication){
        setIsApplied(true)
        dispatch(setSingleJob({...singleJob, applications:[...singleJob.applications, {applicant:user?._id}]}))
      }
    }catch(error){
      console.log("Error in apply job habdler", error)
    }
  }
  return (
    <motion.div
    initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:.5}}
    className="max-w-6xl mx-auto my-10 p-5">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 my-3">
            <div className="badge badge-outline badge-accent ">
              {singleJob?.position}
            </div>
            <div className="badge badge-outline badge-accent">
              {singleJob?.jobType}
            </div>
            <div className="badge badge-outline badge-accent">
              {singleJob?.Salary}
            </div>
          </div>
        </div>
        <button
          className={`btn btn-soft ${isApplied ? "btn-error" : "btn-success"}`}
          disabled={isApplied}
          onClick={applyJobHandler}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
      <h1 className="text-lg font-medium border-b-2 border-zinc-200 py-2">
        Job description
      </h1>
      <div className="my-2">
        <h1 className="text-[18px] font-medium ">
          Role:{" "}
          <span className="ml-3 text-zinc-200 font-normal">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="text-[18px] font-medium ">
          Location:{" "}
          <span className="ml-3 text-zinc-200 font-normal">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="text-[18px] font-medium ">
          Description:{" "}
          <span className="ml-3 text-zinc-200 font-normal">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="text-[18px] font-medium ">
          Experience:{" "}
          <span className="ml-3 text-zinc-200 font-normal">
            {singleJob?.experience} yrs
          </span>
        </h1>
        <h1 className="text-[18px] font-medium ">
          Salary:{" "}
          <span className="ml-3 text-zinc-200 font-normal">
            {singleJob?.Salary}
          </span>
        </h1>
        <h1 className="text-[18px] font-medium ">
          Total Applicants:{" "}
          <span className="ml-3 text-zinc-200 font-normal">
            {singleJob?.applications.length}
          </span>
        </h1>
        <h1 className="text-[18px] font-medium ">
          Posted Date:{" "}
          <span className="ml-3 text-zinc-200 font-normal">
            {singleJob?.createdAt?.split("T")?.[0]}
          </span>
        </h1>
      </div>
    </motion.div>
  );
};

export default JobDescription;
