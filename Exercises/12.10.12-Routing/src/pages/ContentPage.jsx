import React from "react";
import { useLoaderData } from "react-router-dom";
import { spaceData } from "../data/spaceData";
import "./ContentPage.css";

function ContentPage() {
	const spaceThing = useLoaderData();
	console.log(spaceThing);
	return (
		<div className="content-page">
			<h2>{spaceThing.title}</h2>
			<p>{spaceThing.content}</p>
		</div>
	);
}

export default ContentPage;

//loader function
export const spaceThingLoader = ({ params }) => {
	const { id } = params;

	const spaceThing = spaceData.find((thing) => thing.id === id);

	return spaceThing;
};
