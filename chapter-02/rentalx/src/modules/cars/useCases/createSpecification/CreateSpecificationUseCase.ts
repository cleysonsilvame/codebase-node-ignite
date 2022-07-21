import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute(data: IRequest) {
    const specification = this.specificationRepository.findByName(data.name);

    if (specification) {
      throw new Error("Specification already exists");
    }

    this.specificationRepository.create(data);
  }
}

export { CreateSpecificationUseCase };
