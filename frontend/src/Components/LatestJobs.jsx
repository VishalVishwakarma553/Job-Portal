import { useSelector } from "react-redux"
import LatestJobCard from "./LatestJobCard"

const LatestJobs = () => {
    const {job} = useSelector((store) => store.job)
    return (
        <div className="w-full max-w-6xl mx-auto p-5 ">
            <h1 className="text-4xl font-bold"><span className="text-[#6A38C2]">Latest & Top </span>Job Openings</h1>
            <div className={`${job.length != 0? "grid md:grid-cols-2 sm:grid-cols-1  lg:grid-cols-3 gap-5":"my-12 flex justify-center items-center"}`}>
                {
                    job.length <= 0?<span className=" text-2xl font-bold text-zinc-400">No jobs available</span> :job.slice(0,6).map((job, idx) => <LatestJobCard job = {job} key={idx}></LatestJobCard>)
                }
            </div>
        </div>
    )
}

export default LatestJobs