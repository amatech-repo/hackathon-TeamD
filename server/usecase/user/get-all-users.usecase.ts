import { UserEntity } from "@server/domain/entity/user.entity";
import { IUserRepository } from "@server/domain/interface/repository/user.repository.interface";
import { UserRepository } from "@server/infra/repository/user.repository";
import { Context } from "hono";

export async function GetAllUsersUseCase(c: Context): Promise<UserEntity[]> {
  const userRepository: IUserRepository = new UserRepository();
  await userRepository.initPrisma(c);
  const users = await userRepository.getUsers();
  return users;
}
