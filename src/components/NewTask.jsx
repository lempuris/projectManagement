import { useState, useRef } from "react";
import Modal from "./Modal";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");
  const [showError, setShowError] = useState(false);
  const errorModalRef = useRef();

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      setShowError(true);
      errorModalRef.current?.open();
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
  }
  return (
    <>
      {showError && (
        <Modal ref={errorModalRef} buttonCaption="Okay">
          <p className="text-red-600 font-bold">Task cannot be empty!</p>
          <p className="text-stone-600">Please enter a task before adding.</p>
          <form method="dialog" onSubmit={() => setShowError(false)} />
        </Modal>
      )}
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-300"
          onChange={handleChange}
          value={enteredTask}
        />
        <button
          className="text-stone-700 hover:text-stone-950 hover:bg-stone-400"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </>
  );
}
