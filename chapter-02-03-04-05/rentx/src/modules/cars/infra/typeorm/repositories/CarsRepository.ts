import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import dataSource from "@shared/infra/typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async create(data: ICreateCarDTO) {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string) {
    const car = await this.repository.findOneBy({ license_plate });

    return car;
  }

  async findAvailable(filter?: {
    brand?: string;
    name?: string;
    category_id?: string;
  }) {
    const carsQUery = this.repository
      .createQueryBuilder()
      .where("available = :available", {
        available: true,
      });

    if (filter) {
      if (filter.category_id)
        carsQUery.andWhere("category_id = :category_id", {
          category_id: filter.category_id,
        });
      if (filter.brand)
        carsQUery.andWhere("brand = :brand", { brand: filter.brand });
      if (filter.name)
        carsQUery.andWhere("name = :name", { name: filter.name });
    }

    const cars = await carsQUery.getMany();

    return cars;
  }

  async findById(id: string) {
    const car = await this.repository.findOneBy({ id });

    return car;
  }

  async updateAvailable(id: string, available: boolean) {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
