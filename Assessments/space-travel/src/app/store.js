import { configureStore } from "@reduxjs/toolkit";

import spacecraftsReducer from "../features/spacecrafts/spacecraftsSlice";

export const store = configureStore({
	reducer: {
		spacecrafts: spacecraftsReducer,
	},
});
