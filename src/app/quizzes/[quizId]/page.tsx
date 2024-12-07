"use client";
import { useParams } from "next/navigation";

export default function QuizPage() {
  const params = useParams<{ quizId: string }>();
  return <div>Quiz {params.quizId}</div>;
}
