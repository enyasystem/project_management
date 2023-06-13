const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Sample data
let projects = [
  { id: 1, name: 'Project 1', status: 'In Progress' },
  { id: 2, name: 'Project 2', status: 'Completed' },
  { id: 3, name: 'Project 3', status: 'Pending' }
];

let tasks = [
  { id: 1, projectId: 1, name: 'Task 1', priority: 'High' },
  { id: 2, projectId: 2, name: 'Task 2', priority: 'Medium' },
  { id: 3, projectId: 3, name: 'Task 3', priority: 'Low' }
];

// Get all projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Get a single project by ID
app.get('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    res.status(404).json({ error: 'Project not found' });
  } else {
    res.json(project);
  }
});

// Create a new project
app.post('/api/projects', (req, res) => {
  const { name, status } = req.body;
  const newProject = { id: projects.length + 1, name, status };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// Update a project
app.put('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const { name, status } = req.body;
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    res.status(404).json({ error: 'Project not found' });
  } else {
    project.name = name || project.name;
    project.status = status || project.status;
    res.json(project);
  }
});

// Delete a project
app.delete('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const projectIndex = projects.findIndex(p => p.id === projectId);

  if (projectIndex === -1) {
    res.status(404).json({ error: 'Project not found' });
  } else {
    projects.splice(projectIndex, 1);
    res.sendStatus(204);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
