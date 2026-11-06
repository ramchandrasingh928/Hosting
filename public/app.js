const $ = (selector) => document.querySelector(selector);
const elements = {
  stats: $('.stats-grid'),
  students: $('#studentTableBody'),
  attendance: $('#attendanceList'),
  fees: $('#feeList'),
  exams: $('#examList'),
  teachers: $('#teacherList'),
  notices: $('#noticeList'),
  modal: $('#studentModal'),
  form: $('#studentForm'),
  message: $('#appMessage')
};
let dashboardData;

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function showMessage(message, isError = false) {
  elements.message.textContent = message;
  elements.message.classList.toggle('error', isError);
}

async function fetchDashboard() {
  try {
    const response = await fetch('/api/dashboard');
    if (!response.ok) throw new Error('Dashboard data could not be loaded.');
    dashboardData = await response.json();
    renderDashboard(dashboardData);
  } catch (error) {
    showMessage(error.message || 'Unable to connect to the server.', true);
  }
}

function renderDashboard(data) {
  elements.stats.innerHTML = data.stats.map((stat) => `
    <article class="stat-card"><div class="stat-label">${escapeHTML(stat.label)}</div>
      <div class="stat-value">${escapeHTML(stat.value)}</div><div class="stat-trend">${escapeHTML(stat.trend)}</div></article>`).join('');
  elements.students.innerHTML = data.students.map((student) => `
    <tr><td><strong>${escapeHTML(student.name)}</strong><small>${escapeHTML(student.admNo)}</small></td>
    <td>${escapeHTML(student.className)} · ${escapeHTML(student.section)}</td><td>${escapeHTML(student.rollNo)}</td>
    <td>${escapeHTML(student.guardian)}</td><td><span class="status-pill ${student.status === 'Active' ? 'status-active' : 'status-pending'}">${escapeHTML(student.status)}</span></td></tr>`).join('');
  elements.attendance.innerHTML = data.attendance.map((item) => `
    <div class="metric-row"><div class="metric-main"><strong>${escapeHTML(item.className)}</strong><div class="progress-line"><span style="width:${Math.max(0, Math.min(100, Number(item.percent) || 0))}%"></span></div></div>
    <div class="metric-end"><strong>${escapeHTML(item.percent)}%</strong><small>${escapeHTML(item.present)} present / ${escapeHTML(item.absent)} absent</small></div></div>`).join('');
  elements.fees.innerHTML = data.fees.map((item) => `
    <div class="metric-row"><div><strong>${escapeHTML(item.student)}</strong><small>${escapeHTML(item.className)}</small></div>
    <div class="metric-end"><strong>₹${Number(item.paid).toLocaleString('en-IN')}</strong><small>Due: ₹${Number(item.due).toLocaleString('en-IN')}</small>
    <span class="status-pill ${item.status === 'Paid' ? 'status-paid' : 'status-pending'}">${escapeHTML(item.status)}</span></div></div>`).join('');
  elements.exams.innerHTML = data.exams.map((exam) => `
    <div class="metric-row"><div><strong>${escapeHTML(exam.student)}</strong><small>${escapeHTML(exam.subject)}</small></div>
    <div class="metric-end"><strong>${escapeHTML(exam.marks)}/100</strong><small>${escapeHTML(exam.grade)}</small></div></div>`).join('');
  elements.teachers.innerHTML = data.teachers.map((teacher) => {
    const initials = teacher.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('');
    return `<article class="teacher-item"><div class="teacher-meta"><div class="avatar">${escapeHTML(initials)}</div><div><strong>${escapeHTML(teacher.name)}</strong><small>${escapeHTML(teacher.subject)}</small></div></div><div class="teacher-details"><small>${escapeHTML(teacher.grade)}</small><small>${escapeHTML(teacher.experience)}</small></div></article>`;
  }).join('');
  elements.notices.innerHTML = data.notices.map((notice) => `
    <div class="metric-row"><div><strong>${escapeHTML(notice.title)}</strong><small>${escapeHTML(notice.date)}</small></div><span class="notice-tag">${escapeHTML(notice.category)}</span></div>`).join('');
}

function openModal() {
  elements.modal.classList.remove('hidden');
  elements.modal.setAttribute('aria-hidden', 'false');
  elements.form.elements.name.focus();
}
function closeModal() {
  elements.modal.classList.add('hidden');
  elements.modal.setAttribute('aria-hidden', 'true');
  elements.form.reset();
}

$('#addStudentBtn').addEventListener('click', openModal);
$('#topAddStudentBtn').addEventListener('click', openModal);
$('#closeModalBtn').addEventListener('click', closeModal);
$('#cancelModalBtn').addEventListener('click', closeModal);
elements.modal.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-close-modal')) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !elements.modal.classList.contains('hidden')) closeModal();
});

elements.form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = elements.form.querySelector('[type="submit"]');
  submitButton.disabled = true;
  try {
    const payload = Object.fromEntries(new FormData(elements.form).entries());
    const response = await fetch('/api/students', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Student could not be saved.');
    closeModal();
    await fetchDashboard();
    showMessage('Student added successfully.');
  } catch (error) {
    showMessage(error.message || 'Student could not be saved.', true);
  } finally {
    submitButton.disabled = false;
  }
});

$('#exportBtn').addEventListener('click', () => {
  if (!dashboardData) return;
  const rows = [['Name', 'Admission No', 'Class', 'Section', 'Roll No', 'Guardian', 'Phone', 'Status'],
    ...dashboardData.students.map((student) => [student.name, student.admNo, student.className, student.section, student.rollNo, student.guardian, student.phone, student.status])];
  const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'school-students.csv';
  link.click();
  URL.revokeObjectURL(url);
});

fetchDashboard();
