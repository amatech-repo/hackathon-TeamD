import { UserEntity } from "@server/domain/entity/user.entity";
import { IUserRepository } from "@server/domain/interface/repository/user.repository.interface";
import { UserRepository } from "@server/infra/repository/user.repository";
import type { Context } from "hono";

export async function GetUserUseCase({
  c,
  userId,
}: {
  c: Context;
  userId: string;
}): Promise<UserEntity | null> {
  const userRepository: IUserRepository = new UserRepository();
  await userRepository.initPrisma(c);
  const user = await userRepository.getUser(userId);
  return user;
}
