import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./reducer/testSlice";
import userSlice from "./reducer/userSlice";
import transactionSlice from "./reducer/transactionReducer";
import trReducer from "./reducer/trReducer";
import postsSlice from "./reducer/postReducer";
export default configureStore({
    reducer:{
        test:testSlice,
        user:userSlice,
        tr:transactionSlice,
        data: trReducer,
        posts:postsSlice
    },
})