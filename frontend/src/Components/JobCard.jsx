import { Bookmark, Building2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react"
const JobCard = ({job}) => {
  const navigate = useNavigate()
  const DaysAgoFunction = (createdAtTime) => {
    const createdTime = new Date(createdAtTime)
    const currentTime = new Date()
    const differenceDays = currentTime - createdTime
    return Math.floor(differenceDays/(1000*24*60*60))
  }
  return (
    <motion.div className="p-5 rounded-md shadow-md shadow-zinc-400 border border-zinc-300 cursor-pointer"
    initial={{opacity:0, x:100}}
    animate={{opacity:1, x:0}}
    transition={{duration:.2}}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-300">{DaysAgoFunction(job?.createdAt) === 0 ? "Today Posted": `${DaysAgoFunction(job?.createdAt)} days ago` }</p>
        <button className="btn btn-soft ">
          <Bookmark />
        </button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <div className="avatar">
          <div className="w-16 rounded">
            {job?.company?.logo ? 
            <img
              src={job?.company?.logo}
              alt="Tailwind-CSS-Avatar-component"
            /> :
            <Building2 className="size-[3rem]" />}
          </div>
        </div>
        <div>
          <h1 className="sm:text-lg font-medium w-full text-sm">{job?.company?.name}</h1>
          <p className="text-sm text-zinc-300">{job?.company?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-bold my-2">{job?.title}</h1>
        <p className="text-sm text-zinc-400">
        {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 my-2">
        <div className="badge badge-outline badge-accent ">{job?.position} Position</div>
        <div className="badge badge-outline badge-accent">{job?.jobType}</div>
        <div className="badge badge-outline badge-accent">{job?.Salary}</div>
      </div>
      <div className="flex gap-4">
      <button className="btn btn-outline" onClick={() => navigate(`/description/${job._id}`)}>Details</button>
      <button className=" btn btn-accent">Save for Later</button>
      </div>
    </motion.div>
  );
};

export default JobCard;
