import { useState, useEffect } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
import { api } from "./services/api";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  useEffect(() => {
    api.getProjects().then(projects => {
      setProjectState(prev => ({ ...prev, projects }));
    });
  }, []);

  async function handleAddTask(text) {
    try {
      const newTask = await api.createTask({
        text,
        projectId: projectState.selectedProjectId
      });
      setProjectState(prev => ({
        ...prev,
        tasks: [...prev.tasks, newTask]
      }));
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }
  async function handleDeleteTask(id) {
    await api.deleteTask(id);
    setProjectState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id)
    }));
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  async function handleAddProject(projectData) {
    try {
      const newProject = await api.createProject(projectData);
      setProjectState(prev => ({
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject]
      }));
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  }
  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  async function handleSelectProject(id) {
    const tasks = await api.getTasks(id);
    setProjectState(prev => ({
      ...prev,
      selectedProjectId: id,
      tasks
    }));
  }

  async function handleDeleteProject() {
    await api.deleteProject(projectState.selectedProjectId);
    setProjectState(prev => ({
      ...prev,
      selectedProjectId: undefined,
      projects: prev.projects.filter(p => p.id !== projectState.selectedProjectId),
      tasks: []
    }));
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks.filter(task => task.projectId === projectState.selectedProjectId)}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8 bg-stone-200">
      <ProjectSideBar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
