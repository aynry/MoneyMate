import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseApp from "../../extra/firebaseApp";
import { getFirestore } from "firebase/firestore";

export const getPrimaries=createAsyncThunk("tr/getPrimaries", async ()=>{
    console.log("create async used");
    const db=getFirestore(firebaseApp);
    let tempTransaction={};
    let querySnapshot1 = await getDocs(collection(db, "transaction"), where("userEmail", "==", userEmail));
    let querySnapshot2 = await getDocs(collection(db, "category"), where("userEmail", "==", userEmail));
    let querySnapshot3 = await getDocs(collection(db, "budget"), where("userEmail", "==", userEmail));
    return {transaction:querySnapshot1,category:querySnapshot2, budget:querySnapshot3};
});

export const transactionSlice=createSlice({
    name:'tr',
    initialState: {
        transactions:{},
        category:[],
        budget:{},
        primary:{}
    },
    reducers:{
        addTransaction: (state,action)=>{
            console.log(action.payload);
            Object.assign(state.transactions,action.payload);
            console.log(state.transactions);
        }, addCategory: (state,action)=>{
            console.log(action);
            state.category={...action.payload};
            console.log(state);
        }, deleteTransactionRedux: (state, action)=>{
            console.log(action.payload);
            let object=state.transactions;
            delete object[action.payload];
            state.transactions={...object};
            console.log(state.transactions);
        },addBudget: (state,action)=>{
            console.log(action.payload);
            state.budget={...state.budget, ...action.payload}
            console.log(state.budget);
        }
    },extraReducers: (builder) => {
        builder
          .addCase(getPrimaries.pending, (state, action) => {
            console.log("loading is called");
          state.isLoading = true;
          state.hasError = false;
        })
          .addCase(getPrimaries.fulfilled, (state, action) => {
            state.primary = action.payload;
            state.isLoading = false;
            state.hasError = false
          })
          .addCase(getPrimaries.rejected, (state, action) => {
            state.hasError = true
            state.isLoading = false;
          })
    },
})
export const {addTransaction, addCategory, deleteTransactionRedux, addBudget}=transactionSlice.actions;
export default transactionSlice.reducer;