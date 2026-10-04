# INT304 Week 4 Employee List and Final Details

The Employee Management System now displays saved employees as links to individual detail pages. The project continues the existing React application and retains the employee form, editing, removal, and browser-storage persistence.

## Run locally

```bash
npm ci
npm start
```

Open http://localhost:3000. On Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm`.

## Employee workflow

1. Enter a name, email, job title, and department, then select **Add Employee**.
2. Select an employee's name in **Employee List** to open `/employees/:id`.
3. Review the employee ID and all four form fields on **Employee Details**.
4. Select **Back to Employee List** to return.
5. Use **Edit**, **Save**, **Cancel**, and **Remove** from the list as needed.
6. Refresh the list or a valid detail URL to confirm the saved record is restored.

The app preserves the existing string `id` values as list keys and route parameters. These serve the same purpose as `EmployeeId` in the course example, without replacing the IDs of previously saved employees. Missing employee URLs show a clear message and a return link. Wide screens show the form and list together; narrow screens stack them.

## Validation

```bash
npm test -- --watchAll=false --runInBand
npm run build
```

The automated tests cover storage restoration, edits and removal, list-to-detail navigation, direct detail links, and missing employee records. Browser checks also cover form validation, refresh persistence, navigation history, and the mobile layout.

The existing Create React App toolchain uses TypeScript 4.9.5 to satisfy its supported peer dependency range. The Jest configuration resolves React Router's DOM export for the older test runner, and the test setup supplies TextEncoder and TextDecoder.

## Storage

Employee records are serialized under the `employees` localStorage key for the current browser origin. The application uses browser storage for this course project.
