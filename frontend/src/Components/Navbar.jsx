import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlignRight, LogOut, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import axiosInstance from "../assets/lib/axios";
const Navbar = () => {
  const [Toast, setToast] = useState({ show: false, message: "", type: "" });
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.get("/user/logout");
      navigate("/");
      dispatch(setUser(null));
      setToast({ show: true, message: res.data.message, type: "success" });
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
      console.log("error in logout frontend", error);
    }
  };
  return (
    <>
      <div className=" border-b-2 border-base-300 backdrop-blur-lg bg-base-100/80 mb-3">
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
        <div className="mx-auto flex justify-between items-center max-w-6xl h-16">
          <Link to="/">
            <h3 className="text-2xl font-bold text-[#DC143C] mx-2">
              Get Hired{" "}
            </h3>
          </Link>
          <div className="flex gap-3 text-lg">
            <ul className="sm:flex items-center gap-2 hidden">
              {user && user.role === "recruiter" ? (
                <>
                  <Link to="/recruiter/companies">
                    <li>Companies</li>
                  </Link>
                  <Link to="/recruiterJobs">
                    <li>Jobs</li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">
                    <li>Home</li>
                  </Link>
                  <Link to="/jobs">
                    <li>Jobs</li>
                  </Link>
                  <Link to="/browse">
                    <li>Browse</li>
                  </Link>
                </>
              )}
            </ul>
            <div className="flex items-center">
            {!user ? (
              <div className="sm:flex gap-2 hidden">
                <Link to="/signup">
                  <button className="btn btn-soft btn-error">Signup</button>
                </Link>
                <Link to="/login">
                  <button className="btn btn-soft btn-error">Login</button>
                </Link>
              </div>
            ) : (
              // After user logged in
              <div className="dropdown sm:dropdown-end dropdown-center">
                <div
                  tabIndex={0}
                  role="button"
                  className=" m-1 rounded-full"
                >
                  <div className="avatar cursor-pointer">
                    <div className=" w-12 rounded-full">
                      {
                        user?.profile?.profilePhoto ? <img src={user?.profile?.profilePhoto} /> :
                        <img src="./avatar.png" />
                      }
                      
                    </div>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content menu bg-base-200 z-50 rounded-box  w-62 p-2 shadow-sm"
                >
                  <div className="mx-auto">
                    <div className="avatar ">
                      <div className=" w-12 rounded-full ">
                      {
                        user?.profile?.profilePhoto ? <img src={user?.profile?.profilePhoto} /> :
                        <img src="./avatar.png" className="" />
                      }
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full">
                      <h4 className="text-lg font-medium text-center">
                        {user.fullName}
                      </h4>
                      <p className="text-muted-forground text-center text-zinc-300  mx-0">
                        {user?.profile?.bio}
                      </p>
                    </div>
                    <Link to="/profile">
                      <div className="flex items-center gap-2">
                        {user && user.role === "student" && (
                          <button class="btn btn-soft w-full">
                            <Users />
                            View Profile
                          </button>
                        )}
                      </div>
                    </Link>
                    <div className="flex items-center gap-2 my-2 ">
                      <button
                        className="btn btn-soft  w-full"
                        onClick={logoutHandler}
                      >
                        {" "}
                        <LogOut />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="dropdown dropdown-bottom dropdown-end sm:hidden">
              <div tabIndex={0} role="button" className="">
              <AlignRight className="w-6 h-6 active:w-5 active:h-5 mx-3" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 border border-gray-500 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {user && user.role === "recruiter" ? (
                <>
                  <Link to="/recruiter/companies">
                    <li>Companies</li>
                  </Link>
                  <Link to="/recruiterJobs">
                    <li>Jobs</li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">
                    <li>Home</li>
                  </Link>
                  <Link to="/jobs">
                    <li>Jobs</li>
                  </Link>
                  <Link to="/browse">
                    <li>Browse</li>
                  </Link>
                </>
              )}
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
