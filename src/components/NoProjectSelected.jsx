import image from "../assets/no-projects.png";
import Button from "./Button";
export default function NoProjectSelected({onStartAddProject}) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={image}
        alt="No Project Selected"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4 text-te0">
        No Project Selected
      </h2>
      <p className="text-stone-500 mb-4">
        Please select a project from the sidebar or create a new one.
      </p>
      <p className="mt-4">
        <Button onClick={onStartAddProject}>Create New Project</Button>
      </p>
    </div>
  );
}
