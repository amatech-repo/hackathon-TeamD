import { ITagRepository } from "@server/domain/interface/repository/tag.repository.interface";
import { DBAbstract } from "./db.abstract.repository";
import { TagEntity } from "@server/domain/entity/tag.entity";
import { PrismaClient, Tag } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export class TagRepository extends DBAbstract implements ITagRepository {
  prisma: PrismaClient | null = null;
  async getTag(id: string): Promise<TagEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const tag = await this.prisma.tag.findUnique({
        where: {
          id,
        },
      });
      if (!tag) {
        throw new HTTPException(404, { message: "Tag not found" });
      }
      return TagRepository.toEntity(tag);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getTags(): Promise<TagEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const tags = await this.prisma.tag.findMany();
      return tags.map(TagRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getTagsByQuizSetId(quizSetId: string): Promise<TagEntity[]> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const tags = await this.prisma.tag.findMany({
        where: {
          quizSetTag: {
            some: {
              quizSetId,
            },
          },
        },
      });
      return tags.map(TagRepository.toEntity);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async createTag({ name }: { name: string }): Promise<TagEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const tag = await this.prisma.tag.create({
        data: {
          name,
        },
      });
      return TagRepository.toEntity(tag);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateTag({
    id,
    name,
  }: {
    id: string;
    name: string;
  }): Promise<TagEntity | null> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const tag = await this.prisma.tag.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      if (!tag) {
        throw new HTTPException(404, { message: "Tag not found" });
      }
      return TagRepository.toEntity(tag);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteTag(id: string): Promise<void> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.tag.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  static toEntity(tag: Tag): TagEntity {
    return new TagEntity({
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    });
  }
}
