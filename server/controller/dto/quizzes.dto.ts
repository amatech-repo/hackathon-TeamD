import { z } from "@hono/zod-openapi";
import { QuizEntity } from "@server/domain/entity/quiz.entity";

export class QuizzesDto {
  static quizzesSchema = z
    .object({
      id: z.string().uuid(),
      quizSetId: z.string().optional(),
      level: z.number().int(),
      creatorId: z.string(),
      isPublic: z.boolean(),
      createdAt: z.date(),
    })
    .array();
  static entityToDto(entity: QuizEntity[]): z.infer<typeof this.quizzesSchema> {
    return entity.map((quiz) => ({
      id: quiz.id,
      quizSetId: quiz.quizSetId,
      level: quiz.level,
      creatorId: quiz.creatorId,
      isPublic: quiz.isPublic,
      createdAt: quiz.createdAt,
    }));
  }
}

export class QuizDto {
  static quizSchema = z.object({
    id: z.string().uuid(),
    quizSetId: z.string().optional(),
    level: z.number().int(),
    creatorId: z.string(),
    isPublic: z.boolean(),
    createdAt: z.date(),
  });
  static entityToDto(entity: QuizEntity): z.infer<typeof this.quizSchema> {
    return {
      id: entity.id,
      quizSetId: entity.quizSetId,
      level: entity.level,
      creatorId: entity.creatorId,
      isPublic: entity.isPublic,
      createdAt: entity.createdAt,
    };
  }
}
