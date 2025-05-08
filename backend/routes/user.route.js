import express from "express"
import { login, logout, signup, updateProfile } from "../controllers/user.controller.js"
import protectedRoute from "../middleware/protectedRoute.js"
import { fileUploadMiddleware } from "../middleware/multer.middleware.js"

const router = express.Router()

router.post("/signup",fileUploadMiddleware, signup)
router.post("/login", login)
router.get("/logout", logout)
router.post("/profile/update", protectedRoute,fileUploadMiddleware, updateProfile)

export default router