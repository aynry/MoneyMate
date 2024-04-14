import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:'user',
    initialState: {
        displayName:"None so far",
        email:"",   
        photoURL:"",
        loggedIn:false,
        creds:{}
    },
    reducers:{
        login: (state,action)=>{
            console.log(action);
            state.displayName=action.payload.displayName;
            state.email=action.payload.email;
            state.photoURL=action.payload.photoURL;
            state.loggedIn=!state.loggedIn;
            console.log(state);
        },
        changeStatus:(state)=>{
            state.loggedIn=!state.loggedIn
        },
        adduserCredentials:(state, action)=>{
            console.log(action);
            state.creds=action.payload;
        },
    },
})

export const {login, changeStatus, adduserCredentials}=userSlice.actions;
export default userSlice.reducer;