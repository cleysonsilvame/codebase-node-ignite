import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1658651590861 } from "./migrations/1658651590861-CreateCategories";
import { CreateSpecifications1658728220585 } from "./migrations/1658728220585-CreateSpecifications";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "postgres",
  database: "rentx",
  entities: [Category, Specification],
  migrations: [
    CreateCategories1658651590861,
    CreateSpecifications1658728220585,
  ],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
