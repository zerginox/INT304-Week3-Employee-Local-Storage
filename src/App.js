import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

function loadEmployees() {
  try {
    const saved = localStorage.getItem("employees");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveData(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function Home({ employees, onAddEmployee, onUpdateEmployee, onRemoveEmployee, storageError }) {
  return (
    <main className="employee-page">
      <EmployeeForm
        heading="Add Employee"
        submitLabel="Add Employee"
        onAddEmployee={onAddEmployee}
      />
      <EmployeeList
        employees={employees}
        onUpdateEmployee={onUpdateEmployee}
        onRemoveEmployee={onRemoveEmployee}
      />
      {storageError && <p className="storage-error" role="alert">{storageError}</p>}
    </main>
  );
}

function About() {
  return (
    <main className="info-page">
      <h1>About</h1>
      <p>
        This INT304 React application demonstrates reusable components, routing,
        controlled form inputs, state updates, and browser storage.
      </p>
    </main>
  );
}

function App() {
  const [employees, setEmployees] = useState(loadEmployees);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      saveData(employees);
      setStorageError("");
    } catch {
      setStorageError("Employee data could not be saved in this browser.");
    }
  }, [employees]);

  function addEmployee(employee) {
    setEmployees((current) => [
      ...current,
      {
        ...employee,
        id: window.crypto?.randomUUID?.() ??
          `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      },
    ]);
  }

  function updateEmployee(id, changes) {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id ? { ...employee, ...changes } : employee
      )
    );
  }

  function removeEmployee(id) {
    setEmployees((current) => current.filter((employee) => employee.id !== id));
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="site-header">
          <div className="site-title">Employee Management System</div>
          <nav aria-label="Primary navigation">
            <Link to="/">Employee Form</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                employees={employees}
                onAddEmployee={addEmployee}
                onUpdateEmployee={updateEmployee}
                onRemoveEmployee={removeEmployee}
                storageError={storageError}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
