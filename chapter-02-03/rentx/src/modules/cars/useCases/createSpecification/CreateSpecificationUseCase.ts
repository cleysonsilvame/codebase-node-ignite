import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(data: IRequest) {
    const specification = await this.specificationRepository.findByName(
      data.name
    );

    if (specification) {
      throw new Error("Specification already exists");
    }

    this.specificationRepository.create(data);
  }
}

export { CreateSpecificationUseCase };
