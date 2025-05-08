import express from "express"
import { applyJob, getApplicantOfJob, getAppliedJobOfUser, updateStatus } from "../controllers/application.controller.js"
import protectedRoute from "../middleware/protectedRoute.js"
const router = express.Router()

router.get("/applyJob/:id",protectedRoute, applyJob)
router.get("/getAppliedJobOfUser",protectedRoute, getAppliedJobOfUser)
router.get("/getApplicantOfJob/:id",protectedRoute, getApplicantOfJob)
router.post("/updateStatus/:id",protectedRoute, updateStatus)

export default router