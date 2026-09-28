import { useState } from "react";

const emptyDraft = { name: "", email: "", title: "", department: "" };

function EmployeeList({ employees, onUpdateEmployee, onRemoveEmployee }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(emptyDraft);

  function startEditing(employee) {
    setEditingId(employee.id);
    setDraft({
      name: employee.name,
      email: employee.email,
      title: employee.title,
      department: employee.department,
    });
  }

  function handleChange(event) {
    setDraft((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleSave(event) {
    event.preventDefault();
    const changes = Object.fromEntries(
      Object.entries(draft).map(([key, value]) => [key, value.trim()])
    );
    if (Object.values(changes).some((value) => !value)) return;
    onUpdateEmployee(editingId, changes);
    setEditingId(null);
  }

  return (
    <section className="employee-card employee-list" aria-labelledby="employee-list-heading">
      <h2 id="employee-list-heading">Saved Employees</h2>
      {employees.length === 0 ? (
        <p className="empty-list">No employees added yet.</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {editingId === employee.id ? (
                <form className="edit-form" onSubmit={handleSave}>
                  <label>
                    Name
                    <input name="name" value={draft.name} onChange={handleChange} required />
                  </label>
                  <label>
                    Email
                    <input name="email" type="email" value={draft.email} onChange={handleChange} required />
                  </label>
                  <label>
                    Job Title
                    <input name="title" value={draft.title} onChange={handleChange} required />
                  </label>
                  <label>
                    Department
                    <input name="department" value={draft.department} onChange={handleChange} required />
                  </label>
                  <div className="employee-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h3>{employee.name}</h3>
                  <p>{employee.title} · {employee.department}</p>
                  <p>{employee.email}</p>
                  <div className="employee-actions">
                    <button type="button" onClick={() => startEditing(employee)}>Edit</button>
                    <button type="button" onClick={() => onRemoveEmployee(employee.id)}>Remove</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default EmployeeList;
