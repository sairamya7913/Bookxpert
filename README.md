# Employee Management Dashboard

## Project Overview
This is a React-based Employee Management Dashboard application that allows users to manage employee records efficiently. The application includes authentication, employee listing, add/edit/delete functionality, search and filters, image upload, and print support. The UI is designed using Bootstrap with a focus on clean and modern user experience.

---

## Tech Stack Used
- React.js (React 19)
- JavaScript (ES6+)
- React Router DOM
- Bootstrap 5
- React Toastify
- React Icons
- UUID
- Local Storage (for mock persistence)

---

## Features
- Login with validation and toast notifications
- Protected dashboard access
- Employee dashboard with summary and table
- Add / Edit employee using reusable form
- Profile image upload with preview
- Search employees by name
- Filter employees by gender and status
- Delete employee with confirmation popup
- Print employee list
- Loading and empty states handling

---

## Steps to Run the Project Locally

1. Clone the repository:
   git clone https://github.com/sairamya7913/Bookxpert.git

2. Navigate to the project directory:
   cd employee-management-dashboard

3. Install dependencies:
   npm install

4. Start the development server:
   npm start

---

## Assumptions & Design Decisions

Authentication is mock-based using localStorage

Employee data is stored using mock data (no backend API)

Bootstrap is used for faster and consistent UI development

Single reusable form component is used for both Add and Edit operations

Focus was on functionality, code readability, and UX rather than backend integration