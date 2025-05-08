import React from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../assets/lib/axios";

const ApplicantTable = () => {
  const { applicant } = useSelector((store) => store.applicant);
  const status = ["Accepted", "Rejected"];
  const statusHandler = async (currentStatus, applicantId) => {
    try{
      const res = await axiosInstance.post(`/application/updateStatus/${applicantId}`, {status:currentStatus.toLowerCase()})
      console.log(res.data.newApplication)
    }catch(error){
      console.log(error)
    }
  };
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Resume</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applicant.length > 0 &&
              applicant.map((applicants) => (
                <tr key={applicants._id}>
                  <td>{applicants?.applicant?.fullName}</td>
                  <td>{applicants?.applicant?.email}</td>
                  <td>{applicants?.applicant?.phoneNumber}</td>
                  <td>
                    {applicants?.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-500"
                        href={applicants.applicant.profile.resume}
                      >
                        {applicants.applicant.profile.resumeOriginalName}
                      </a>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>{applicants?.createdAt.split("T")[0]}</td>
                  <td className="flex gap-1  ">
                  {status.map((status) => (
                      <div
                        
                        className="badge badge-success "
                        onClick={() => statusHandler(status, applicants?._id)}
                      >
                        <svg
                          className="size-[1em]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="currentColor"
                            strokeLinejoin="miter"
                            strokeLinecap="butt"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="square"
                              stroke-miterlimit="10"
                              strokeWidth="2"
                            ></circle>
                            <polyline
                              points="7 13 10 16 17 8"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="square"
                              stroke-miterlimit="10"
                              strokeWidth="2"
                            ></polyline>
                          </g>
                        </svg>
                        {status}
                      </div>
                  ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantTable;
