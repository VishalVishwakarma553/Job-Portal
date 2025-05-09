import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "https://job-portal-seven-dun.vercel.app/api/v1",
    withCredentials: true
})
export default axiosInstance