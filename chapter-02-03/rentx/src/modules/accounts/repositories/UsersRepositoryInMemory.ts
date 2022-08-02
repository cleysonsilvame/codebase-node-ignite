import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO) {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);
  }
  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
