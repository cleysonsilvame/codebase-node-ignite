import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO) {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string) {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(filters?: {
    brand?: string;
    name?: string;
    category_id?: string;
  }) {
    return this.cars.filter((car) => {
      if (car.available) {
        if (filters?.category_id)
          return filters.category_id === car.category_id;
        if (filters?.brand) return filters.brand === car.brand;
        if (filters?.name) return filters.name === car.name;

        return true;
      }

      return false;
    });
  }

  async findById(id: string) {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean) {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
