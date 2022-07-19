import { Category } from "../model/Category";
import { ICategoriesRepository } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(
      "🚀 ~ file: PostgresCategoriesRepository.ts ~ line 6 ~ PostgresCategoriesRepository ~ findByName ~ name",
      name
    );

    throw new Error("Method not implemented.");
  }
  list(): Category[] {
    throw new Error("Method not implemented.");
  }
  create({ name, description }): void {
    console.log(
      "🚀 ~ file: PostgresCategoriesRepository.ts ~ line 17 ~ PostgresCategoriesRepository ~ create ~ description",
      description
    );
    console.log(
      "🚀 ~ file: PostgresCategoriesRepository.ts ~ line 17 ~ PostgresCategoriesRepository ~ create ~ name",
      name
    );
    throw new Error("Method not implemented.");
  }
}

export { PostgresCategoriesRepository };
