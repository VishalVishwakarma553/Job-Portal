import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { ArrowUpWideNarrow, CircleX } from "lucide-react";

const Jobs = () => {
  //Todo: Add Salary feature for filter
  const { job, InputFilterJob } = useSelector((store) => store.job);
  const [filterJobBrowse, setfilterJobBrowse] = useState(job);
  const [filterBanner, setFilterBanner] = useState(false);
  useEffect(() => {
    const filteredJobsBrowse = job.filter((job) => {
      if (!InputFilterJob) {
        return true;
      }
      return (
        job?.location?.toLowerCase().includes(InputFilterJob.toLowerCase()) ||
        job?.title?.toLowerCase().includes(InputFilterJob.toLowerCase())
      );
    });
    console.log("filteredJobsBrowse in use", filteredJobsBrowse);
    setfilterJobBrowse(filteredJobsBrowse);
  }, [InputFilterJob, job]);
  return (
    <div>
      <Navbar />
      {/* filter page */}
      {/* Job Card */}
      <div className="max-w-6xl mx-auto p-5">
        <div className="flex mb-4 items-center text-gray-300 bg-base-200 w-[150px] p-2 cursor-pointer hover:bg-base-300 md:hidden" onClick={() => setFilterBanner(true)}>
          {" "}
          <ArrowUpWideNarrow /> <h1 className="text-xl"> Apply Filter</h1>{" "}
        </div>
        <div className="flex gap-5">
          {/* Filter banner for small screen */}
          {filterBanner && <div className={`sm:w-[40%] w-[70%] h-full z-50 bg-base-300 fixed top-[60px] left-0 overflow-y-auto p-5 transition-transform duration-300 ${filterBanner ? "translate-x-0": "-translate-x-full"}`}>
            <FilterCard setFilterBanner={setFilterBanner} />
          </div>} 
            {/* Sidebar filter for large screen */}
          <div className="w-[20%] overflow-y-auto h-[100vh] md:h-full md:overflow-y-hidden hidden md:flex">
            <FilterCard setFilterBanner={setFilterBanner} />
          </div>
          {/* Jobs */}
          {filterJobBrowse.length <= 0 ? (
            <span>No Jobs Founds</span>
          ) : (
            <div className="flex-1 h-[100vh]  overflow-y-auto">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {filterJobBrowse.map((job) => (
                  <JobCard job={job} key={job._id}  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Jobs;
