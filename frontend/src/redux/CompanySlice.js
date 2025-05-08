import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
    name:"company",
    initialState:{
        singleComapny: null,
        userCompany: null,
        searchCompanyText: "",
        BrowseCompanySearch: ""
    },
    reducers:{
        setSingleCompany: (state, action) => {
            state.singleComapny = action.payload
        },
        setUserCompany: (state, action) => {
            state.userCompany = action.payload
        },
        setSearchCompanyText: (state, action) => {
            state.searchCompanyText = action.payload
        },
        setBrowseCompanySearch: (state, action) => {
            state.BrowseCompanySearch = action.payload
        }
    }
})
export const {setSingleCompany, setUserCompany, setSearchCompanyText, setBrowseCompanySearch} = companySlice.actions
export default companySlice.reducer