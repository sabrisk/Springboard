import { configureStore } from "@reduxjs/toolkit";

import spacecraftsReducer from "../features/spacecrafts/spacecraftsSlice";
import planetsReducer from "../features/planets/planetsSlice";

export const store = configureStore({
	reducer: {
		spacecrafts: spacecraftsReducer,
		planets: planetsReducer,
	},
});
