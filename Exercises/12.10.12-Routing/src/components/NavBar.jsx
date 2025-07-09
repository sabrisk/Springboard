import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { spaceData } from "../data/spaceData";

function NavBar() {
	return (
		<nav className="nav-bar">
			<NavLink to="/">Home</NavLink>
			{spaceData.map((spaceThing) => (
				<NavLink key={spaceThing.id} to={`/${spaceThing.id}`}>
					{spaceThing.title}
				</NavLink>
			))}
		</nav>
	);
}

export default NavBar;
