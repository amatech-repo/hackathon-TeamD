import { IUserRepository } from "@server/domain/interface/repository/user.repository.interface";
import { UserRepository } from "@server/infra/repository/user.repository";
import { Context } from "hono";

export async function DeleteUserUseCase({
  userId,
  c,
}: {
  userId: string;
  c: Context;
}): Promise<void> {
  const userRepository: IUserRepository = new UserRepository();
  await userRepository.initPrisma(c);
  await userRepository.deleteUser(userId);
}
