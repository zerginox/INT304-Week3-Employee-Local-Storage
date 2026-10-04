import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, "", "/");
});

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

test("opens the matching detail page and returns to the employee list", () => {
  render(<App />);
  addEmployee();
  const saved = JSON.parse(localStorage.getItem("employees"))[0];
  const link = screen.getByRole("link", { name: "Ada Lovelace" });
  expect(link).toHaveAttribute("href", `/employees/${saved.id}`);
  fireEvent.click(link);
  expect(screen.getByRole("heading", { name: "Employee Details" })).toBeInTheDocument();
  expect(screen.getByText("ada@example.com")).toBeInTheDocument();
  expect(screen.getByText(saved.id)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "Back to Employee List" }));
  expect(screen.getByRole("heading", { name: "Employee List" })).toBeInTheDocument();
});

test("restores a saved employee directly on the detail route", () => {
  localStorage.setItem("employees", JSON.stringify([
    { id: "employee-42", name: "Jordan Lee", email: "jordan@example.com", title: "Developer", department: "IT" },
  ]));
  window.history.replaceState({}, "", "/employees/employee-42");
  render(<App />);
  expect(screen.getByRole("heading", { name: "Employee Details" })).toBeInTheDocument();
  expect(screen.getByText("jordan@example.com")).toBeInTheDocument();
});

test("handles a missing employee without showing an empty detail record", () => {
  window.history.replaceState({}, "", "/employees/missing");
  render(<App />);
  expect(screen.getByRole("heading", { name: "Employee Not Found" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "Back to Employee List" }));
  expect(screen.getByText("No employees added yet.")).toBeInTheDocument();
});
