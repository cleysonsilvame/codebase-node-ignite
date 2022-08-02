import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async list() {
    return this.categories;
  }
  async create(data: ICreateCategoryDTO) {
    const category = new Category();
    Object.assign(category, data);
    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
