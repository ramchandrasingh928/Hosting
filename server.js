const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Fictional demo data only. Replace with persistent database storage before production.
const students = [
  { id: 1, name: 'Aarav Sharma', className: 'Grade 10-A', section: 'A', rollNo: 12, admNo: 'ADM-2025-001', guardian: 'Rohit Sharma', phone: '+91 98765 43210', status: 'Active' },
  { id: 2, name: 'Diya Verma', className: 'Grade 9-B', section: 'B', rollNo: 4, admNo: 'ADM-2025-002', guardian: 'Anil Verma', phone: '+91 91234 56789', status: 'Active' },
  { id: 3, name: 'Kabir Singh', className: 'Grade 8-C', section: 'C', rollNo: 19, admNo: 'ADM-2025-003', guardian: 'Harpreet Singh', phone: '+91 99887 66554', status: 'On Leave' },
  { id: 4, name: 'Meera Patel', className: 'Grade 11-Science', section: 'A', rollNo: 8, admNo: 'ADM-2025-004', guardian: 'Nita Patel', phone: '+91 97654 32101', status: 'Active' },
  { id: 5, name: 'Rohan Iyer', className: 'Grade 12-Commerce', section: 'B', rollNo: 11, admNo: 'ADM-2025-005', guardian: 'Sanjay Iyer', phone: '+91 94455 11223', status: 'Active' }
];

const teachers = [
  { id: 1, name: 'Mrs. Kavita Rao', subject: 'Mathematics', grade: 'Grade 9-12', experience: '12 years' },
  { id: 2, name: 'Mr. Aakash Nair', subject: 'Physics', grade: 'Grade 11-12', experience: '9 years' },
  { id: 3, name: 'Ms. Sana Khan', subject: 'English', grade: 'Grade 6-10', experience: '7 years' },
  { id: 4, name: 'Mr. Vikram Joshi', subject: 'Computer Science', grade: 'Grade 8-12', experience: '11 years' }
];
const fees = [
  { id: 1, student: 'Aarav Sharma', className: 'Grade 10-A', amount: 15000, paid: 12000, due: 3000, status: 'Pending' },
  { id: 2, student: 'Diya Verma', className: 'Grade 9-B', amount: 14000, paid: 14000, due: 0, status: 'Paid' },
  { id: 3, student: 'Kabir Singh', className: 'Grade 8-C', amount: 13000, paid: 8000, due: 5000, status: 'Pending' },
  { id: 4, student: 'Meera Patel', className: 'Grade 11-Science', amount: 18000, paid: 18000, due: 0, status: 'Paid' }
];
const attendance = [
  { className: 'Grade 10-A', present: 28, absent: 2, percent: 93 },
  { className: 'Grade 9-B', present: 29, absent: 1, percent: 97 },
  { className: 'Grade 8-C', present: 26, absent: 4, percent: 87 },
  { className: 'Grade 11-Science', present: 24, absent: 3, percent: 89 }
];
const exams = [
  { subject: 'Mathematics', student: 'Aarav Sharma', marks: 92, grade: 'A+' },
  { subject: 'Physics', student: 'Meera Patel', marks: 95, grade: 'A+' },
  { subject: 'English', student: 'Diya Verma', marks: 88, grade: 'A' },
  { subject: 'Computer Science', student: 'Rohan Iyer', marks: 90, grade: 'A+' }
];
const notices = [
  { title: 'Annual Sports Day', date: '2026-11-18', category: 'Event' },
  { title: 'Parent-Teacher Meeting', date: '2026-11-21', category: 'Meeting' },
  { title: 'Holiday Notice', date: '2026-11-12', category: 'Holiday' },
  { title: 'Science Exhibition Registration', date: '2026-11-15', category: 'Academic' }
];

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/dashboard', (req, res) => {
  const totalCollected = fees.reduce((sum, item) => sum + item.paid, 0);
  const totalDue = fees.reduce((sum, item) => sum + item.due, 0);
  res.json({
    stats: [
      { label: 'Total Students', value: students.length, trend: 'Demo data' },
      { label: 'Teachers', value: teachers.length, trend: 'Demo data' },
      { label: 'Fees Collected', value: `₹${totalCollected.toLocaleString('en-IN')}`, trend: 'Demo data' },
      { label: 'Pending Fees', value: `₹${totalDue.toLocaleString('en-IN')}`, trend: 'Demo data' }
    ], students, teachers, fees, attendance, exams, notices
  });
});

app.get('/api/students', (req, res) => res.json(students));
app.get('/api/teachers', (req, res) => res.json(teachers));
app.get('/api/fees', (req, res) => res.json(fees));
app.get('/api/attendance', (req, res) => res.json(attendance));
app.get('/api/exams', (req, res) => res.json(exams));
app.get('/api/notices', (req, res) => res.json(notices));

app.post('/api/students', (req, res) => {
  const fields = ['name', 'className', 'section', 'admNo', 'guardian', 'phone'];
  const missing = fields.filter((field) => typeof req.body[field] !== 'string' || !req.body[field].trim());
  const rollNo = Number(req.body.rollNo);
  if (missing.length || !Number.isInteger(rollNo) || rollNo < 1) {
    return res.status(400).json({ error: 'Provide all required fields and a positive integer roll number.' });
  }
  if (students.some((student) => student.admNo.toLowerCase() === req.body.admNo.trim().toLowerCase())) {
    return res.status(409).json({ error: 'Admission number already exists.' });
  }

  const newStudent = {
    id: Date.now(),
    name: req.body.name.trim(),
    className: req.body.className.trim(),
    section: req.body.section.trim(),
    rollNo,
    admNo: req.body.admNo.trim(),
    guardian: req.body.guardian.trim(),
    phone: req.body.phone.trim(),
    status: 'Active'
  };
  students.unshift(newStudent);
  return res.status(201).json(newStudent);
});

app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found.' }));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`School ERP starter running at http://localhost:${PORT}`));
