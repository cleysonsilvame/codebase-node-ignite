import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "1",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car when license plate already exists", async () => {
    const car = {
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "1",
    };

    await createCarUseCase.execute(car);

    await expect(createCarUseCase.execute(car)).rejects.toEqual(
      new AppError("Car already exists")
    );
  });

  it("should be able to create a car with available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "1",
    });

    expect(car.available).toBeTruthy();
  });
});
