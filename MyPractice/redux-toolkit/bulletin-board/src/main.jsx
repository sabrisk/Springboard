import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./app/features/users/usersSlice.js";

store.dispatch(fetchUsers());

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
