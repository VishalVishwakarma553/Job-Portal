import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Homepage from "./Pages/HomePage"
import Jobs from "./Components/jobs"
import Browse from "./Components/Browse"
import ViewProfile from "./Pages/ViewProfile"
import JobDescription from "./Components/JobDescription"
import Company from "./Components/Recruiter/Company"
import NewCompany from "./Components/Recruiter/NewCompany"
import CompanySetup from "./Components/Recruiter/CompanySetup"
import RecruiterCreatedJobs from "./Components/Recruiter/RecruiterCreatedJobs"
import NewJob from "./Components/Recruiter/NewJob"
import JobApplicant from "./Components/Recruiter/JobApplicant"
function App() {

  return (
    <>
    {/* <Navbar /> */}
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup"  element = {<Signup />}/> 
      <Route path="/jobs"  element = {<Jobs/>}/> 
      <Route path="/browse"  element = {<Browse/>}/> 
      <Route path="/profile"  element = {<ViewProfile />}/> 
      <Route path="/description/:id"  element = {<JobDescription />}/> 
      <Route path="/recruiter/companies"  element = {<Company />}/> 
      <Route path="/newCompany"  element = {<NewCompany />}/> 
      <Route path="/companySetup/:id"  element = {<CompanySetup />}/> 
      <Route path="/recruiterJobs"  element = {<RecruiterCreatedJobs />}/> 
      <Route path="/newJob"  element = {<NewJob />}/> 
      <Route path="/job/applicant/:id"  element = {<JobApplicant />}/> 
    </Routes>
    </>
  )
}

export default App
