import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "days").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const result = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("start_date");
  });

  it("should not be able to create a rental when there is another open to the same user", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "123",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("User already has an open rental"));
  });

  it("should not be able to create a rental when there is another open to the same car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "1234",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is already rented"));
  });

  it("should not be able to create a rental when the return time is invalid", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "123",
        user_id: "1234",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("Expected return date must be at least 24 hours")
    );
  });
});
