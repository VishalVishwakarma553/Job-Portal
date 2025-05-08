import { createSlice } from "@reduxjs/toolkit";
const applicantSlice = createSlice({
    name: "applicant",
    initialState:{
        applicant: []
    },
    reducers:{
        setApplicant: (state, action) => {
            state.applicant = action.payload
        }
    }
})
export const {setApplicant} = applicantSlice.actions
export default applicantSlice.reducer