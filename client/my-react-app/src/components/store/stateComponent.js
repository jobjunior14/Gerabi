import { createSlice } from "@reduxjs/toolkit";

const stateCompSlice = createSlice ({
    name: 'stateComp',
    initialState :{
        stateComp: true,
    },
    reducers : {
        setStateComp (state, action) {
            state.stateComp = action.payload;
        }
    }
});

export const stateCompAction = stateCompSlice.actions;

export default stateCompSlice;