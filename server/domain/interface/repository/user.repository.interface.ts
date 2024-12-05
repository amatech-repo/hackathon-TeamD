import type { UserEntity } from "@server/domain/entity/user.entity";
import type { IDbAbstract } from "./db.abstract.interface";

export interface IUserRepository extends IDbAbstract {
  getUser(userId: string): Promise<UserEntity | null>;
  getUsers(): Promise<UserEntity[]>;
  getUserByEmail(email: string): Promise<UserEntity | null>;
  createUser({
    email,
    name,
  }: {
    email: string;
    name: string;
  }): Promise<UserEntity>;
  updateUser({
    userId,
    name,
  }: {
    userId: string;
    name: string;
  }): Promise<UserEntity>;
  deleteUser(userId: string): Promise<void>;
}
