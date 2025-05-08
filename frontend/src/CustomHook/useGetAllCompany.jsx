import { useEffect } from "react"
import axiosInstance from "../assets/lib/axios"
import { useDispatch } from "react-redux"
import { setUserCompany } from "../redux/CompanySlice"

const useGetAllCompany = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompany = async() => {
            try{
                const res = await axiosInstance("/company/userCreatedCompany")
                if (res.data.companies){
                    dispatch(setUserCompany(res.data.companies))
                }
            }catch(error){
                console.log("Error in custom hook of getting all comapny", error)
            }
        }
        fetchCompany()
    }, [])
}
export default useGetAllCompany
