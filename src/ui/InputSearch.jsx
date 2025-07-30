import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function InputSearch({ icon, placeholder }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce effect to update the search query in the URL
  useEffect(() => {
    const debounce = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";
      const newParams = new URLSearchParams(searchParams.toString());

      if (searchQuery === "") {
        newParams.delete("search");
      } else if (currentSearch !== searchQuery) {
        newParams.set("search", searchQuery);
      }

      setSearchParams(newParams);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, searchParams, setSearchParams]);

  return (
    <div
      className={`border-netral-400 focus-within:border-netral-800 flex w-fit items-center gap-2 rounded-lg border-2 px-4 py-2`}
    >
      {icon && <span>{icon}</span>}
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder={placeholder}
        className={`placeholder:text-netral-600 w-60 border-none bg-transparent font-medium outline-none placeholder:text-sm`}
      />
    </div>
  );
}

export default InputSearch;
