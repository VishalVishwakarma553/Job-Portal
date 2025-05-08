import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { ArrowLeft, Loader } from "lucide-react";
import axiosInstance from "../../assets/lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanybyId from "../../CustomHook/useGetCompanybyId";
import { motion } from "motion/react"

const CompanySetup = () => {
  const params = useParams()
  const companyId = params.id
  useGetCompanybyId(companyId)
  const navigate = useNavigate()
  const {singleComapny} = useSelector((store) => store.company)
  const [Inputfield, setInputfield] = useState({
    name: singleComapny?.name || "",
    description: singleComapny?.description || "",
    website: singleComapny?.website || "",
    location: singleComapny?.location || "",
    file: null,
  });

  //Update input field whenever singleCompany changes
  useEffect(() => {
    if(singleComapny){
      setInputfield({
        name: singleComapny?.name || "",
        description: singleComapny?.description || "",
        website: singleComapny?.website || "",
        location: singleComapny?.location || "",
        file: null,
      })
    }
  }, [singleComapny])
  const[loading, setLoading] = useState(false)
  
  const handleInputChange = (e) => {
    setInputfield({...Inputfield, [e.target.name]: e.target.value})
  }
  const fileInputHandler = (e) => {
    const file = e.target.files?.[0]
    setInputfield({...Inputfield, file})
  }
  const handleSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", Inputfield.name)
    formData.append("description", Inputfield.description)
    formData.append("website", Inputfield.website)
    formData.append("location", Inputfield.location)
    formData.append("file", Inputfield.file)
    try{
      setLoading(true)
      const res = await axiosInstance.post(`/company/updateComapny/${companyId}`, formData)
      if(res.data?.company) {
        navigate("/recruiter/companies")
      }
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <Navbar />
      <motion.div 
      initial={{opacity:0, y:60}}
      animate={{opacity:1, y:0}}
      transition={{duration:.2}}
      className="max-w-xl mx-auto my-10 p-5">
        <div className="flex justify-between items-center ">
          <button className="btn btn-outline" onClick={() => navigate("/newCompany")}>
            {" "}
            <ArrowLeft />
            Back
          </button>
          <h1 className="sm:text-xl font-bold text-lg">Update CompanyInfo</h1>
        </div>
        <form onSubmit={handleSubmitHandler}>
          <div className="grid sm:grid-cols-2 grid-cols-1 my-5 gap-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is your name?</legend>
              <input type="text" className="input w-full" name="name" onChange={handleInputChange} placeholder="Company name" value={Inputfield.name}/>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Company Description</legend>
              <input type="text" className="input w-full" name="description" placeholder="company description" value={Inputfield.description} onChange={handleInputChange} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Website</legend>
              <input type="text" className="input w-full" name="website" onChange={handleInputChange} placeholder="Wesite link" value={Inputfield.website}/>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Company location</legend>
              <input type="text" className="input w-full" name="location" onChange={handleInputChange} placeholder="company location" value={Inputfield.location}/>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Company logo</legend>
              <input type="file" onChange={fileInputHandler} className="file-input" />
            </fieldset>
          </div>
          {
            loading ? (<button className="btn btn-soft w-full" type="submit"> <Loader className="h-4 w-4 mr-2"  />  Update</button>):(

              <button className="btn btn-soft w-full" type="submit">Update</button>
            )
          }
        </form>
      </motion.div>
    </div>
  );
};

export default CompanySetup;
