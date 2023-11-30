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
        date: {
            year: Number (new Date().getFullYear()),
            month: Number (new Date().getMonth() + 1),
            day: Number (new Date().getDate())
        },
        componentName: 'degoBar',
        paramsDate: {
            year: Number (new Date().getFullYear()),
            month: Number (new Date().getMonth() + 1),
            day: Number (new Date().getDate)     
        },
        perte: 0,
        user: 'dailyRap'
    },

    reducers: {

        setSuiviVente (state, actions) {

            state.suiviVente = actions.payload
        },

        setDate (state, action ){
            
            if (action.payload.year && action.payload.month && action.payload.day){

                state.date = {
                    year: action.payload.year,
                    month: action.payload.month,
                    day: action.payload.day
                }
            }
            const name = action.payload.name;
            const value = action.payload.value;

            state.date = {
               ...state.date, [name]: value
            };
        },

        setComponentName (state, action) {
            state.componentName = action.payload
        },

        setParamsDate (state, action) {
            state.paramsDate = action.payload;
        },

        setPerte(state, action ) {
            state.perte = action.payload;
        },
        
        setUser (state, action) {
            state.user = action.payload;
        }
    }
});

export const mensRapportActions = mensRapportSlice.actions;

export default mensRapportSlice;