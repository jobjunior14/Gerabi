import { createSlice } from "@reduxjs/toolkit";

const venteBarSlice = createSlice ({

    name: 'venteBar',
    initialState: {
        mensualData: {
            bralima: null,
            brasimba: null,
            autreProduit: null,
            liqueurs: null
        },
        date: {
            year: Number (new Date().getFullYear()),
            month: Number (new Date().getMonth() + 1)
        }
    },

    reducers: {

        setMensualData (state, actions) {

            state.mensualData = actions.payload
        },

        setDate (state, action ){
            
            if (action.payload.year && action.payload.month){

                state.date = {
                    year: action.payload.year,
                    month: action.payload.month
                }
            }
            const name = action.payload.name;
            const value = action.payload.value;

            state.date = {
               ...state.date, [name]: value
            };
        }
    }
});

export const venteBarActions = venteBarSlice.actions;

export default venteBarSlice;