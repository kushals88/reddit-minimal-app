import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../features/comments/commentsSlice";
import listingsReducer from "../features/listings/listingsSlice"

const store = configureStore({
    reducer: {
        comments: commentsReducer,
        listings: listingsReducer
    }
});

export default store;
