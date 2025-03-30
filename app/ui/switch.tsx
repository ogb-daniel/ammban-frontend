import React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => {
  return (
    <button
      onClick={(e) => onCheckedChange(e)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        checked ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          checked ? "translate-x-6 lg:translate-x-4" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default Switch;
