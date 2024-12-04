import { useParams } from "next/navigation";

export function QuizePage() {
  const params = useParams<{ quizId: string }>();
  return <div>Quiz {params.quizId}</div>;
}
