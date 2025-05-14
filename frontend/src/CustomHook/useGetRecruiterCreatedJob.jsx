import { useDispatch } from "react-redux"
import { setRecruiterJob } from "../redux/JobSlice"
import { useEffect } from "react"
import axiosInstance from "../assets/lib/axios"

const useGetRecruiterCreatedJob = () => {
    const dispatch = useDispatch()
    useEffect( () => {
        const allRecruiterCreatedJob = async() => {
            try{
                const res = await axiosInstance.get("/job/getRecruiterJob")
                if (res.data.jobByRecruiter){
                    dispatch(setRecruiterJob(res?.data?.jobByRecruiter))
                }
            }catch(error){
                console.log("Error in getting all jobs hook", error)
            }
        }
        allRecruiterCreatedJob()
    }, [])
}
export default useGetRecruiterCreatedJob