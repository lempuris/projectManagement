const API_BASE = 'http://localhost:3001/api';

export const api = {
  // Projects
  getProjects: () => fetch(`${API_BASE}/projects`).then(res => res.json()),
  createProject: (project) => fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  }).then(res => res.json()),
  deleteProject: (id) => fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' }),

  // Tasks
  getTasks: (projectId) => fetch(`${API_BASE}/tasks?projectId=${projectId}`).then(res => res.json()),
  createTask: (task) => fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(res => res.json()),
  deleteTask: (id) => fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' })
};