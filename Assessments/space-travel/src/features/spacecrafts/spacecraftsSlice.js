import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SpaceTravelApi from "../../services/SpaceTravelApi";

const initialState = {
	list: [],
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
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

const spacecraftsSlice = createSlice({
	name: "spacecrafts",
	initialState,
	extraReducers(builder) {
		builder
			.addCase(getSpacecrafts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(getSpacecrafts.fulfilled, (state, action) => {
				state.status = "succeeded";
				console.log(action.payload);
				state.list = action.payload;
			})
			.addCase(getSpacecrafts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(buildSpacecraft.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(buildSpacecraft.fulfilled, (state, action) => {
				state.status = "succeeded";
			})
			.addCase(buildSpacecraft.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const selectAllSpacecrafts = (state) => state.spacecrafts.list;
export const getSpacecraftsStatus = (state) => state.spacecrafts.status;
export const getSpacecraftsError = (state) => state.spacecrafts.error;

export default spacecraftsSlice.reducer;
