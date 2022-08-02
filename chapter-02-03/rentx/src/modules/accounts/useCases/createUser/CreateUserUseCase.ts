import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ password, ...user }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email
    );

    if (userAlreadyExists) {
      throw new AppError("User already exists.");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({ ...user, password: passwordHash });
  }
}

export { CreateUserUseCase };
