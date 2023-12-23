/* eslint-disable no-unused-vars */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { baseApiSlice } from "../features/api/baseApiSlice";
import authReducer from "../features/auth/authSlice";
const store = configureStore({
	reducer: {
		[baseApiSlice.reducerPath]: baseApiSlice.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApiSlice.middleware),
	devTools: true,
});

export default store;
