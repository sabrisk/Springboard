import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SpaceTravelApi from "../../services/SpaceTravelApi";

const initialState = {
	list: [],
	getSpacecraftsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	buildSpacecraftStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	destroySpacecraftByIdStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'

	getSpacecraftsError: null,
	buildSpacecraftError: null,
	destroySpacecraftByIdError: null,
};

export const getSpacecrafts = createAsyncThunk(
	"spacecrafts/getSpacecrafts",
	async () => {
		try {
			const response = await SpaceTravelApi.getSpacecrafts();
			console.log("getSpacecrafts thunk", response);
			return [...response.data];
		} catch (err) {
			return err.message;
		}
	}
);

export const buildSpacecraft = createAsyncThunk(
	"spacecrafts/buildSpacecraft",
	async (newSpacecraft, { dispatch }) => {
		try {
			const response = await SpaceTravelApi.buildSpacecraft(
				newSpacecraft
			);
			console.log("buildSpacecraft thunk", response);
			await dispatch(getSpacecrafts());
			return response;
		} catch (err) {
			return err.message;
		}
	}
);

export const destroySpacecraftById = createAsyncThunk(
	"spacecrafts/destroySpacecraftById",
	async (id, { dispatch }) => {
		try {
			const response = await SpaceTravelApi.destroySpacecraftById(id);
			console.log("destroySpacecraftById thunk", response);
			console.log("destroySpacecraftById thunk id", id);
			await dispatch(getSpacecrafts());
			return response;
		} catch (err) {
			return err.message;
		}
	}
);

const spacecraftsSlice = createSlice({
	name: "spacecrafts",
	initialState,
	extraReducers(builder) {
		builder
			.addCase(getSpacecrafts.pending, (state, action) => {
				state.getSpacecraftsStatus = "loading";
			})
			.addCase(getSpacecrafts.fulfilled, (state, action) => {
				state.getSpacecraftsStatus = "succeeded";
				console.log(action.payload);
				state.list = action.payload;
			})
			.addCase(getSpacecrafts.rejected, (state, action) => {
				state.getSpacecraftsStatus = "failed";
				state.getSpacecraftsError = action.error.message;
			})
			.addCase(buildSpacecraft.pending, (state, action) => {
				state.buildSpacecraftStatus = "loading";
			})
			.addCase(buildSpacecraft.fulfilled, (state, action) => {
				state.buildSpacecraftStatus = "succeeded";
			})
			.addCase(buildSpacecraft.rejected, (state, action) => {
				state.buildSpacecraftStatus = "failed";
				state.buildSpacecraftError = action.error.message;
			})
			.addCase(destroySpacecraftById.pending, (state, action) => {
				state.destroySpacecraftByIdStatus = "loading";
			})
			.addCase(destroySpacecraftById.fulfilled, (state, action) => {
				state.destroySpacecraftByIdStatus = "succeeded";
				console.log(action.payload);
				// state.list = action.payload;
			})
			.addCase(destroySpacecraftById.rejected, (state, action) => {
				state.destroySpacecraftByIdStatus = "failed";
				state.destroySpacecraftByIdError = action.error.message;
			});
	},
});

export const selectAllSpacecrafts = (state) => state.spacecrafts.list;

export const selectSpacecraftsStatus = (state) =>
	state.spacecrafts.getSpacecraftsStatus;
export const selectSpacecraftsError = (state) =>
	state.spacecrafts.getSpacecraftsError;

export const selectSpacecraftStatus = (state) =>
	state.spacecrafts.buildSpacecraftStatus;
export const selectSpacecraftError = (state) =>
	state.spacecrafts.buildSpacecraftError;

export const selectDestroySpacecraftByIdStatus = (state) =>
	state.spacecrafts.destroySpacecraftByIdStatus;
export const selectDestroySpacecraftByIdError = (state) =>
	state.spacecrafts.destroySpacecraftByIdError;

export default spacecraftsSlice.reducer;
