import { createSlice } from "@reduxjs/toolkit";

const mensRapportSlice = createSlice ({

    name: 'mensRapport',
    initialState: {
        suiviVente: {
            bralima: null,
            brasimba: null,
            autreProduit: null,
            liqueurs: null
        },
        perte: 0,
    },

    reducers: {

        setSuiviVente (state, actions) {

            state.suiviVente = actions.payload
        },

        setPerte(state, action ) {
            state.perte = action.payload;
        },
    }
});

export const mensRapportActions = mensRapportSlice.actions;

export default mensRapportSlice;