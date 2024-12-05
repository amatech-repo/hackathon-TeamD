import { PrismaClient, type User } from "@prisma/client";
import { UserEntity } from "@server/domain/entity/user.entity";
import type { IUserRepository } from "@server/domain/interface/repository/user.repository.interface";
import { HTTPException } from "hono/http-exception";
import { DBAbstract } from "./db.abstract.repository";

export class UserRepository extends DBAbstract implements IUserRepository {
  prisma: PrismaClient | null = null;

  async createUser({
    email,
    name,
  }: {
    email: string;
    name: string;
  }): Promise<UserEntity> {
    try {
      if (!this.prisma || !(this.prisma instanceof PrismaClient)) {
        console.error("prisma is null or not instance of PrismaClient");

        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      return UserRepository.toEntity(
        await this.prisma.user.create({
          data: {
            email,
            name,
          },
        }),
      );
    } catch (e) {
      console.error("error at createUser", e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }

  async getUsers(): Promise<UserEntity[]> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      return (await this.prisma.user.findMany()).map((user) =>
        UserRepository.toEntity(user),
      );
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }

  async getUser(userId: string): Promise<UserEntity | null> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return null;
      }
      return UserRepository.toEntity(user);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return null;
      }
      return UserRepository.toEntity(user);
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async updateUser({
    userId,
    name,
  }: {
    userId: string;
    name: string;
  }): Promise<UserEntity> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      return UserRepository.toEntity(
        await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name,
          },
        }),
      );
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }
  async deleteUser(userId: string): Promise<void> {
    try {
      if (!this.prisma) {
        throw new HTTPException(500, {
          message: "Internal Server Error ",
        });
      }
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HTTPException(500, {
        message: "Internal Server Error ",
      });
    }
  }

  static toEntity(user: User): UserEntity {
    return new UserEntity({
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      name: user.name,
      id: user.id,
      email: user.email,
    });
  }
}
