import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComments } from "../../utils/requestUtil";

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async ({ subreddit, listingId }) => {
        const response = await getComments(subreddit, listingId);
        const comments = response[1]?.data?.children?.filter(comment => comment?.kind === "t1" && comment?.data?.body) || [];
        return { listingId, comments };
    }
);

const initialState = {
    commentsByListing: {},
    statusByListing: {},
    errorByListing: {}
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        resetStatus: (state, action) => {
            const { listingId } = action.payload
            state.statusByListing[listingId] = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                const { listingId } = action.meta.arg;
                state.statusByListing[listingId] = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const { listingId, comments } = action.payload;
                state.statusByListing[listingId] = "succeeded";
                state.commentsByListing[listingId] = comments;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                const { listingId } = action.meta.arg;
                state.statusByListing[listingId] = "failed";
                state.errorByListing[listingId] = action.error.message;
            });
    },
});

export const { resetStatus } = commentsSlice.actions;
export default commentsSlice.reducer;
