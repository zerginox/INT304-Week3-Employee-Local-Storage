import { Link, useParams } from "react-router-dom";
import "../EmployeeForm.css";

function EmployeeDetail({ employees }) {
  const { id } = useParams();
  const employee = employees.find((record) => String(record.id) === id);

  if (!employee) {
    return (
      <main className="employee-page">
        <section className="employee-card employee-detail" aria-labelledby="detail-heading">
          <h1 id="detail-heading">Employee Not Found</h1>
          <p>This employee is not in the saved list. The record may have been removed.</p>
          <Link className="back-link" to="/">Back to Employee List</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="employee-page">
      <section className="employee-card employee-detail" aria-labelledby="detail-heading">
        <h1 id="detail-heading">Employee Details</h1>
        <p className="form-intro">{employee.name}</p>
        <dl className="employee-details">
          <div><dt>Employee ID</dt><dd>{employee.id}</dd></div>
          <div><dt>Name</dt><dd>{employee.name}</dd></div>
          <div><dt>Email</dt><dd>{employee.email}</dd></div>
          <div><dt>Job Title</dt><dd>{employee.title}</dd></div>
          <div><dt>Department</dt><dd>{employee.department}</dd></div>
        </dl>
        <Link className="back-link" to="/">Back to Employee List</Link>
      </section>
    </main>
  );
}

export default EmployeeDetail;
