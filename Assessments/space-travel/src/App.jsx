import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
// import styles from "./App.module.css";
import RootLayout from "./layout/RootLayout";
import Home from "./components/Home";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
