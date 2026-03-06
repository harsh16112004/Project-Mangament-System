const state = JSON.parse(localStorage.getItem('pmsData') || '{}');
state.users ||= [];
state.projects ||= [];
state.tasks ||= [];
state.comments ||= [];
state.notifications ||= [];
state.timeEntries ||= [];
state.resources ||= [];
state.risks ||= [];

const byId = (id) => document.getElementById(id);

function save() {
  localStorage.setItem('pmsData', JSON.stringify(state));
}

function notify(message) {
  state.notifications.unshift({ message, at: new Date().toLocaleString() });
  state.notifications = state.notifications.slice(0, 20);
  save();
  renderNotifications();
}

function renderList(id, data, formatter) {
  byId(id).innerHTML = data.map(formatter).join('');
}

function renderUsers() {
  renderList('usersList', state.users, (u) => `<li><strong>${u.name}</strong> (${u.role})<br>${u.email}</li>`);
}

function renderProjects() {
  renderList('projectsList', state.projects, (p) =>
    `<li><strong>${p.title}</strong><br>${p.description}<br>Manager: ${p.manager}<br>${p.startDate} → ${p.endDate}</li>`);
}

function renderTasks() {
  renderList('tasksList', state.tasks, (t) =>
    `<li><strong>${t.name}</strong> | ${t.status}<br>Assignee: ${t.assignee} | ${t.priority}<br>Deadline: ${t.deadline}</li>`);
}

function renderComments() {
  renderList('commentsList', state.comments, (c) => `<li><strong>${c.author}</strong>: ${c.message}</li>`);
}

function renderNotifications() {
  renderList('notificationList', state.notifications, (n) => `<li>${n.message}<br><small>${n.at}</small></li>`);
}

function renderTime() {
  renderList('timeList', state.timeEntries, (t) => `<li>${t.member} logged ${t.hours}h on ${t.task}</li>`);
}

function renderResources() {
  renderList('resourceList', state.resources, (r) => `<li>${r.resource} → ${r.project} (${r.allocation}%)</li>`);
}

function renderRisks() {
  renderList('riskList', state.risks, (r) => `<li><strong>${r.risk}</strong> [${r.impact}]<br>${r.mitigation}</li>`);
}

function renderProgress() {
  const total = state.tasks.length;
  const done = state.tasks.filter((t) => t.status === 'Done').length;
  const progress = total ? Math.round((done / total) * 100) : 0;

  byId('progressSummary').textContent = `${done}/${total} tasks completed (${progress}%)`;
  byId('progressBar').style.width = `${progress}%`;
}

function renderDashboard() {
  const stats = [
    `Users: ${state.users.length}`,
    `Projects: ${state.projects.length}`,
    `Tasks: ${state.tasks.length}`,
    `Messages: ${state.comments.length}`,
    `Time Logs: ${state.timeEntries.length}`,
    `Resources: ${state.resources.length}`,
    `Risks: ${state.risks.length}`,
  ];

  byId('dashboardStats').innerHTML = `<ul>${stats.map((s) => `<li>${s}</li>`).join('')}</ul>`;
}


function loadDemoData() {
  state.users = [
    { name: 'Alice Admin', email: 'alice@pms.dev', password: 'demo123', role: 'Admin' },
    { name: 'Mark Manager', email: 'mark@pms.dev', password: 'demo123', role: 'Manager' },
    { name: 'Tina Member', email: 'tina@pms.dev', password: 'demo123', role: 'Team Member' },
  ];

  state.projects = [
    {
      title: 'Website Revamp',
      description: 'Rebuild marketing site and improve performance.',
      manager: 'Mark Manager',
      startDate: '2026-04-01',
      endDate: '2026-06-30',
    },
  ];

  state.tasks = [
    { name: 'Design homepage', assignee: 'Tina Member', deadline: '2026-04-15', priority: 'High', status: 'Done' },
    { name: 'Build dashboard', assignee: 'Tina Member', deadline: '2026-04-30', priority: 'Medium', status: 'In Progress' },
  ];

  state.comments = [
    { author: 'Mark Manager', message: 'Please share daily updates in this thread.' },
  ];

  state.timeEntries = [
    { member: 'Tina Member', task: 'Design homepage', hours: '6.5' },
  ];

  state.resources = [
    { resource: 'UI Designer', project: 'Website Revamp', allocation: '60' },
  ];

  state.risks = [
    { risk: 'Delayed API integration', impact: 'Medium', mitigation: 'Plan mock API and early backend sync.' },
  ];

  state.notifications = [{ message: 'Demo preview data loaded', at: new Date().toLocaleString() }];

  save();
  renderAll();
}

function bindForms() {
  byId('loadDemo').addEventListener('click', loadDemoData);

  byId('userForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    state.users.push(data);
    save();
    renderUsers();
    notify(`New user registered: ${data.name}`);
    e.target.reset();
  });

  byId('projectForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    state.projects.push(data);
    save();
    renderProjects();
    renderDashboard();
    notify(`Project created: ${data.title}`);
    e.target.reset();
  });

  byId('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    state.tasks.push(data);
    save();
    renderTasks();
    renderProgress();
    renderDashboard();
    notify(`Task assigned: ${data.name} → ${data.assignee}`);
    e.target.reset();
  });

  byId('commentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    state.comments.push(data);
    save();
    renderComments();
    renderDashboard();
    notify(`New collaboration message from ${data.author}`);
    e.target.reset();
  });

  byId('timeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    state.timeEntries.push(data);
    save();
    renderTime();
    renderDashboard();
    notify(`Time logged by ${data.member}`);
    e.target.reset();
  });

  byId('resourceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    state.resources.push(data);
    save();
    renderResources();
    renderDashboard();
    notify(`Resource allocated: ${data.resource}`);
    e.target.reset();
  });

  byId('riskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    state.risks.push(data);
    save();
    renderRisks();
    renderDashboard();
    notify(`Risk added: ${data.risk}`);
    e.target.reset();
  });

  byId('generateReport').addEventListener('click', () => {
    const report = {
      generatedAt: new Date().toISOString(),
      projects: state.projects,
      tasks: state.tasks,
      teamProductivity: {
        totalUsers: state.users.length,
        completedTasks: state.tasks.filter((t) => t.status === 'Done').length,
        timeLoggedHours: state.timeEntries.reduce((sum, item) => sum + Number(item.hours), 0),
      },
    };

    byId('reportOutput').textContent = JSON.stringify(report, null, 2);
    notify('Report generated successfully');
  });

  byId('clearAll').addEventListener('click', () => {
    Object.keys(state).forEach((k) => state[k] = []);
    save();
    renderAll();
    notify('Admin cleared all system records');
  });
}

function renderAll() {
  renderUsers();
  renderProjects();
  renderTasks();
  renderComments();
  renderNotifications();
  renderTime();
  renderResources();
  renderRisks();
  renderProgress();
  renderDashboard();
}

bindForms();
renderAll();
