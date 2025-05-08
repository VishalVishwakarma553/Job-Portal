import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setInputFilterJob } from "../redux/JobSlice"
import { CircleX } from "lucide-react"

const FilterCard = ({setFilterBanner}) => {
    const filterData = [
        {
            filterType: "Location",
            array: ["Mumbai", "Pune", "Hyderabad", "Bangalore", "Gurgaon"]
        },
        {
            filterType: "Salary",
            array: ["0-20k", "20-40k", "40- 1Lakh","1 Lakh to 2 Lakh"]
        },
        {
            filterType: "Job Position",
            array: ["Full stack developer", "Machine Learning Engineer", "Data Scientist", "App developer"]
        }
    ]
    const dispatch = useDispatch((store) => store.job)
    const [filterValue, setFilterValue] = useState("")
    const changeHandler = (value) => {
        setFilterValue(value)
    }
    useEffect(() => {
        dispatch(setInputFilterJob(filterValue))
    }, [filterValue])
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
            <h1 className="font-bold text-lg mb-3">Filter Job</h1>
            <CircleX className="md:hidden flex" onClick={() => setFilterBanner(false)}/>
            </div>
            {filterData.map((filterItem, index) => (
                <>
                <h1 key={index} className="text-lg font-bold my-2">{filterItem.filterType}</h1>
                <div className="flex flex-col gap-0.5">
                     {filterItem.array.map((filterArrayItem, idx) => (
                        (<div className="flex gap-2 items-center text-zinc-100" key={idx}><input type="radio" name="radio-1" className="radio radio-sm" onChange={()  => changeHandler(filterArrayItem)} />{filterArrayItem}</div>)
                    ))}
                </div>
                   
                </>
            ))}
        </div>
    )
}

export default FilterCard