import { useRef } from "react";
import Tasks from "./Tasks";
import Modal from "./Modal";

export default function SelectedProject({ project, onDelete, onAddTask, onDeleteTask, tasks }) {
  const modal = useRef();
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleDelete() {
    modal.current.open();
  }

  function confirmDelete() {
    onDelete();
  }
  return (
    <>
      <Modal ref={modal} buttonCaption="">
        <h2 className="text-xl font-bold text-stone-700 my-4">Delete Project</h2>
        <p className="text-stone-600 mb-4">Are you sure you want to delete "{project.title}"?</p>
        <p className="text-stone-600 mb-4">This will also delete all associated tasks.</p>
        <div className="flex justify-between items-center mt-4">
          <button 
            className="px-4 py-2 bg-stone-500 text-white rounded hover:bg-stone-600"
            onClick={() => modal.current.close()}
          >
            Cancel
          </button>
          <button 
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
      <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button className="text-stone-600 hover:text-stone-950" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
        <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks}/>
      </div>
    </>
  );
}
