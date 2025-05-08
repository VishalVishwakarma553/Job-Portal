import { useDispatch, useSelector } from "react-redux"
import JobCard from "./JobCard"
import Navbar from "./Navbar"
import useGetAllJobs from "../CustomHook/useGetAllJobs"
import { useEffect } from "react"
import { setBrowseCompanySearch } from "../redux/CompanySlice"

const Browse = () => {
    // const browseJob = [1, 2,3,4,5,6 ]
    useGetAllJobs()
    const dispatch = useDispatch()
    const {job} = useSelector((store) => store.job)
    useEffect(() => {
        return () => {
            dispatch(setBrowseCompanySearch(""))
        }
    }, [])
    return (
        <div >
            <Navbar></Navbar>
            <div className="max-w-6xl mx-auto my-4 p-5">
            <h1 className="text-xl font-bold mb-5">Search Result ({job.length})</h1>
            <div className="grid md:grid-cols-2 gap-5 grid-cols-1 ">
            {
                job.map((item, idx) => <JobCard key={idx} job={item}/>)
            }
            </div>
            </div>
            
        </div>
    )
}

export default Browse