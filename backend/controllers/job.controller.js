import Job from "../models/job.model.js";

//The person who signed in as recruiter will create and post the job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      experience,
      location,
      jobType,
      position,
      Salary,
      companyId,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !experience ||
      !location ||
      !jobType ||
      !position ||
      !Salary ||
      !companyId
    ) {
      //This type checking will be false when experience will provided as 0
      return res.status(400).json({
        message: "All fields are required for job creation",
      });
    }
    const job = new Job({
      title,
      description,
      requirements: requirements.split(","),
      experience,
      location,
      jobType,
      position,
      company: companyId,
      createdBy: req.id, //the id comes from middleware
      Salary,
    });
    await job.save();
    return res.status(200).json({
      message: "New job created",
      job,
    });
  } catch (error) {
    console.log("Error in createjob controller", error);
  }
};

// to show all jobs for the students
export const getAllJobs = async (req, res) => {
  try {
    const jobKeyword = req.query.keyword || ""; //? ke baad ka content keyword hota hai url me
    const query = {
      $or: [
        { title: { $regex: jobKeyword, $options: "i" } }, //keyword ya to job ke title se ya to job ke description se match kar rha ho whi job do database se
        { description: { $regex: jobKeyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 }); 
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    return res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.log("Error in getting all jobs", error);
  }
};

export const getJobId = async (req, res) => {
  try {
    const jobbId = req.params.id;
    const job = await Job.findById(jobbId).populate({path:"applications"}); 
    if (!job) {
      return res.status(404).json({
        message: "Job does not exist with this id",
      });
    }
    return res.status(200).json({
      job,
    });
  } catch (error) {
    console.log("Error in getting job by id controller", error);
  }
};

//to check recruiter how much jobs has created
export const getRecruiterJob = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobByRecruiter = await Job.find({ createdBy: recruiterId }).populate({path:'company'}); //populate missing
    if (!jobByRecruiter) {
      return res.status(404).json({
        message: "Recruiter does not created any job yet",
      });
    }
    return res.status(200).json({ jobByRecruiter });
  } catch (error) {
    console.log(
      "Error in getting job created by recruiter in job controller",
      error
    );
  }
};
