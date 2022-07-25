import { Repository } from "typeorm";

import dataSource from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create(data: ICreateUserDTO) {
    const user = this.repository.create(data);

    await this.repository.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string) {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }
}

export { UsersRepository };
