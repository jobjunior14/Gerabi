import { createSlice } from "@reduxjs/toolkit";

const darkAndWhiteModeSlice = createSlice ({
    name: 'mode',
    initialState: {
        theme: 'dark',
    },

    reducers: {
        setMode(state, action) {
            state.theme = action.payload;
        }
    }

});

export const darkAndWhiteModeActions = darkAndWhiteModeSlice.actions;

export default darkAndWhiteModeSlice;