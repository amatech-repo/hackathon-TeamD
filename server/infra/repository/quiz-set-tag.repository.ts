import { IQuizSetTagRepository } from "@server/domain/interface/repository/quiz-set-tag.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class QuizSetTagRepository
  extends DBAbstract
  implements IQuizSetTagRepository
{
  prisma: PrismaClient | null = null;
  async createOneQuizSetAndManyTags({
    quizSetId,
    tagIds,
  }: {
    quizSetId: string;
    tagIds: string[];
  }): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      this.prisma.quizSetTag.createMany({
        data: tagIds.map((tagId) => ({
          quizSetId,
          tagId: tagId,
        })),
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
}
