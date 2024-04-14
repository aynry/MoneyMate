import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebaseApp from "../../extra/firebaseApp";
import { getFirestore, getDocs, collection, where } from "firebase/firestore";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (userEmail, thunkAPI) => {
    //const state = thunkAPI.getState();
    //const extra = thunkAPI.extra;
    //const requestId = thunkAPI.requestId;
    //const signal = thunkAPI.signal;
    //console.log(state, extra, requestId, signal);
    //thunkAPI.dispatch({ type: "data/cancel" });
    //thunkAPI.rejectWithValue("rejected", { a: 0 });
    //thunkAPI.fulfillWithValue("fulfilled", { a: 0 });
    console.log(userEmail);
    let tempCategory1={};
    try {
      const db=getFirestore(firebaseApp);
      let querySnapshot1 = await getDocs(collection(db, "transaction"), where("userEmail", "==", userEmail));
      let querySnapshot2 = await getDocs(collection(db, "category"), where("userEmail", "==", userEmail));
      let querySnapshot3 = await getDocs(collection(db, "budget"), where("userEmail", "==", userEmail));
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
      return {tempCategory1, tempCategory2, tempCategory3};
    } catch (err) {
      console.log(tempCategory1, err);
      return thunkAPI.rejectWithValue("time out!", err);
    }
  },
);

const dataSlice = createSlice({
  name: "data",
  initialState:{
    primaries:[],
    returned:{},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log(action);
        // state.push(action.payload);
        console.log(state);
        //Object.assign(state.primaries,action.payload);
        state.primaries.push(action.payload);
        return {returned:action.payload};
      });
  }
});

export const {  } = dataSlice.actions;
export default dataSlice.reducer;
