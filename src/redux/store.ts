import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './cardSlice';

export const store = configureStore({
    reducer: {
        cards: cardSlice,

    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch