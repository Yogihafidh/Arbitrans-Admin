import ButtonIcon from "./ButtonIcon";
import { useFormContext } from "react-hook-form";

function Form({ children, onSubmit, className = "" }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`h-[90vh] max-h-[95vh] overflow-y-auto rounded-2xl bg-white py-6 shadow-md ${className}`}
    >
      {children}
    </form>
  );
}

function FormHeader({ formName, onClose }) {
  return (
    <div className="border-netral-400 flex items-center justify-between border-b px-8 py-4">
      <h2 className="text-2xl font-semibold">{formName}</h2>
      <ButtonIcon
        onEvent={onClose}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1665 12.008L20.762 4.43822C21.0793 4.11791 21.0793 3.599 20.762 3.27868C20.4503 2.95264 19.9355 2.94285 19.6118 3.2568L12.0163 10.8266L4.51839 3.2568C4.36467 3.09288 4.15078 3 3.92702 3C3.70327 3 3.48938 3.09288 3.33566 3.2568C3.0543 3.56628 3.0543 4.04123 3.33566 4.35071L10.8335 11.9096L3.238 19.4685C2.92067 19.7888 2.92067 20.3077 3.238 20.628C3.38907 20.784 3.59685 20.871 3.81309 20.8687C4.03351 20.8867 4.25202 20.8159 4.42074 20.6718L12.0163 13.102L19.6118 20.7593C19.7629 20.9153 19.9707 21.0022 20.1869 21C20.4029 21.001 20.6102 20.9142 20.762 20.7593C21.0793 20.439 21.0793 19.9201 20.762 19.5998L13.1665 12.008Z"
              fill="#212529"
            />
          </svg>
        }
      />
    </div>
  );
}

function FormBody({ children }) {
  return <section className="px-8 py-8">{children}</section>;
}

function FormRow({ label, name, children }) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="mb-4 flex flex-col gap-1">
      {label && (
        <label className="text-netral-900 text-sm font-medium" htmlFor={name}>
          {label}
        </label>
      )}

      {children}

      {error && <span className="text-acent-red text-sm">{error}</span>}
    </div>
  );
}

function FormFooter({ children }) {
  return (
    <div className="flex h-fit justify-end gap-2 px-8 pt-6 shadow-[0px_-4px_12px_rgba(0,0,0,0.05)]">
      {children}
    </div>
  );
}

Form.Header = FormHeader;
Form.Body = FormBody;
Form.Row = FormRow;
Form.Footer = FormFooter;

export default Form;
