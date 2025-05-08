import { useSelector } from "react-redux"
import Footer from "../Components/Footer"
import HeroSection from "../Components/HeroSection"
import LatestJobs from "../Components/LatestJobs"
import Navbar from "../Components/Navbar"
import useGetAllJobs from "../CustomHook/useGetAllJobs"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
    useGetAllJobs()
    const {user} = useSelector((store) => store.auth)
    const navigate = useNavigate()
    useEffect(()=>{
        if (user && user.role === "recruiter"){
            navigate("/recruiter/companies")
        }
    },[])
    return (
        <>
        <Navbar />
        <HeroSection />
         {/* <RoleCategory /> */}
         <LatestJobs  />
        <Footer />
        </>

    )
}
export default Homepage