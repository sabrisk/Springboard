import { render, screen } from "@testing-library/react";
import FollowersList from "../FollowersList";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
jest.mock("axios");

const MockFollowersList = () => {
	return (
		<BrowserRouter>
			<FollowersList />
		</BrowserRouter>
	);
};

describe("FollowersList", () => {
	it("should check if first person card is rendered", async () => {
		render(<MockFollowersList title="My FollowersList" />);
		const followerDivElement = await screen.findByTestId("follower-item-0");
		screen.debug();
		expect(followerDivElement).toBeInTheDocument();
	});

	// it("should check if multiple follower items are rendered", async () => {
	// 	render(<MockFollowersList title="My FollowersList" />);
	// 	const followerDivElements = await screen.findAllByTestId(
	// 		/follower-item/i
	// 	);
	// 	expect(followerDivElements.length).toBe(5);
	// });
});
