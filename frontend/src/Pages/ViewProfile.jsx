import { Contact, Edit, Loader, Mail, Pen, SquarePen } from "lucide-react";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../assets/lib/axios";
import {setUser } from "../redux/authSlice";

const ViewProfile = () => {
  const { user} = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const skills = user?.profile?.skills
  const [Toast, setToast] = useState({ show: false, message: "", type: "" });
  const [updateInput, setUpdateInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || "",
    file: "",
  });
  const [appliedJob, setAppliedJob] = useState([])
  const InputHandler = (e) => {
    setUpdateInput({ ...updateInput, [e.target.name]: e.target.value });
  };
  const FileHandler = (e) => {
    setUpdateInput({ ...updateInput, file: e.target.files?.[0] });
  };
  const dialogSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", updateInput.fullName);
    formData.append("email", updateInput.email);
    formData.append("phoneNumber", updateInput.phoneNumber);
    formData.append("bio", updateInput.bio);
    formData.append("skills", updateInput.skills);
    formData.append("file", updateInput.file);
    try {
      setLoading(true)
      const res = await axiosInstance.post("/user/profile/update", formData);
      if (res.data?.user) {
        dispatch(setUser(res.data.user));
        setToast({ show: true, message: res.data?.message, type: "success" });
        setTimeout(()=>{
          setToast({ show: false, message: "", type: "" })
        }, 3000)
      }
    } catch (error) {
      console.log("error in updateProfile frontend", error);
      setToast({ show: false, message: error.res?.data?.message });
      setTimeout(()=>{
        setToast({ show: false, message: "", type: "" })
      }, 3000)
    }finally{
      setLoading(false)
    }
  };
  //Api call for fetching applied jobs of user
  useEffect(() => {
    const fetchAppliedJobs = async() => {
      try{
        const res = await axiosInstance.get("/application/getAppliedJobOfUser")
        if(res.data.application){
          setAppliedJob(res.data.application)
        }
      }catch(error){
        console.log("Error in fetching all applied job",error)
      }
    }
    fetchAppliedJobs()
  }, [])
  return (
    <div>
      <Navbar></Navbar>
      <div className="p-2">
      <div className="max-w-6xl p-5 mx-auto bg-zinc-600 shadow-lg shadow-base-300 rounded-2xl">
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
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img src={user?.profile?.profilePhoto || "/avatar.png "} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-200">{user.fullName}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn h-8 w-5"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <Edit className="w-6 h-6 text-gray-200" />
            
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <form onSubmit={dialogSubmitHandler}>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">FullName</legend>
                  <input
                    type="text"
                    name="fullName"
                    value={updateInput.fullName}
                    onChange={InputHandler}
                    className="input w-full"
                    placeholder="full Name"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email</legend>
                  <input
                    type="email"
                    name="email"
                    value={updateInput.email}
                    onChange={InputHandler}
                    className="input w-full"
                    placeholder="email"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Phone Number</legend>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={updateInput.phoneNumber}
                    onChange={InputHandler}
                    className="input w-full"
                    placeholder="Phone Number"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Bio</legend>
                  <input
                    type="text"
                    name="bio"
                    value={updateInput.bio}
                    onChange={InputHandler}
                    className="input w-full"
                    placeholder="Bio"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    name="skills"
                    onChange={InputHandler}
                    value={updateInput.skills}
                    className="input w-full"
                    placeholder="Skills"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Resume</legend>
                  <input
                    type="file"
                    className="file-input"
                    onChange={FileHandler}
                  />
                </fieldset>
                {
                  loading ? <button className="btn  btn-accent w-full my-3" type="submit"> <Loader className="w-6 h-6 mr-4 animate-spin"/>
                  Updating Your Profile...
                </button>:<button className="btn  btn-accent w-full my-3" type="submit">
                  Update Profile
                </button>
                }
                
              </form>
            </div>
          </dialog>

          {/* <button className="btn btn-soft ">
            
          </button>  */}
        </div>
        <div>
          <div className="flex my-5 gap-2">
            <Mail className="text-blue-500"/>
            <span>{user.email}</span>
          </div>
          <div className="flex gap-2">
            <Contact className="text-blue-500"/>
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className="my-4">
          <h1 className="text-lg font-medium">Skills</h1>
          <div className="flex gap-2">
            {user?.profile?.skills.length === 0 ? (
              <span>No Skills</span>
            ) : (
              skills.map((skill, idx) => (
                <div className="badge badge-dash badge-success  " key={idx}>
                  {skill}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Resume:</h3>
          <a href={user?.profile?.resume} className="text-blue-400">{user?.profile?.resumeOriginalName}</a>
        </div>
      </div>

      <h1 className="bg-zinc-600 p-2 rounded-2xl max-w-6xl mx-auto my-2 text-lg font-medium ">
        Applied Jobs
      </h1>
      <div className="max-w-6xl  mx-auto overflow-x-auto rounded-box border border-base-content/5 bg-zinc-600">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Job Role</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJob.length > 0 ? appliedJob.map((item, idx) => {
              return (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{item.createdAt.split("T")[0]}</td>
                  <td>{item.job.title}</td>
                  <td>{item.job.company.name}</td>
                  <td>
                    <div className="badge badge-soft badge-success">
                      {item.status}
                    </div>
                  </td>
                </tr>
              );
            }): <span className="text-center text-xl font-bold">You have not applied for any job</span>}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};
export default ViewProfile;
