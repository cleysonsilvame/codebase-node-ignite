import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    const carImages = images_name.map(async (image_name) => {
      await this.carsImagesRepository.create(car_id, image_name);
      await this.storageProvider.save(image_name, "cars");
    });

    await Promise.all(carImages);
  }
}

export { UploadCarImagesUseCase };
