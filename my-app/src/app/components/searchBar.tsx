import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  return (
    <div
      className={`relative flex items-center bg-white/50 backdrop-blur-lg border border-orange/60 rounded-full shadow-md px-6 w-full max-w-lg transition-all  ${className}`}
    >
      <FiSearch className="text-gray-600 text-center absolute left-10" />
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full p-3 pl-12 bg-transparent text-gray-800 placeholder-gray-500 outline-none rounded-full focus:ring-0"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
