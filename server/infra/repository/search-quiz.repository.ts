import { PrismaClient, Question, Quiz } from "@prisma/client";
import { DBAbstract } from "./db.abstract.repository";
import { HTTPException } from "hono/http-exception";
import { SearchQuizEntity } from "@server/domain/entity/search-quiz.entity";
import { ISearchQuizRepository } from "@server/domain/interface/repository/search-quiz.repository.interface";

export class SearchQuizRepository
  extends DBAbstract
  implements ISearchQuizRepository
{
  prisma: PrismaClient | null = null;

  async search({
    search,
    level,
  }: {
    search?: string;
    level?: number;
  }): Promise<SearchQuizEntity[]> {
    if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
      console.error("prisma is null or not instance of PrismaClient");
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const whereCondition: any = {};
      if (level) {
        whereCondition.level = level;
      }
      if (search) {
        whereCondition.OR = [
          { title: { contains: search } },
          { description: { contains: search } },
        ];
      }
      if (!level && !search) {
        return [];
      }

      // quizとquestionのみ
      const quizzes = await this.prisma.quiz.findMany({
        where: whereCondition,
        include: {
          questions: true,
        },
      });
      const results: {
        quiz: Quiz;
        question: Question;
      }[] = quizzes.map((quiz) => ({
        quiz,
        question: quiz.questions[0],
      }));
      return results.map(SearchQuizRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }

  static toEntity({
    quiz,
    question,
  }: {
    quiz: Quiz;
    question: Question;
  }): SearchQuizEntity {
    return new SearchQuizEntity({
      quizId: quiz.id,
      title: question.question,
      level: quiz.level,
    });
  }
}
