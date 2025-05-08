import Application from "../models/application.model.js"
import Job from "../models/job.model.js"

export const applyJob = async(req, res) => {
    try{
        const userId = req.id
        const jobId = req.params.id
        if(!jobId){
            return res.status(400).json({message: "Provide the job for which want to apply"})
        }
        //checking whether user has already applied for the job
        const checkApplication = await Application.findOne({applicant: userId, job: jobId})
        if (checkApplication){
            return res.status(400).json({message: "User has already applied for the job"})
        }
        //checking whether job exist or not
        const checkjobExistence = await Job.findById(jobId)
        if(!checkjobExistence){
            return res.status(404).json({message: "Job not exist"})

        }
        // creating new application for that job
        const newApplication = new Application({
            applicant: userId,
            job:jobId
        })
        await newApplication.save()
        // Update application array of job model 
        checkjobExistence.applications.push(newApplication._id)
        await checkjobExistence.save()
        return res.status(200).json({message: "You have applied for the job successfully", newApplication, checkjobExistence})
    }catch(error){
        console.log("Error in applyJob controller", error)
    }
}

export const getAppliedJobOfUser = async (req, res) => {
    try{
        const userId = req.id
        const application = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path:'job',
            options:{sort:{createdAt: -1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
        })
        if (!application){
            return res.status(404).json({message: "You have not applied for any job"})
        }
        return res.status(200).json({
            application
        })
    }catch(error){
        console.log("Error in get applied job controller", error)
    }
}

//recruiter will see how much applicant has applied for the job

export const getApplicantOfJob = async(req, res) => {
    try{
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({path: 'applications',options: {sort:{createdAt:-1}}, populate: {path: "applicant"}})
        if(!job){
            return res.status(404).json({message: "Job doest not exist with this id"})
        }
        return res.status(200).json({job})

    }catch(error){
        console.log("Error in get applicant of job", error)
    }
}
//Recruiter will update the status for the job which has applied by applicant
export const updateStatus = async (req, res) => {
    try{
        const {status} = req.body
        const applicationId = req.params.id
        if (!status){
            return res.status(404).json({message: "status is required"})
        }
        const application = await Application.findById(applicationId)
        if (!application){
            return res.status(404).json({message: "wrong application"})
        }
        application.status = status
        const newApplication = await application.save()
        return res.status(200).json({message: "Status updated successfully", newApplication})
        
    }catch(error){
        console.log("Error in update status controller", error)
    }
}