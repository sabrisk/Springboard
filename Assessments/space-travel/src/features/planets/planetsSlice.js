import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SpaceTravelApi from "../../services/SpaceTravelApi";

const initialState = {
	list: [],
	getPlanetsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	getPlanetsError: null,
};

export const getPlanets = createAsyncThunk("planets/getPlanets", async () => {
	try {
		const response = await SpaceTravelApi.getPlanets();
		console.log("getPlanets thunk", response);
		return [...response.data];
	} catch (err) {
		return err.message;
	}
});

const planetsSlice = createSlice({
	name: "planets",
	initialState,
	extraReducers(builder) {
		builder
			.addCase(getPlanets.pending, (state, action) => {
				state.getPlanetsStatus = "loading";
			})
			.addCase(getPlanets.fulfilled, (state, action) => {
				state.getPlanetsStatus = "succeeded";
				console.log(action.payload);
				state.list = action.payload;
			})
			.addCase(getPlanets.rejected, (state, action) => {
				state.getPlanetsStatus = "failed";
				state.getPlanetsError = action.error.message;
			});
	},
});

export const selectAllPlanets = (state) => state.planets.list;

export const selectPlanetsStatus = (state) => state.planets.getPlanetsStatus;
export const selectPlanetsError = (state) => state.planets.getPlanetsError;

export default planetsSlice.reducer;
