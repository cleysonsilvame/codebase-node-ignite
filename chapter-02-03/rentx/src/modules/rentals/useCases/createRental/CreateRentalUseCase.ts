import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest) {
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is already rented");
    }

    const rentalOpentToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpentToUser) {
      throw new AppError("User already has an open rental");
    }

    const compare = this.dateProvider.compareInHours(expected_return_date);

    console.log(compare);

    if (compare < minimumHour) {
      throw new AppError("Expected return date must be at least 24 hours");
    }

    const rental = this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
