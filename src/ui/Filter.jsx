import { memo } from "react";
import { useSearchParams } from "react-router";

function Filter({ options, type, className = "", close }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || options?.[0]?.value;

  function handleFilterChange(value) {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  }

  if (type === "button-filter")
    return (
      <div
        className={`border-outline divide-outline flex divide-x-1 overflow-hidden rounded-md border ${className}`}
      >
        {options?.map((option) => (
          <button
            className="cursor-pointer bg-none px-4 py-2 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:text-black"
            key={option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    );

  if (type === "list")
    return (
      <ul
        className={`border-netral-600 top-2 flex flex-col gap-2 rounded-lg border-2 px-4 py-4 ${className}`}
      >
        {options?.map((option) => (
          <li
            className={`hover:bg-netral-200 cursor-pointer rounded-md px-6 py-2 ${
              currentStatus === option.value ? "bg-gray-200 font-semibold" : ""
            }`}
            key={option.value}
            onClick={() => {
              handleFilterChange(option.value);
              close(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    );
}

export default memo(Filter);
