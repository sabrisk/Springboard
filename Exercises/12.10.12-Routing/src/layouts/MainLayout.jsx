import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import BackButton from "../components/BackButton";
import "./MainLayout.css";
function MainLayout() {
	return (
		<div className="main-layout">
			<NavBar />
			<Outlet />
			<BackButton />
		</div>
	);
}

export default MainLayout;
