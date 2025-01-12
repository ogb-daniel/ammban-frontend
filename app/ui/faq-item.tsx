"use client";
import React, { useState } from "react";
interface IFaqItem {
  question: string;
  answer: string;
}
const FAQItem = ({ question, answer }: IFaqItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 focus:outline-none"
      >
        {question}
        <span
          className={`ml-4 text-blue-500 transform ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </>
  );
};

export default FAQItem;
