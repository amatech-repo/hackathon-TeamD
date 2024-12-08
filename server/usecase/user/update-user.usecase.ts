import { UserEntity } from "@server/domain/entity/user.entity";
import { IUserRepository } from "@server/domain/interface/repository/user.repository.interface";
import { UserRepository } from "@server/infra/repository/user.repository";
import { Context } from "hono";

export async function UpdateUserUseCase({
  c,
  userId,
  name,
}: {
  c: Context;
  userId: string;
  name: string;
}): Promise<UserEntity> {
  const userRepository: IUserRepository = new UserRepository();
  await userRepository.initPrisma(c);
  const user = await userRepository.updateUser({ userId, name });
  return user;
}
