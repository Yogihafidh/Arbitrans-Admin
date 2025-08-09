import { useFormContext } from "react-hook-form";

function TextArea({ icon, placeholder, rows = 4, ...props }) {
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = !!errors?.[props.name];
  return (
    <div
      className={`focus-within:border-netral-900 flex w-full gap-2 rounded-lg border-2 px-4 py-2 ${hasError ? "border-acent-red border-2" : "border-netral-400"}`}
    >
      {icon && <span>{icon}</span>}
      <textarea
        {...props}
        placeholder={placeholder}
        rows={rows}
        className={`placeholder:text-netral-600 w-full resize-none border-none bg-transparent font-medium outline-none placeholder:text-sm`}
      ></textarea>
    </div>
  );
}

export default TextArea;
