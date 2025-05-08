import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: "job",
    initialState:{
        job: [],
        singleJob: null,
        recruiterJob: [],
        searchJobText:"",
        InputFilterJob: ""
    },
    reducers:{
        setJob:(state, action) => {
            state.job = action.payload
        },
        setSingleJob:(state, action) => {
            state.singleJob = action.payload
        },
        setRecruiterJob: (state, action) => {
            state.recruiterJob = action.payload
        },
        setSearchJobText: (state, action) => {
            state.searchJobText = action.payload
        },
        setInputFilterJob: (state, action) => {
            state.InputFilterJob = action.payload
        }
    }
})
export const {setJob, setSingleJob, setRecruiterJob, setSearchJobText, setInputFilterJob} = jobSlice.actions
export default jobSlice.reducer