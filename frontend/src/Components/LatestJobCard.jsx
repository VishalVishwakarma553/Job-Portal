import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"
const LatestJobCard = ({ job }) => {
  const navigate = useNavigate()
  return (
    <motion.div onClick={() => navigate(`/description/${job._id}`)} className="p-5 mt-5 rounded-md border border-zinc-300 shadow shadow-zinc-500 cursor-pointer"
    whileInView={{opacity:1, y:0}}
    initial={{opacity:0, y:100}}
    transition={{duration:.5}}
    >
      <div>
        <h1 className="text-lg font-medium">{job?.company?.name}</h1>
        <p className="text-sm text-zinc-300">{job?.company?.location}</p>
      </div>
      <div>
        <h1 className="text-lg font-bold my-2">{job?.title}</h1>
        <p className="text-sm text-gray-300">{job?.description}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="badge badge-outline badge-accent">
          {job?.position} Position
        </div>
        <div className="badge badge-outline badge-accent">{job?.jobType}</div>
        <div className="badge badge-outline badge-accent">{job?.Salary}</div>
      </div>
    </motion.div>
  );
};

export default LatestJobCard;
