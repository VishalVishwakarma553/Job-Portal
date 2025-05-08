import { useDispatch } from "react-redux"
import axiosInstance from "../assets/lib/axios"
import { setSingleCompany } from "../redux/CompanySlice"
import { useEffect } from "react"

const useGetCompanybyId = (companyId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await axiosInstance.get(`/company/getCompanyById/${companyId}`)
                if (res?.data?.company){
                    dispatch(setSingleCompany(res?.data?.company))
                }
            }catch(error){
                console.log(error)
            }
        }
        fetch()
    }, [])
}
export default useGetCompanybyId