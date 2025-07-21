import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { getSpacecrafts } from "./features/spacecrafts/spacecraftsSlice.js";
import { getPlanets } from "./features/planets/planetsSlice.js";

store.dispatch(getSpacecrafts());
store.dispatch(getPlanets());

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
