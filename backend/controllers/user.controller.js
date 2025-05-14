import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../lib/cloudinary.js";
export const signup =  async (req, res) => {
    try{
        const {fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role){
            return res.status(400).json({message: "All fields are required"})
        }
        const file = req.file
        const fileDataUri = getDataUri(file)
        const cloudinaryResponse = await cloudinary.uploader.upload(fileDataUri.content)
        //cloudinary

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile :{
                profilePhoto: cloudinaryResponse.secure_url
            }
        })
        await newUser.save()
        return res.status(201).json({
            message: "user created successfully",
            newUser
        })
    }catch(error){
        console.log("error in signing up", error)
    }
}

export const login = async (req, res) => {
    try{
        const {email, password, role} = req.body
        if(!email || !password|| !role) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({
                message: "email or password is invalid"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch){
            return res.status(400).json({
                message: "Password or email is incorrect"
            })
        }
        if (role !== user.role){
            return res.status(400).json({
                message: "Account does not exist with this role"
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "2d"})
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: "none", secure:true}).json({ //for local development change sameSite "lax" and secure false
            message: "Logged in successfully",
            user
        })
    }catch(error) {
        console.log("error in login", error)
    }
}

export const logout = (req, res) => {
    //clear the cookie and set max age to zero
    try{
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out successfully",

        })
    }catch(error){
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try{
        const {fullName, email, phoneNumber, bio, skills} = req.body
        const file = req.file
        //clodinary setup here
        let cloudinaryResponse = "";
        if(file){
            const fileDataUri = getDataUri(file)
            cloudinaryResponse = await cloudinary.uploader.upload(fileDataUri?.content)
        }
        let skillArray;
        if (skills) {
            skillArray = skills.split(",")
        }
        const userId = req.id
        
        const user = await User.findByIdAndUpdate(userId,{
            fullName,
            email,
            phoneNumber,
            profile:{
                bio,
                skills: skillArray,
                resume: cloudinaryResponse?.secure_url,
                resumeOriginalName: file?.originalname
            }
        },
        {new: true})
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "User updated successfully",
            user
        })
        }catch(error) {
        console.log("error in update profile",error)
    }
}
