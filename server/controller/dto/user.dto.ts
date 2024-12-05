import { z } from "@hono/zod-openapi";
import { UserEntity } from "@server/domain/entity/user.entity";

export class UserDto {
  static userSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
  });
  static entityToDto(entity: UserEntity): z.infer<typeof this.userSchema> {
    return { id: entity.id, name: entity.name };
  }
}

export class UsersDto {
  static usersSchema = z.array(UserDto.userSchema);
  static entityToDto(entities: UserEntity[]): z.infer<typeof this.usersSchema> {
    return entities.map((entity) => UserDto.entityToDto(entity));
  }
}

export class UserUpdateDto {
  static usersUpdateSchema = z.object({
    name: z.string(),
  });
  static entityToDto(
    entity: UserEntity,
  ): z.infer<typeof this.usersUpdateSchema> {
    return { name: entity.name };
  }
}

export class UserParamsDto {
  static userParamsSchema = z.object({
    id: z
      .string()
      .uuid()
      .openapi({
        param: {
          name: "id",
          in: "path",
        },
        example: "1212121",
      }),
  });
  static entityToDto(entity: {
    userId: string;
  }): z.infer<typeof this.userParamsSchema> {
    return { id: entity.userId };
  }
}
