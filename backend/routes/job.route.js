import express from "express"
import { createJob, getAllJobs, getJobId, getRecruiterJob } from "../controllers/job.controller.js"
import protectedRoute from "../middleware/protectedRoute.js"
const router = express.Router()
router.post("/createJob",protectedRoute, createJob)
router.get("/getAllJob",protectedRoute, getAllJobs)
router.get("/getJobId/:id",protectedRoute, getJobId)
router.get("/getRecruiterJob", protectedRoute, getRecruiterJob)

export default router