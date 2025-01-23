"use client";
import React from "react";
import { MdOutlineSearch } from "react-icons/md";

type SearchBarProps = {
  placeholder: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChange }) => {
  return (
    <div className="">
      <label htmlFor="search">
        <div className="flex items-center ">
          <div className="border rounded-l-lg py-[10px] pl-4 border-r-0 text-gray-500">
            <MdOutlineSearch size={20} />
          </div>
          <input
            id="search"
            type="text"
            className="w-full border border-l-0 rounded-r-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </label>
    </div>
  );
};

export default SearchBar;
