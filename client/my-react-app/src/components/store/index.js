import {configureStore } from '@reduxjs/toolkit';
import productSlice from './AllProductManager-slice';
import venteBarSlice from './venteBar-slice';
import suiviDepenseSlice from './suiviDepense-slice';

const store = configureStore ( {

    reducer: {

        product: productSlice.reducer,
        venteBar: venteBarSlice.reducer,
        suiviDepense: suiviDepenseSlice.reducer
    }
});

export default store;
