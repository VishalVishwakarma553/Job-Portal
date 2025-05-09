import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectdb from "./utils/db.js"
import userRoutes from "./routes/user.route.js"
import jobRoutes from "./routes/job.route.js"
import companyRoutes from "./routes/company.route.js"
import applicationRoutes from "./routes/application.route.js"
dotenv.config()
const app = express()
const corsoption = {
    origin: "https://job-portal-apvf.vercel.app",
    credentials: true
}
app.use(cors(corsoption))
app.use(express.json())
app.use(cookieParser())


//api's
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/job", jobRoutes)
app.use("/api/v1/company", companyRoutes)
app.use("/api/v1/application",applicationRoutes)

app.get("/", (req, res) => {
    res.send({
        message: "Backend is running"
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    connectdb()
    console.log(`server started on port ${PORT}`)
})
