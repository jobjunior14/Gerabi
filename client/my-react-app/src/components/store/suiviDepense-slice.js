import { createSlice } from "@reduxjs/toolkit";

const suiviDepenseSlice = createSlice ({

    name: 'suiviDepense',
    initialState: {
       date: {
            year: Number(new Date().getFullYear()),
            month: Number(new Date().getMonth() + 1),
            day: Number(new Date().getDate()),
        },
        entreeCaisse: null,
        sortieCaisse: null,
        prevSoldCaisse: null
    },

    reducers: {

        //change date fields
        setDate (state, action) {

            if (action.payload.year) {

                state.date = {
                    year: action.payload.year,
                    month: action.payload.month,
                    day: action.payload.day
                };

            } else {
                
                const name = action.payload.name;
                const value = action.payload.value;
    
                state.date = {
                    ...state.date, [name]: value
                };
            }
        },

        setEntreeCaisse(state, action) {

            state.entreeCaisse = action.payload;
        },

        HandleEntreeCaisse (state, action) {

            const name = action.payload.name;
            const value = action.payload.value;
            const id = Number (action.payload.id);
            const data = state.entreeCaisse;
            const index = data.findIndex(el => el.id === id);

            if (index !== -1) {

                if (name === 'name') {

                    data[index] = {...data[index], name: value };
                } else {

                    data[index] = {...data[index], data: {...data[index]['data'], [name]: value} };
                };

            };

            state.entreeCaisse = data;
        },

        addProductEntreeCaisse (state, action) {

            state.entreeCaisse.push (
                {
                    id: state.entreeCaisse.length,
                    name: "",
                    data:{
                        amount: 0
                    }
                }
            );
        },

        setSortieCaisse (state, action) {

            const name = action.payload.name;
        }

    }
});

export const suiviDepenseActions = suiviDepenseSlice.actions;

export default suiviDepenseSlice;