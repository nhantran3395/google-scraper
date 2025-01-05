import { ChangeEvent } from "react";

type SearchBarProps = {
  executeSearch: (searchTerm: string) => void;
};

export default function KeywordSearchBar({ executeSearch }: SearchBarProps) {
  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    executeSearch(event.target.value);
  }

  return (
    <div className="relative flex flex-wrap items-stretch w-3/4 sm:w-1/4">
      <input
        type="search"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search keyword"
        aria-label="Search"
        aria-describedby="button-addon2"
        onChange={onInputChange}
      />
    </div>
  );
}
