import {configureStore } from '@reduxjs/toolkit';
import productSlice from './AllProductManager-slice';
import suiviDepenseSlice from './suiviDepense-slice';
import suiviDetteSlice from './suiviDette-slice';
import mensRapportSlice from './mensRepport-slice';
const store = configureStore ( {

    reducer: {

        product: productSlice.reducer,
        mensRapport: mensRapportSlice.reducer,
        suiviDepense: suiviDepenseSlice.reducer,
        suiviDette: suiviDetteSlice.reducer
    }
});

export default store;
