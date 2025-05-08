import express from "express"
import { createCompany, getCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js"
import protectedRoute from "../middleware/protectedRoute.js"
import { fileUploadMiddleware } from "../middleware/multer.middleware.js"
const router = express.Router()

router.post("/createCompany",protectedRoute, createCompany)
router.get("/userCreatedCompany",protectedRoute, getCompany)
router.get("/getCompanyById/:id",protectedRoute, getCompanyById)
router.post("/updateComapny/:id",protectedRoute, fileUploadMiddleware, updateCompany)

export default router
