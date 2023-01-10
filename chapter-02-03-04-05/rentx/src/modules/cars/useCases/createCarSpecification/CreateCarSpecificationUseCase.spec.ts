import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Craeate Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a non-existent car", async () => {
    const car_id = "123";
    const specifications_id = ["123"];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "1",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "test",
      description: "test",
    });

    const specifications_id = [specification.id];

    const updatedCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(updatedCar).toHaveProperty("specifications");
    expect(updatedCar.specifications).toHaveLength(1);
    expect(updatedCar.specifications[0]).toMatchObject(specification);
  });
});
