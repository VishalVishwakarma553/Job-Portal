import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../assets/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import {setUser } from "../redux/authSlice";
import { Loader } from "lucide-react";
import Navbar from "../Components/Navbar";
import { motion } from "motion/react"
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector(store => store.auth)
  const [loading, setLoading] = useState(false)
  const [Input, SetInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [Toast, setToast] = useState({show: false, message: "", type: ""})
  const InputHandler = (e) => {
    SetInput({ ...Input, [e.target.name]: e.target.value }); //To dynamically change the input instead of making usestate for everyOne
  };
  const SubmitHandler = async(e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const res = await axiosInstance.post("/user/login", Input)
      console.log(res)
      dispatch(setUser(res.data.user))
      setToast({show: true, message: res.data.message, type: "success"})

      setTimeout(() => {
        setToast({show: false, message: "", type: ""})
      }, 3000)
      navigate("/")
      console.log(user)
    }catch(error){
      console.log(error)
      setToast({show: true, message: error.response?.data?.message, type: "error" })
      setTimeout(() => {
        setToast({show: false, message: "", type: ""})
      }, 3000)
    }finally{
      setLoading(false)
    }
  };
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center max-w-7xl mx-auto mt-2 p-5 sm:p-0">
      {
        Toast.show && (
        <div className="toast toast-end">
             <div className={`alert ${Toast.type === "success"? "alert-success": "alert-info"}`}>
                <span>{Toast.message}</span>
              </div>
            </div>)
      }
      <motion.form
        initial={{opacity:0, x:100}}
        animate={{opacity:1, x:0}}
        onSubmit={SubmitHandler}
        className="sm:w-1/2 w-full p-4 border border-base-200 bg-base-200"
      >
        <h1 className="text-xl font-bold mb-5">Login</h1>
        <div className="space-y-2">
          <label className="input  w-full ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              name="email"
              value={Input.email}
              onChange={InputHandler}
              placeholder="Email@site.com"
              required
            />
          </label>

          <label className="input  w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              value={Input.password}
              onChange={InputHandler}
            />
          </label>
        </div>

        <div className="flex gap-2 text-md text-zinc-300 items-center my-6">
          <input
            type="radio"
            name="role"
            checked={Input.role === "student"}
            value="student"
            onChange={InputHandler}
            className="radio radio-sm"
            id="student"
          />
          <label htmlFor="student">Student</label>
          <input
            type="radio"
            name="role"
            value="recruiter"
            onChange={InputHandler}
            checked={Input.role === "recruiter"}
            id="recruiter"
            className="radio radio-sm"
          />
          <label htmlFor="recruiter">Recruiter</label>
        </div>
        {
          loading ? <button className="btn btn-soft btn-success w-full"> <Loader className="h-6 w-6 mr-2 animate-spin" /> Please wait</button>:<button className="btn btn-soft btn-success w-full" type="submit">
          Login
        </button>
        }
        
        <span className="text-sm text-zinc-300 mt-1">
          Don't have an Account{" "}
          <Link to="/signup" className="text-blue-300 underline">
            Signup
          </Link>
        </span>
      </motion.form>
    </div>
    </>
  );
};
export default Login;
