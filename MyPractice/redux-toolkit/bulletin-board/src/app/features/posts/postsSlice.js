import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
	list: [],
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const response = await axios.get(POSTS_URL);
		return [...response.data];
	} catch (err) {
		return err.message;
	}
});

export const addNewPost = createAsyncThunk(
	"posts/addNewPost",
	async (initialPost) => {
		try {
			const response = await axios.post(POSTS_URL, initialPost);
			return response.data;
		} catch (err) {
			return err.message;
		}
	}
);

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.list.push(action.payload);
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						date: new Date().toISOString(),
						userId,
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				};
			},
		},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.list.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				// Adding date and reactions
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), {
						minutes: min++,
					}).toISOString();
					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					};
					return post;
				});

				// Add any fetched posts to the array
				state.list = loadedPosts;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				// Fix for API post IDs:
				// Creating sortedPosts & assigning the id
				// would be not be needed if the fake API
				// returned accurate new post IDs
				const sortedPosts = state.list.sort((a, b) => {
					if (a.id > b.id) return 1;
					if (a.id < b.id) return -1;
					return 0;
				});
				action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
				// End fix for fake API post IDs

				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};
				state.list.push(action.payload);
			});
	},
});

export const selectAllPosts = (state) => state.posts.list;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
