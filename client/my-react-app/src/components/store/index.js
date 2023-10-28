import {configureStore } from '@reduxjs/toolkit';
import productSlice from './AllProductManager-slice';
import venteBarSlice from './venteBar-slice';

const store = configureStore ( {

    reducer: {

        product: productSlice.reducer,
        venteBar: venteBarSlice.reducer
    }
});

export default store;
