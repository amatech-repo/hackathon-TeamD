import React from "react";

interface IQuizProps {
  questionData: {
    question: string;
    options: { text: string; isCorrect: boolean }[];
  };
  onAnswer: (isCorrect: boolean) => void;
}

export default function Quiz({ questionData, onAnswer }: IQuizProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {questionData.question}
      </h2>
      <div className="flex flex-col gap-4">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.isCorrect)}
            className="p-3 text-left bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
