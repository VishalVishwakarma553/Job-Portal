import { Pencil } from "lucide-react";
import useGetAllCompany from "../../CustomHook/useGetAllCompany";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { motion } from "motion/react"
const CompanyTable = () => {
  const navigate = useNavigate()
  useGetAllCompany()
  const {userCompany, searchCompanyText} = useSelector((store) => store.company)
  const [filterCompany , setFilterCompany] = useState(userCompany)
  useEffect(() => {
    const filteredCompany = userCompany?.filter((company) => {
      if(!searchCompanyText){
        return true
      }
      return company?.name?.toLowerCase().includes(searchCompanyText.toLowerCase())
    })
    setFilterCompany(filteredCompany)
  },[userCompany, searchCompanyText])
  return (
    <motion.div 
    initial = {{opacity:0, y:100}}
    animate={{opacity:1, y:0}}
    className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-w-6xl mx-auto ">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            filterCompany?.map((company) => (
              <tr key={company._id}>
            <th>
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src={company.logo}
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>
            </th>
            <td>{company.name}</td>
            <td>{company.createdAt.split("T")?.[0]}</td>
            <td>
              <button onClick={() => navigate(`/companySetup/${company._id}`)} className="flex gap-1 items-center cursor-pointer">
                  <Pencil className="w-4"/>
                  Edit
              </button>
            </td>
          </tr>
            ))
          }
        </tbody>
      </table>
    </motion.div>
  );
};

export default CompanyTable;
