* {
  box-sizing: border-box;
}

:root {
  --bg: #f3f7ff;
  --panel: #ffffff;
  --panel-strong: #eef4ff;
  --primary: #2563eb;
  --primary-soft: #dfeaff;
  --secondary: #0f172a;
  --text: #1f2937;
  --muted: #6b7280;
  --success: #16a34a;
  --warning: #f59e0b;
  --danger: #ef4444;
  --border: #e5e7eb;
  --shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #eff6ff, #f8fafc);
  color: var(--text);
}

button, input {
  font-family: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: #0f172a;
  color: white;
  padding: 24px 20px;
}

.brand-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 34px;
}

.brand-mark {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, #60a5fa, #2563eb);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 1.5rem;
}

.brand-box h1 {
  margin: 0;
  font-size: 1.5rem;
}

.eyebrow {
  margin: 0 0 4px;
  opacity: 0.7;
  text-transform: uppercase;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
}

.nav {
  display: grid;
  gap: 10px;
}

.nav-item {
  padding: 12px 14px;
  border-radius: 12px;
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s ease;
}

.nav-item.active,
.nav-item:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
}

.sidebar-card {
  margin-top: 28px;
  padding: 16px;
  background: rgba(148, 163, 184, 0.12);
  border-radius: 16px;
  display: grid;
  gap: 8px;
}

.small-label {
  font-size: 0.7rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.main-content {
  padding: 28px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.topbar h2 {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.3rem);
}

.topbar-actions {
  display: flex;
  gap: 12px;
}

.primary-btn,
.outline-btn,
.link-btn,
.close-btn {
  border: none;
  border-radius: 12px;
  padding: 11px 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary), #3b82f6);
  color: white;
  box-shadow: var(--shadow);
}

.primary-btn:hover {
  transform: translateY(-1px);
}

.outline-btn {
  background: white;
  border: 1px solid var(--border);
  color: var(--secondary);
}

.link-btn {
  background: var(--primary-soft);
  color: var(--primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr));
  gap: 18px;
  margin-bottom: 22px;
}

.stat-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px;
  box-shadow: var(--shadow);
}

.stat-label {
  font-size: 0.76rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.stat-value {
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 800;
  margin: 12px 0 8px;
}

.stat-trend {
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--success);
}

.content-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 22px;
  margin-bottom: 22px;
}

.lower-grid {
  grid-template-columns: 1fr 1fr;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
  box-shadow: var(--shadow);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 14px 12px;
  border-bottom: 1px solid var(--border);
}

th {
  color: var(--muted);
  font-size: 0.76rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

tbody tr:last-child td {
  border-bottom: none;
}

.status-pill {
  display: inline-block;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.72rem;
  font-weight: 700;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-paid {
  background: #dbeafe;
  color: #1d4ed8;
}

.stack-list {
  display: grid;
  gap: 14px;
}

.metric-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.metric-row:last-child {
  border-bottom: none;
}

.progress-line {
  position: relative;
  margin-top: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--panel-strong);
  overflow: hidden;
}

.progress-line span {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--primary), #60a5fa);
}

.teacher-list {
  display: grid;
  gap: 14px;
}

.teacher-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 12px 14px;
  background: #f8fbff;
}

.teacher-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #bfdbfe, #60a5fa);
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #0f172a;
}

.teacher-item small {
  color: var(--muted);
}

.notice-tag {
  display: inline-block;
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 0.7rem;
  font-weight: 700;
  background: #e0f2fe;
  color: #075985;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: grid;
  place-items: center;
  z-index: 10;
}

.hidden {
  display: none;
}

.modal-card {
  width: min(620px, calc(100vw - 32px));
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  width: 38px;
  height: 38px;
  background: #f3f4f6;
  font-size: 1.4rem;
  line-height: 1;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 14px;
  margin-top: 18px;
}

input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 0.95rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 18px;
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    padding-bottom: 12px;
  }

  .stats-grid,
  .content-grid,
  .lower-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    display: grid;
    gap: 12px;
  }
}
