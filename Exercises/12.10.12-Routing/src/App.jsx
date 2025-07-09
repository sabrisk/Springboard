import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import "./App.css";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ContentPage, { spaceThingLoader } from "./pages/ContentPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route index element={<HomePage />} />
			<Route
				path=":id"
				element={<ContentPage />}
				loader={spaceThingLoader}
			/>
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
