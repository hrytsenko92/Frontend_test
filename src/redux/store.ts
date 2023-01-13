import { configureStore } from '@reduxjs/toolkit';
// import playlistSlice from "./playlistSlice";

export const store = configureStore({
    reducer: {
        // playlist: playlistSlice,

    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch