import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(24, "hours").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a rental", async () => {
    const result = await createRentalUseCase.execute({
      car_id: "123",
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("start_date");
  });

  it("should not be able to create a rental when there is another open to the same user", async () => {
    await createRentalUseCase.execute({
      car_id: "123",
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "123",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental when there is another open to the same car", async () => {
    await createRentalUseCase.execute({
      car_id: "123",
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    expect(
      createRentalUseCase.execute({
        car_id: "123",
        user_id: "1234",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental when the return time is invalid", async () => {
    expect(
      createRentalUseCase.execute({
        car_id: "123",
        user_id: "1234",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
