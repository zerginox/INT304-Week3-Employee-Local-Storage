import React from "react";
import "../EmployeeForm.css";

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      title: "",
      department: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      submitted: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const employee = {
      name: this.state.name.trim(),
      email: this.state.email.trim(),
      title: this.state.title.trim(),
      department: this.state.department.trim(),
    };

    if (Object.values(employee).some((value) => !value)) return;
    this.props.onAddEmployee(employee);

    this.setState({
      name: "",
      email: "",
      title: "",
      department: "",
      submitted: true,
    });
  }

  render() {
    const heading = this.props.heading || "Add Employee";
    const submitLabel = this.props.submitLabel || "Add Employee";

    return (
      <section className="employee-card" aria-labelledby="employee-form-heading">
          <h1 id="employee-form-heading">{heading}</h1>
          <p className="form-intro">
            Enter the new employee information below. All fields are required.
          </p>

          <form className="employee-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
                autoComplete="organization-title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                id="department"
                name="department"
                type="text"
                value={this.state.department}
                onChange={this.handleChange}
                required
              />
            </div>

            <button type="submit">{submitLabel}</button>
          </form>

          <p className="form-status" aria-live="polite">
            {this.state.submitted
              ? "Employee added to the list. The form is ready for another entry."
              : ""}
          </p>
      </section>
    );
  }
}

export default EmployeeForm;
