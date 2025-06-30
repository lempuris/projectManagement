export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-stone-600 text-white rounded-md hover:bg-stone-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}