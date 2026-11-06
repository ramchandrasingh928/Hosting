# School ERP — starter scaffold

A responsive School ERP dashboard starter with an Express API and vanilla HTML/CSS/JavaScript. It demonstrates the UI and basic student creation flow; it is **not yet a production-ready ERP**. Data currently lives in server memory and resets when the process restarts. Add a database, authentication, authorization, audit logging, backups, and tests before using real student information.

## Requirements
- Node.js 18+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open <http://localhost:3000>. For a normal run use `npm start`; check JavaScript syntax with `npm run check`.

## Included starter modules
- Dashboard metrics
- Student directory and add-student form
- Teacher directory
- Attendance overview
- Fee overview
- Exam results
- Notices and events
- JSON API endpoints for the dashboard and read-only module data

## API
- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/students`
- `POST /api/students`
- `GET /api/teachers`
- `GET /api/fees`
- `GET /api/attendance`
- `GET /api/exams`
- `GET /api/notices`

`POST /api/students` expects JSON with `name`, `className`, `section`, `rollNo`, `admNo`, `guardian`, and `phone`.

## Structure
```text
.
├── server.js            # Express API and static web server
├── public/
│   ├── index.html       # Dashboard page
│   ├── styles.css       # Responsive UI styles
│   └── app.js           # Fetch/render and student form behavior
├── package.json
└── .env.example
```

## Suggested next steps for a real deployment
1. Select PostgreSQL or another supported database and replace in-memory arrays with migrations and repositories.
2. Add secure login, password hashing, session/token handling, role-based permissions, and CSRF protections where applicable.
3. Implement CRUD, validation, and audit history for students, staff, attendance, fees, exams, timetable, library, transport, and notices.
4. Add automated tests, backups, monitoring, privacy controls, and deployment secrets; never commit real student records or credentials.

The sample records are fictional demo data. Do not enter sensitive personal information into this starter.
