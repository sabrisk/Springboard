import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import { sendSpacecraftToPlanet } from "../spacecrafts/spacecraftsSlice";

const initialState = {
	list: [],
	getPlanetsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	getPlanetsError: null,
	sendSpacecraftToPlanetStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	sendSpacecraftToPlanetError: null,
};

export const getPlanets = createAsyncThunk("planets/getPlanets", async () => {
	try {
		const response = await SpaceTravelApi.getPlanets();
		return [...response.data];
	} catch (err) {
		throw new Error(err.message);
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
				state.list = action.payload;
			})
			.addCase(getPlanets.rejected, (state, action) => {
				state.getPlanetsStatus = "failed";
				state.getPlanetsError = action.error.message;
			})
			.addCase(sendSpacecraftToPlanet.pending, (state, action) => {
				state.sendSpacecraftToPlanetStatus = "loading";
			})
			.addCase(sendSpacecraftToPlanet.fulfilled, (state, action) => {
				state.sendSpacecraftToPlanetStatus = "succeeded";

				const { originPlanetId, targetPlanetId, capacity } =
					action.payload;

				let transferredCapacity = capacity;

				const originPlanet = state.list.find(
					(planet) => planet.id === originPlanetId
				);

				if (originPlanet.currentPopulation < transferredCapacity) {
					transferredCapacity = originPlanet.currentPopulation;
				}

				originPlanet.currentPopulation -= transferredCapacity;

				const targetPlanet = state.list.find(
					(planet) => planet.id === targetPlanetId
				);
				targetPlanet.currentPopulation += transferredCapacity;
			})
			.addCase(sendSpacecraftToPlanet.rejected, (state, action) => {
				state.sendSpacecraftToPlanetStatus = "failed";
				state.sendSpacecraftToPlanetError = action.error.message;
			});
	},
});

export const selectAllPlanets = (state) => state.planets.list;

export const selectPlanetsStatus = (state) => state.planets.getPlanetsStatus;
export const selectPlanetsError = (state) => state.planets.getPlanetsError;

export default planetsSlice.reducer;
