import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
	it("should render same text passed into title prop", async () => {
		render(<Header title="My Header" />);
		const headerElement = screen.getByText(/my header/i);
		expect(headerElement).toBeInTheDocument();
	});
});

// it("should render same text passed into title prop", async () => {
// 	render(<Header title="My Header" />);
// 	const headerElement = screen.getByRole("heading", { name: "My Header" });
// 	expect(headerElement).toBeInTheDocument();
// });

// it("should render same text passed into title prop", async () => {
// 	render(<Header title="My Header" />);
// 	const headerElement = screen.getByTestId("header-1");
// 	expect(headerElement).toBeInTheDocument();
// });

// //FIND BY

// it("should render same text passed into title prop", async () => {
// 	render(<Header title="My Header" />);
// 	const headerElement = await screen.findByText(/my header/i);
// 	expect(headerElement).toBeInTheDocument();
// });

// //QueryBy

// it("should render same text passed into title prop", async () => {
// 	render(<Header title="My Header" />);
// 	const headerElement = screen.queryByText(/dogs/i);
// 	expect(headerElement).not.toBeInTheDocument();
// });

// it("should render same text passed into title prop", async () => {
// 	render(<Header title="My Header" />);
// 	const headerElements = screen.getAllByRole("heading");
// 	expect(headerElements.length).toBe(2);
// });
