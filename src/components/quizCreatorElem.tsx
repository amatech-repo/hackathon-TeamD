import React, { useState } from "react";

type Option = {
  text: string;
  isCorrect: boolean;
};

type Quiz = {
  question: string;
  options: Option[];
};

type QuizComponentProps = {
  quiz: Quiz;
  onUpdate: (updatedQuiz: Quiz) => void;
};

function QuizComponent({ quiz, onUpdate }: QuizComponentProps) {
  const [question, setQuestion] = useState(quiz.question);
  const [options, setOptions] = useState(quiz.options);

  const handleAddOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, text: value } : option,
    );
    setOptions(updatedOptions);
    onUpdate({ question, options: updatedOptions });
  };

  const handleCorrectChange = (index: number) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setOptions(updatedOptions);
    onUpdate({ question, options: updatedOptions });
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 border rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          質問内容:
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => {
            const newQuestion = e.target.value;
            setQuestion(newQuestion);
            onUpdate({ question: newQuestion, options });
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="日本の首都は？"
        />
      </div>
      <div>
        <h4 className="font-medium mb-2">選択肢:</h4>
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center mb-2 bg-white p-2 rounded shadow-sm"
          >
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-grow px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`選択肢${index + 1}`}
            />

            <input
              type="radio"
              name={`correctOption-${quiz.question}`}
              checked={option.isCorrect}
              onChange={() => handleCorrectChange(index)}
              className="ml-4"
            />
            <label className="ml-2 text-sm text-gray-700">正解</label>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          選択肢を追加
        </button>
      </div>
    </div>
  );
}

export default QuizComponent;
