import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
// import styles from "./App.module.css";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Spacecrafts from "./pages/Spacecrafts";
import Planets from "./pages/Planets";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="/spacecrafts" element={<Spacecrafts />} />

			<Route path="/planets" element={<Planets />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
