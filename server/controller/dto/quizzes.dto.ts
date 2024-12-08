import { z } from "@hono/zod-openapi";
import { AnswerOptionEntity } from "@server/domain/entity/answer-option.entity";
import { QuestionEntity } from "@server/domain/entity/question.entity";
import { QuizEntity } from "@server/domain/entity/quiz.entity";

export class QuizDto {
  static quizSchema = z.object({
    id: z.string().uuid(),
    level: z.number().int(),
    title: z.string(),
    options: z.array(
      z.object({
        id: z.string().uuid(),
        option: z.string(),
      }),
    ),
  });
  static entityToDto({
    quiz,
    question,
    answerOptions,
  }: {
    quiz: QuizEntity;
    question: QuestionEntity;
    answerOptions: AnswerOptionEntity[];
  }): z.infer<typeof this.quizSchema> {
    return {
      id: quiz.id,
      level: quiz.level,
      title: question.question,
      options: answerOptions.map((option) => ({
        id: option.id,
        option: option.option,
      })),
    };
  }
}

export class QuizzesDto {
  static quizzesSchema = z.array(
    z.object({
      id: z.string().uuid(),
      level: z.number().int(),
      title: z.string(),
    }),
  );
  static entityToDto(
    quizzes: { quiz: QuizEntity; question: QuestionEntity }[],
  ): z.infer<typeof this.quizzesSchema> {
    return quizzes.map(({ quiz, question }) => ({
      id: quiz.id,
      level: quiz.level,
      title: question.question,
    }));
  }
}

export class UpdateQuizDto {}
