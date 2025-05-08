import mongoose from "mongoose"
const connectdb = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected")
    }catch(error){
        console.log("error in mongodb", error)
    }
    
}
export default connectdb