import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "https://job-portal-wgjm.onrender.com/api/v1", //http://localhost:8000/
    withCredentials: true
})
export default axiosInstance