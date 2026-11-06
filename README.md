const statsGrid = document.querySelector('.stats-grid');
const studentTableBody = document.getElementById('studentTableBody');
const attendanceList = document.getElementById('attendanceList');
const feeList = document.getElementById('feeList');
const examList = document.getElementById('examList');
const teacherList = document.getElementById('teacherList');
const noticeList = document.getElementById('noticeList');
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const addStudentBtn = document.getElementById('addStudentBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');

async function fetchDashboard() {
  const res = await fetch('/api/dashboard');
  const data = await res.json();
  renderStats(data.stats);
  renderStudents(data.students);
  renderAttendance(data.attendance);
  renderFees(data.fees);
  renderExams(data.exams);
  renderTeachers(data.teachers);
  renderNotices(data.notices);
}

function renderStats(stats) {
  statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <article class="stat-card">
          <div class="stat-label">${stat.label}</div>
          <div class="stat-value">${stat.value}</div>
          <div class="stat-trend">${stat.trend} this month</div>
        </article>
      `
    )
    .join('');
}

function renderStudents(students) {
  studentTableBody.innerHTML = students
    .map(
      (student) => `
        <tr>
          <td>${student.name}</td>
          <td>${student.className}</td>
          <td>${student.rollNo}</td>
          <td>${student.guardian}</td>
          <td>
            <span class="status-pill ${student.status === 'Active' ? 'status-active' : 'status-pending'}">${student.status}</span>
          </td>
        </tr>
      `
    )
    .join('');
}

function renderAttendance(attendance) {
  attendanceList.innerHTML = attendance
    .map(
      (entry) => `
        <div class="metric-row">
          <div>
            <strong>${entry.className}</strong>
            <div class="progress-line"><span style="width:${entry.percent}%"></span></div>
          </div>
          <div style="text-align:right;">
            <strong>${entry.percent}%</strong>
            <div>${entry.present} present / ${entry.absent} absent</div>
          </div>
        </div>
      `
    )
    .join('');
}

function renderFees(fees) {
  feeList.innerHTML = fees
    .map(
      (item) => `
        <div class="metric-row">
          <div>
            <strong>${item.student}</strong>
            <div>${item.className}</div>
          </div>
          <div style="text-align:right;">
            <strong>₹${item.paid.toLocaleString('en-IN')}</strong>
            <div>Due: ₹${item.due.toLocaleString('en-IN')}</div>
            <span class="status-pill ${item.status === 'Paid' ? 'status-paid' : 'status-pending'}">${item.status}</span>
          </div>
        </div>
      `
    )
    .join('');
}

function renderExams(exams) {
  examList.innerHTML = exams
    .map(
      (exam) => `
        <div class="metric-row">
          <div>
            <strong>${exam.student}</strong>
            <div>${exam.subject}</div>
          </div>
          <div style="text-align:right;">
            <strong>${exam.marks}/100</strong>
            <div>${exam.grade}</div>
          </div>
        </div>
      `
    )
    .join('');
}

function renderTeachers(teachers) {
  teacherList.innerHTML = teachers
    .map(
      (teacher) => `
        <div class="teacher-item">
          <div class="teacher-meta">
            <div class="avatar">${teacher.name.split(' ').map((part) => part[0]).slice(0,2).join('')}</div>
            <div>
              <strong>${teacher.name}</strong><br />
              <small>${teacher.subject}</small>
            </div>
          </div>
          <div>
            <small>${teacher.grade}</small><br />
            <small>${teacher.experience}</small>
          </div>
        </div>
      `
    )
    .join('');
}

function renderNotices(notices) {
  noticeList.innerHTML = notices
    .map(
      (notice) => `
        <div class="metric-row">
          <div>
            <strong>${notice.title}</strong>
            <div>${notice.date}</div>
          </div>
          <span class="notice-tag">${notice.category}</span>
        </div>
      `
    )
    .join('');
}

function openModal() {
  studentModal.classList.remove('hidden');
}

function closeModal() {
  studentModal.classList.add('hidden');
  studentForm.reset();
}

studentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(studentForm);
  const body = Object.fromEntries(formData.entries());

  const res = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    closeModal();
    fetchDashboard();
  }
});

addStudentBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);

fetchDashboard();


