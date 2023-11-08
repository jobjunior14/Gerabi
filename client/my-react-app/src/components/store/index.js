import {configureStore } from '@reduxjs/toolkit';
import productSlice from './AllProductManager-slice';
import venteBarSlice from './venteBar-slice';
import suiviDepenseSlice from './suiviDepense-slice';
import suiviDetteSlice from './suiviDette-slice';
const store = configureStore ( {

    reducer: {

        product: productSlice.reducer,
        venteBar: venteBarSlice.reducer,
        suiviDepense: suiviDepenseSlice.reducer,
        suiviDette: suiviDetteSlice.reducer
    }
});

export default store;
