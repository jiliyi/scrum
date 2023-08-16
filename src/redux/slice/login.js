import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login : false
}
const loginSlice =  createSlice({
    name : 'login',
    initialState,
    reducers : {
        set_login : (state,action)=>{
            state.login =action
        }
    }
})

export const login_selector = (state)=>{
    return state.login.login;
}

export const {set_login} = loginSlice.actions;

export default loginSlice.reducer;