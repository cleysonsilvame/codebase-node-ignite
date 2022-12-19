import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    const dateNow = new Date();

    Object.assign(rental, data, {
      start_date: dateNow,
      updated_at: dateNow,
      created_at: dateNow,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.findOpenRentalBy({ car_id });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.findOpenRentalBy({ user_id });
  }

  private async findOpenRentalBy({
    car_id,
    user_id,
  }: {
    car_id?: string;
    user_id?: string;
  }): Promise<Rental> {
    return this.rentals.find(
      (rental) =>
        (rental.car_id === car_id || rental.user_id === user_id) &&
        !rental.end_date
    );
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }
}

export { RentalsRepositoryInMemory };
