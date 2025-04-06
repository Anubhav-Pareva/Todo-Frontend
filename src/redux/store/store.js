import { configureStore,  } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "../slices/userSlice";
import { userapiSlice } from "../apis/userApi";
import { taskapiSlice } from "../apis/taskApi";

export const store = configureStore({
    reducer: {
        user: userReducer, // Redux Toolkit state management
        [userapiSlice.reducerPath]: userapiSlice.reducer,
        [taskapiSlice.reducerPath]: taskapiSlice.reducer// RTK Query state management
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userapiSlice.middleware).concat(taskapiSlice.middleware),
});

// Enables automatic refetching when the network reconnects or tab regains focus
setupListeners(store.dispatch);