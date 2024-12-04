"use client";

import { useParams } from "next/navigation";

export default function QuizePage() {
  const params = useParams<{ quizId: string }>();
  return <div>Quiz {params.quizId}</div>;
}
