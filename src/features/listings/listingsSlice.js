import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListings } from "../../utils/requestUtil";

export const fetchListings = createAsyncThunk(
    "listings/fetchComments",
    async ({ subreddit, limit }) => {
        const response = await getListings(subreddit, limit);
        return response.data.children;
    }
);

const initialState = {
    listings: [],
    filteredListings: [],
    selectedSubreddit: "popular",
    status: "idle",
    error: null
}

const listingsSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {
        filterListings: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredListings = state.listings.filter((listing) =>
                listing.data.title.toLowerCase().includes(searchTerm)
            );
        },
        resetFilteredListings: (state) => {
            state.filteredListings = state.listings;
        },
        setSelectedSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListings.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchListings.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.listings = action.payload;
                state.filteredListings = action.payload;
            })
            .addCase(fetchListings.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "An unknown error occured.";
            });
    }

});

export const { filterListings, setSelectedSubreddit, resetFilteredListings } = listingsSlice.actions;
export default listingsSlice.reducer;