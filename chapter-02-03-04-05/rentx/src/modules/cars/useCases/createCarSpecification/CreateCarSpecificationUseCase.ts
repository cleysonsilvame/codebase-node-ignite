import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private readonly carsRepository: ICarsRepository,
    @inject("SpecificationRepository")
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute(data: IRequest) {
    const carsExists = await this.carsRepository.findById(data.car_id);

    if (!carsExists) {
      throw new AppError("Car does not exists!");
    }

    const specifications = await this.specificationRepository.findByIds(
      data.specifications_id
    );

    carsExists.specifications = specifications;

    await this.carsRepository.create(carsExists);

    return carsExists;
  }
}

export { CreateCarSpecificationUseCase };
