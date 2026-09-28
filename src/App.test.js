import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom", () => {
  const React = require("react");
  return {
    BrowserRouter: ({ children }) => children,
    Routes: ({ children }) => children,
    Route: ({ element }) => element,
    Link: ({ children, to }) => React.createElement("a", { href: to }, children),
  };
});

beforeEach(() => localStorage.clear());

function addEmployee() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada Lovelace" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
  fireEvent.change(screen.getByLabelText("Job Title"), { target: { value: "Analyst" } });
  fireEvent.change(screen.getByLabelText("Department"), { target: { value: "Engineering" } });
  fireEvent.click(screen.getByRole("button", { name: "Add Employee" }));
}

test("saves an employee and restores the list after remounting", () => {
  const view = render(<App />);
  addEmployee();
  expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem("employees"))).toMatchObject([
    { name: "Ada Lovelace", title: "Analyst" },
  ]);

  view.unmount();
  render(<App />);
  expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
});

test("saves edits and removals to local storage", () => {
  render(<App />);
  addEmployee();
  fireEvent.click(screen.getByRole("button", { name: "Edit" }));
  fireEvent.change(within(screen.getByRole("listitem")).getByLabelText("Job Title"), {
    target: { value: "Engineer" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(JSON.parse(localStorage.getItem("employees"))[0].title).toBe("Engineer");

  fireEvent.click(screen.getByRole("button", { name: "Remove" }));
  expect(JSON.parse(localStorage.getItem("employees"))).toEqual([]);
});
