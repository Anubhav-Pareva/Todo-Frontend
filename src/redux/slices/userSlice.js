import { createSlice } from "@reduxjs/toolkit";
const initialState = {  
                        isLogin:false, 
                        userEmail:null, 
                        userName:null, 
                        userGender:null, 
                        userId:null
                    };
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        userLoggedin:(state, action)=>{
                state.isLogin = true;
                state.userEmail = action.payload.email;
                state.userName = action.payload.name;
                state.userGender = action.payload.gender;
                state.userId = action.payload._id;
        },
        userLoggedout:(state, action)=>{
            state.isLogin = false;
            state.userEmail = null;
            state.userName = null;
            state.userGender = null;
            state.userId = null;
        }
    }
});
export const {userLoggedin, userLoggedout} = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector =(state)=>state.user;