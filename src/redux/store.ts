import { configureStore } from '@reduxjs/toolkit';

import globalSlice from './globalSlice';
import userSlice from '../pages/AuthPage/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        global: globalSlice.reducer
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
