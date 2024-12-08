import { z } from "@hono/zod-openapi";
import { UserQuizAttemptEntity } from "@server/domain/entity/user-quiz-attempt.entity";

export class QuizAttemptDto {
  static quizAttemptSchema = z.object({
    userId: z.string(),
    userQuizSetAttemptId: z.string().nullable().optional(),
    quizId: z.string(),
    lastSelectedAnswerOptionId: z.string().nullable(),
    isCorrect: z.boolean(),
  });
  static entityToDto(
    entity: UserQuizAttemptEntity,
  ): z.infer<typeof this.quizAttemptSchema> {
    return {
      userId: entity.userId,
      userQuizSetAttemptId: entity.userQuizSetAttemptId,
      lastSelectedAnswerOptionId: entity.lastSelectedAnswerOptionId ?? null,
      isCorrect: entity.isCompleted,
      quizId: entity.quizId,
    };
  }
}
