"use client";
import React from "react";
import { MdOutlineSearch } from "react-icons/md";

type SearchBarProps = {
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChange,
  value,
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor="search">
        <div className="flex items-center ">
          <div className="border rounded-l-lg py-[10px] pl-4 border-r-0 text-gray-500">
            <MdOutlineSearch size={20} />
          </div>
          <input
            id="search"
            className="w-full border border-l-0 rounded-r-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      </label>
    </div>
  );
};

export default SearchBar;
