import { render, screen } from "@testing-library/react";
import TodoFooter from "../TodoFooter";
import { BrowserRouter } from "react-router-dom";

const MockTodoFooter = ({ numberOfIncompleteTasks }) => {
	return (
		<BrowserRouter>
			<TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
		</BrowserRouter>
	);
};

describe("TodoFooter", () => {
	it("should render the correct amount of incomplete tasks", async () => {
		render(<MockTodoFooter numberOfIncompleteTasks={5} />);
		const paragraphElement = screen.getByText(/5 tasks left/i);
		expect(paragraphElement).toBeInTheDocument();
	});

	it("should render singular 'task' if one task left", async () => {
		render(<MockTodoFooter numberOfIncompleteTasks={1} />);
		const paragraphElement = screen.getByText(/1 task left/i);
		expect(paragraphElement).toBeInTheDocument();
	});
});

// it("checks if p element is truthy", async () => {
// 	render(<MockTodoFooter numberOfIncompleteTasks={1} />);
// 	const paragraphElement = screen.getByText(/1 task left/i);
// 	expect(paragraphElement).toBeTruthy();
// });

// it("checks if contains p tag", async () => {
// 	render(<MockTodoFooter numberOfIncompleteTasks={1} />);
// 	const paragraphElement = screen.getByText(/1 task left/i);
// 	expect(paragraphElement).toHaveTextContent("1 task left");
// });

// it("checks if text content", async () => {
// 	render(<MockTodoFooter numberOfIncompleteTasks={1} />);
// 	const paragraphElement = screen.getByTestId("para");
// 	expect(paragraphElement).toHaveTextContent("1 task left");
// });

// it("checks if paragraph not falsy", async () => {
// 	render(<MockTodoFooter numberOfIncompleteTasks={1} />);
// 	const paragraphElement = screen.getByTestId("para");
// 	expect(paragraphElement).not.toBeFalsy();
// });

// it("checks if paragraph value is '1 task left'", async () => {
// 	render(<MockTodoFooter numberOfIncompleteTasks={1} />);
// 	const paragraphElement = screen.getByTestId("para");
// 	expect(paragraphElement.textContent).toBe("1 task left");
// });
