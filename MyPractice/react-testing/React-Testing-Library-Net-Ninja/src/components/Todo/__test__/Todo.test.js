import { fireEvent, render, screen } from "@testing-library/react";
import Todo from "../Todo";
import { BrowserRouter } from "react-router-dom";

const MockTodo = () => {
	return (
		<BrowserRouter>
			<Todo />
		</BrowserRouter>
	);
};

const addTask = (tasks) => {
	const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
	const buttonElement = screen.getByRole("button", { name: /Add/i });

	tasks.forEach((task) => {
		fireEvent.change(inputElement, {
			target: { value: task },
		});
		fireEvent.click(buttonElement);
	});
};

describe("Todo", () => {
	it("should render multiple items", async () => {
		render(<MockTodo />);
		addTask(["Go Grocery Shopping", "Pet my Cat", "Wash my Hands"]);
		const divElements = screen.getAllByTestId("task-container");
		expect(divElements.length).toBe(3);
	});

	it("task should not have completed class when initially rendered", async () => {
		render(<MockTodo />);
		addTask(["Go Grocery Shopping"]);
		const divElement = screen.getByText("Go Grocery Shopping");
		expect(divElement).not.toHaveClass("todo-item-active");
	});

	it("task should have completed class when clicked", async () => {
		render(<MockTodo />);
		addTask(["Go Grocery Shopping"]);
		const divElement = screen.getByText("Go Grocery Shopping");

		fireEvent.click(divElement);

		expect(divElement).toHaveClass("todo-item-active");
	});
});
