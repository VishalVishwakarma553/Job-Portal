import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../assets/lib/axios";
import { Loader } from "lucide-react";
import Navbar from "../Components/Navbar";
import { motion } from "motion/react"
const Signup = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [Input, SetInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [Toast, setToast] = useState({ show: false, message: "", type: "" });
  const InputHandler = (e) => {
    SetInput({ ...Input, [e.target.name]: e.target.value }); //To dynamically change the input instead of making usestate for everyOne
  };
  const fileHandler = (e) => {
    SetInput({ ...Input, file: e.target.files?.[0] });
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", Input.fullName);
    formData.append("email", Input.email);
    formData.append("phoneNumber", Input.phoneNumber);
    formData.append("password", Input.password);
    formData.append("role", Input.role);
    formData.append("file", Input.file);
    try {
      setLoading(true);
      const res = await axiosInstance.post("/user/signup", formData);
      if (res.data?.message){
        navigate("/login")
      }
      setToast({ show: true, message: res.data.message, type: "success" });
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    } catch (error) {
      console.log("error in signup frontend", error);
      setToast({
        show: true,
        message: error.response?.data?.message,
        type: "error",
      });
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center sm:max-w-7xl sm:mx-auto p-5 w-full">
      {Toast.show && (
        <div className="toast toast-end">
          <div
            className={`alert ${
              Toast.type === "success" ? "alert-success" : "alert-info"
            }`}
          >
            <span>{Toast.message}</span>
          </div>
        </div>
      )}
      <motion.form
      initial={{opacity:0, x:100}}
      animate={{opacity:1, x:0}}
        onSubmit={SubmitHandler}
        className="sm:w-1/2 w-full p-4 border border-base-200 bg-base-200   "
      >
        <h1 className="text-xl font-bold mb-5">Signup</h1>
        <div className="space-y-2">
          <label className="input validator w-full">
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="input"
              required
              placeholder="Fullname"
              value={Input.fullName}
              name="fullName"
              onChange={InputHandler}
            />
          </label>
          <label className="input validator w-full ">
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
              placeholder="Email@site.com"
              value={Input.email}
              name="email"
              onChange={InputHandler}
              required
            />
          </label>
          <label className="input validator w-full ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <g fill="none">
                <path
                  d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
            <input
              type="tel"
              className="tabular-nums"
              required
              placeholder="Phone"
              value={Input.phoneNumber}
              name="phoneNumber"
              onChange={InputHandler}
            />
          </label>
          <label className="input validator w-full">
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
              value={Input.password}
              name="password"
              onChange={InputHandler}
            />
          </label>

          <fieldset className="fieldset flex">
            <input type="file" className="file-input" onChange={fileHandler} />
            <label className="label">Profile </label>
          </fieldset>
        </div>

        <div className="flex gap-2 text-md text-zinc-300 items-center my-3">
          <input
            type="radio"
            name="role"
            value="student"
            checked={Input.role === "student"}
            onChange={InputHandler}
            className="radio radio-sm"
            id="student"
          />
          <label htmlFor="student">Student</label>
          <input
            type="radio"
            name="role"
            value="recruiter"
            checked={Input.role === "recruiter"}
            onChange={InputHandler}
            id="recruiter"
            className="radio radio-sm"
          />
          <label htmlFor="recruiter">Recruiter</label>
        </div>
        {loading ? (
          <button className="btn btn-soft btn-success w-full">
            {" "}
            <Loader className="w-6 h-6 mr-4 animate-spin" /> Plase wait
          </button>
        ) : (
          <button className="btn btn-soft btn-success w-full" type="submit">
            Signup
          </button>
        )}

        <span className="text-sm text-zinc-300 mt-1">
          Already have an Account{" "}
          <Link to="/login" className="text-blue-300 underline">
            Login
          </Link>
        </span>
      </motion.form>
    </div>
    </>
  );
};
export default Signup;
