import { useEffect } from "react"
import axiosInstance from "../assets/lib/axios"
import { useDispatch, useSelector } from "react-redux"
import { setJob } from "../redux/JobSlice"

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const {BrowseCompanySearch} = useSelector((store)=> store.company)
    useEffect( () => {
        const allJob = async() => {
            try{
                const res = await axiosInstance.get(`/job/getAllJob?keyword=${BrowseCompanySearch}`)
                if (res.data.jobs){
                    dispatch(setJob(res.data.jobs))
                }
            }catch(error){
                console.log("Error in getting all jobs hook", error)
            }
        }
        allJob()
    }, [BrowseCompanySearch])
}

export default useGetAllJobs