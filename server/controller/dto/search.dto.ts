import { z } from "@hono/zod-openapi";
import { SearchQuizSetEntity } from "@server/domain/entity/search-quiz-set.entity";
import { SearchQuizEntity } from "@server/domain/entity/search-quiz.entity";

export class SearchQuizQueryDto {
  static searchQuizSchema = z.object({
    search_quiz: z
      .string()
      .nullable()
      .optional()
      .openapi({
        param: {
          name: "search_quiz",
          in: "query",
        },
        example: "マイナンバー",
      }),
    level_query: z
      .string()
      .nullable()
      .optional()
      .openapi({
        param: {
          name: "level_query",
          in: "query",
        },
        example: "1",
      }),
  });
}

export class SearchQuizSetQueryDto {
  static searchQuizSetSchema = z.object({
    search_quiz_set: z
      .string()
      .nullable()
      .optional()
      .openapi({
        param: {
          name: "search_quiz_set",
          in: "query",
        },
        example: "税金",
      }),
    tag_query: z
      .string()
      .nullable()
      .optional()
      .openapi({
        param: {
          name: "tag_query",
          in: "query",
        },
        example: "税金",
      }),
    level_query: z
      .string()
      .nullable()
      .optional()
      .openapi({
        param: {
          name: "level_query",
          in: "query",
        },
        example: "1",
      }),
  });
}

export class SearchQuizSetResponseDto {
  static searchQuizSetResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullable(),
    level: z.number(),
    tags: z.array(z.object({ name: z.string(), id: z.string().uuid() })),
  });
  static toDto(entity: SearchQuizSetEntity) {
    return {
      id: entity.quizsetId,
      title: entity.title,
      description: entity.description,
      level: entity.level,
      tags: entity.tags,
    };
  }
  static toDtos(
    entities: SearchQuizSetEntity[],
  ): z.infer<typeof this.searchQuizSetResponseSchema>[] {
    return entities.map(this.toDto);
  }
}
export class SearchQuizResponseDto {
  static searchQuizResponseSchema = z.object({
    title: z.string(),
    id: z.string().uuid(),
    level: z.number().int(),
  });
  static toDto(entity: SearchQuizEntity) {
    return {
      title: entity.title,
      id: entity.quizId,
      level: entity.level,
    };
  }
  static toDtos(
    entities: SearchQuizEntity[],
  ): z.infer<typeof this.searchQuizResponseSchema>[] {
    return entities.map(this.toDto);
  }
}
