const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const students = [
  { id: 1, name: 'Aarav Sharma', className: 'Grade 10-A', section: 'A', rollNo: 12, admNo: 'ADM-2025-001', guardian: 'Rohit Sharma', phone: '+91 98765 43210', status: 'Active' },
  { id: 2, name: 'Diya Verma', className: 'Grade 9-B', section: 'B', rollNo: 04, admNo: 'ADM-2025-002', guardian: 'Anil Verma', phone: '+91 91234 56789', status: 'Active' },
  { id: 3, name: 'Kabir Singh', className: 'Grade 8-C', section: 'C', rollNo: 19, admNo: 'ADM-2025-003', guardian: 'Harpreet Singh', phone: '+91 99887 66554', status: 'On Leave' },
  { id: 4, name: 'Meera Patel', className: 'Grade 11-Science', section: 'A', rollNo: 08, admNo: 'ADM-2025-004', guardian: 'Nita Patel', phone: '+91 97654 32101', status: 'Active' },
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
  { title: 'Holiday Notice for Diwali', date: '2026-11-12', category: 'Holiday' },
  { title: 'Science Exhibition Registration', date: '2026-11-15', category: 'Academic' }
];

const timetable = [
  { day: 'Monday', slots: ['Math', 'Physics', 'English', 'Lab', 'Computer'] },
  { day: 'Tuesday', slots: ['Biology', 'Math', 'History', 'Sports', 'Art'] },
  { day: 'Wednesday', slots: ['Chemistry', 'English', 'Economics', 'Project', 'Library'] },
  { day: 'Thursday', slots: ['Computer', 'Physics', 'Math', 'Music', 'Mentoring'] },
  { day: 'Friday', slots: ['Science', 'English', 'PT', 'Commerce', 'Club'] }
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/dashboard', (req, res) => {
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalCollected = fees.reduce((sum, item) => sum + item.paid, 0);
  const totalDue = fees.reduce((sum, item) => sum + item.due, 0);

  res.json({
    stats: [
      { label: 'Total Students', value: totalStudents, trend: '+8.2%' },
      { label: 'Teachers', value: totalTeachers, trend: '+2.1%' },
      { label: 'Fees Collected', value: `₹${totalCollected.toLocaleString('en-IN')}`, trend: '+12.4%' },
      { label: 'Pending Fees', value: `₹${totalDue.toLocaleString('en-IN')}`, trend: '-4.3%' }
    ],
    students,
    teachers,
    fees,
    attendance,
    exams,
    notices,
    timetable
  });
});

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.get('/api/teachers', (req, res) => {
  res.json(teachers);
});

app.get('/api/fees', (req, res) => {
  res.json(fees);
});

app.get('/api/attendance', (req, res) => {
  res.json(attendance);
});

app.get('/api/exams', (req, res) => {
  res.json(exams);
});

app.get('/api/notices', (req, res) => {
  res.json(notices);
});

app.post('/api/students', (req, res) => {
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    className: req.body.className,
    section: req.body.section,
    rollNo: Number(req.body.rollNo),
    admNo: req.body.admNo,
    guardian: req.body.guardian,
    phone: req.body.phone,
    status: 'Active'
  };

  students.unshift(newStudent);
  res.status(201).json(newStudent);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`School ERP running on http://localhost:${PORT}`);
});
