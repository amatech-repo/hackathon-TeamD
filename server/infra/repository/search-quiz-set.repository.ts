import { PrismaClient, QuizSet, Tag } from "@prisma/client";
import { DBAbstract } from "./db.abstract.repository";
import { HTTPException } from "hono/http-exception";
import { ISearchQuizSetRepository } from "@server/domain/interface/repository/search-quiz-set.repository.interface";
import { SearchQuizSetEntity } from "@server/domain/entity/search-quiz-set.entity";

export class SearchQuizSetRepository
  extends DBAbstract
  implements ISearchQuizSetRepository
{
  prisma: PrismaClient | null = null;

  async search({
    search,
    level,
    tag,
  }: {
    search?: string;
    tag?: string;
    level?: number;
  }): Promise<SearchQuizSetEntity[]> {
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
      if (tag) {
        whereCondition.quizSetTag = {
          some: {
            tagId: tag,
          },
        };
      }
      if (search) {
        whereCondition.OR = [
          { title: { contains: search } },
          { description: { contains: search } },
        ];
      }
      if (!level && !tag && !search) {
        return [];
      }
      const searched = await this.prisma.quizSet.findMany({
        where: whereCondition,
        include: {
          quizSetTag: {
            include: {
              tag: true,
            },
          },
        },
      });
      return searched.map((searched) => {
        const quizSet = searched;
        const tags = quizSet.quizSetTag.map((quizSetTag) => quizSetTag.tag);
        return SearchQuizSetRepository.toEntity({
          quizSet,
          tags,
        });
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  static toEntity({
    quizSet,
    tags,
  }: {
    quizSet: QuizSet;
    tags: Tag[];
  }): SearchQuizSetEntity {
    return new SearchQuizSetEntity({
      quizsetId: quizSet.id,
      title: quizSet.title,
      description: quizSet.description ?? null,
      level: quizSet.level,
      tags: tags.map((tag) => {
        return { name: tag.name, id: tag.id };
      }),
    });
  }
}
