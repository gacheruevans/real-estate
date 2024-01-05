import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentListing: null,
    error: null,
    loading: false,
};

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {

        createListingStart: (state) => {
            state.loading = true;

        },

        createListingSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        createListingFailure: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
    },
});

export const { 
    createListingStart,
    createListingSuccess,
    createListingFailure
} = listingSlice.actions;

export default listingSlice.reducer;