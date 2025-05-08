import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import ApplicantTable from './ApplicantTable'
import axiosInstance from '../../assets/lib/axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicant } from '../../redux/applicantSlice'

const JobApplicant = () => {
  const dispatch = useDispatch()
  const {applicant} = useSelector((store) => store.applicant)
  const params = useParams()
  const JobId = params.id
  useEffect(() => {
    const fetachAllApplicant = async() => {
      try{
        const res = await axiosInstance.get(`/application/getApplicantOfJob/${JobId}`)
        if(res.data.job){
          dispatch(setApplicant(res.data.job.applications))
        }
      }catch(error){
        console.log("Error in getting applicant", error.response.data)
      }
    }
    fetachAllApplicant()
  }, [])
  return (
    <div>
        <Navbar></Navbar>
        <div className='max-w-6xl mx-auto'>
            <h1 className='text-xl font-bold my-5'>Total Applicant({applicant.length})</h1>
            <ApplicantTable />
        </div>
    </div>
  )
}

export default JobApplicant
