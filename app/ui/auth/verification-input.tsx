import React, { useRef } from "react";

type VerificationCodeInputProps = {
  code: string[];
  length: number;
  onChange: (index: number, value: string) => void;
};

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  length,
  onChange,
  code,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (value.length > 1) return; // Allow only single digit
    if (!/^\d?$/.test(value)) return; // Only allow numeric input

    onChange(index, value);

    // Move to the next input if a value is entered
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      // Move to the previous input on Backspace
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={code[index]}
          className="w-12 h-12 text-xl font-semibold border border-gray-300 text-center rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
