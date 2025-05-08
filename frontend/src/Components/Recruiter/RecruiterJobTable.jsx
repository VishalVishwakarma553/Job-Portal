import { ArrowRightFromLine, Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import useGetRecruiterCreatedJob from "../../CustomHook/useGetRecruiterCreatedJob";
import { motion } from "motion/react"
const RecruiterJobTable = () => {
  const navigate = useNavigate()
  useGetRecruiterCreatedJob()
  const {recruiterJob, searchJobText} = useSelector((store) => store.job)
  const [filterJob , setFilterJob] = useState(recruiterJob)
  useEffect(() => {
    const filteredJob = recruiterJob.length >=0 && recruiterJob.filter((job) => {
      if(!searchJobText){
        return true
      }
      return job?.title?.toLowerCase().includes(searchJobText.toLowerCase())
    })
    setFilterJob(filteredJob)
  },[recruiterJob, searchJobText])
  return (
    <motion.div 
    initial={{opacity:0, x:100}}
    animate={{opacity:1, x:0}}
    transition={{duration: .2}}
    className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-w-6xl mx-auto ">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Role</th>
            <th>Date</th>
            <th>Action</th>
            <th>Applicants</th>
          </tr>
        </thead>
        <tbody>
          {
            filterJob.map((job) => (
              <tr key={job._id}>
            <th>
             {job.company.name}
            </th>
            <td>{job.title}</td>
            <td>{job.createdAt.split("T")?.[0]}</td>
            <td>
              <button  className="flex gap-1 items-center cursor-pointer">
                  <Pencil className="w-4"/>
                  Edit
              </button>
            </td>
            <td>
              <button  className="flex gap-1 items-center cursor-pointer" onClick={()=> navigate(`/job/applicant/${job._id}`)}>
                  See all
                  <ArrowRightFromLine className="w-4 h-4"/>
              </button>
            </td>
          </tr>
            ))
          }
        </tbody>
      </table>
    </motion.div>
  );
};

export default RecruiterJobTable;
