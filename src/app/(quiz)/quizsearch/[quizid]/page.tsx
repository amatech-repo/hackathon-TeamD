"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

const questionsData: Record<string, Question[]> = {
  "1": [
    {
      id: "1",
      question: "2 + 2 = ?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      id: "2",
      question: "5 * 2 = ?",
      options: ["10", "20", "15", "25"],
      answer: "10",
    },
    {
      id: "3",
      question: "6 / 2 = ?",
      options: ["1", "2", "3", "4"],
      answer: "3",
    },
  ],
  "2": [
    {
      id: "1",
      question: "徳川家康が江戸幕府を開いた年は？",
      options: ["1600", "1603", "1615", "1620"],
      answer: "1603",
    },
    {
      id: "2",
      question: "坂本龍馬が暗殺された年は？",
      options: ["1867", "1868", "1870", "1871"],
      answer: "1867",
    },
    {
      id: "3",
      question: "明治維新が始まった年は？",
      options: ["1868", "1870", "1875", "1880"],
      answer: "1868",
    },
  ],
  "3": [
    {
      id: "1",
      question: "水の化学式は？",
      options: ["H2O", "CO2", "O2", "N2"],
      answer: "H2O",
    },
    {
      id: "2",
      question: "地球の重力加速度は約何 m/s²？",
      options: ["8.9", "9.8", "10.2", "11.0"],
      answer: "9.8",
    },
    {
      id: "3",
      question: "太陽系で最大の惑星は？",
      options: ["地球", "火星", "木星", "土星"],
      answer: "木星",
    },
  ],
};

export default function QuizPage() {
  const { quizid } = useParams<{ quizid: string }>();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // クイズデータの取得
  const quizQuestions = questionsData[quizid] || [];

  // デバッグ用ログ
  useEffect(() => {
    console.log("quizid:", quizid);
    console.log("quizQuestions:", quizQuestions);
  }, [quizid]);

  if (!quizid || quizQuestions.length === 0) {
    return <p>指定されたクイズが見つかりません。URLを確認してください。</p>;
  }

  const currentQuestion = quizQuestions[currentIndex];

  const handleAnswer = (option: string) => {
    if (option === currentQuestion.answer) {
      setFeedback("正解！");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("不正解！");
    }
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setFeedback(null);

      if (currentIndex < quizQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        router.push(
          `/quizsearch/result?score=${score + 1}&total=${quizQuestions.length}`,
        );
      }
    }, 1000); // 1秒後に次の問題に移る
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
        <ul className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleAnswer(option)}
                className="block w-full px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={showFeedback} // フィードバック中はボタンを無効化
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showFeedback && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-center">
          <p className="text-xl font-bold">{feedback}</p>
        </div>
      )}
    </div>
  );
}
