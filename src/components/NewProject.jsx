import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";
import { use } from "react";

export default function NewProject({ onAddProject, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    //validation

    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim() === 0 ||
      enteredDueDate.trim() === 0
    ) {
      modal.current.open();
      return;
    }

    onAddProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">Oops...looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please enter valid data in all fields.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950 hover:bg-stone-300 rounded-md px-6 py-2 bg-stone-500 text-stone-200"
              onClick={onCancel}>
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} label="Title" />
          <Input ref={description} type="text" label="Description" textArea />
          <Input ref={dueDate} type="date" label="Due Date" />
        </div>
      </div>
    </>
  );
}
