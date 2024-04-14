import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFirestore, getDocs, collection, where } from 'firebase/firestore'
import firebaseApp from '../../extra/firebaseApp'

const initialState = {
    posts: [],
    transaction:{},
    category:{},
    budget:{},
    status: "idle",
    error: ""
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (userEmail) => {
    try {
        const db=getFirestore(firebaseApp);
        let querySnapshot1 = await getDocs(collection(db, "transaction"), where("userEmail", "==", userEmail));
        let querySnapshot2 = await getDocs(collection(db, "category"), where("userEmail", "==", userEmail));
        let querySnapshot3 = await getDocs(collection(db, "budget"), where("userEmail", "==", userEmail));
        let tempCategory1={};
        querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let tempData1=doc.data();
        tempCategory1[doc.id]={...tempData1};
        });
        let tempCategory2={};
        querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let tempData2=doc.data();
        tempCategory2[doc.id]={...tempData2};
        });
        let tempCategory3={};
        querySnapshot3.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let tempData3=doc.data();
        tempCategory3[doc.id]={...tempData3};
        });
        console.log("this is running", tempCategory1);
        return {tempCategory1, tempCategory2, tempCategory3, userEmail};
    } catch (error) {
        console.log(error);
    }
    
})


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addTransaction: (state,action)=>{
        console.log(action.payload);
        state.transaction[Object.keys(action.payload)[0]]=Object.values(action.payload)[0];
    },
    getTransaction: (state,action)=>{
        console.log(action);
        return state.transaction;
    },
    addBudget:(state,action)=>{
        console.log(action.payload, state.budget);
        state.budget[Object.keys(action.payload)[0]]=Object.values(action.payload)[0];
        //Object.assign(state.budget, action.payload);
        console.log(state.budget);
    },
    deleteTransaction:(state,action)=>{
        console.log(action.payload, state.transaction);
        delete state.transaction[action.payload];
    },
    deleteBudget:(state,action)=>{
        console.log(action.payload, state.budget);
        delete state.budget[action.payload];
    }
},
  extraReducers(builder) {
    builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.posts = state.posts.concat(action.payload);
            const tempCategory1 = action.payload["tempCategory1"] || {};
            const tempCategory2 = action.payload["tempCategory2"] || {};
            const tempCategory3 = action.payload["tempCategory3"] || {};
            console.log(tempCategory1,tempCategory2,tempCategory3);
            let temp1={},temp2={},temp3={};
            for(let key in tempCategory1){
                if(tempCategory1[key]["userEmail"]==action.payload["userEmail"]){
                    const tempDate=tempCategory1[key]["date"];
                    temp1[key]={...tempCategory1[key],"date":new Date(tempDate)};
                }
            }
            state.transaction={...temp1};
            for(let key in tempCategory2){
                if(tempCategory2[key]["userEmail"]==action.payload["userEmail"]){
                    const tempDate=tempCategory2[key]["date"];
                    temp2[key]={...tempCategory2[key],"date":new Date(tempDate)};
                }
            }
            state.category={...temp2};
            for(let key in tempCategory3){
            const start=tempCategory3[key]["start"];
            const end=tempCategory3[key]["end"];
            temp3[key]={...tempCategory3[key],"start":new Date(start),"end":new Date(end)};
            }
            state.budget={...temp3};
            console.log(temp1,temp2,temp3);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})
export const {addTransaction, addBudget, deleteTransaction, deleteBudget, getTransaction}=postsSlice.actions;
export default postsSlice.reducer;