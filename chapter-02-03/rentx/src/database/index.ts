import { DataSource } from "typeorm";

import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1658651590861 } from "./migrations/1658651590861-CreateCategories";
import { CreateSpecifications1658728220585 } from "./migrations/1658728220585-CreateSpecifications";
import { CreateUsers1658729807826 } from "./migrations/1658729807826-CreateUsers";
import { AlterUserDeleteUsername1658732116481 } from "./migrations/1658732116481-AlterUserDeleteUsername";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "postgres",
  database: "rentx",
  entities: [Category, Specification, User],
  migrations: [
    CreateCategories1658651590861,
    CreateSpecifications1658728220585,
    CreateUsers1658729807826,
    AlterUserDeleteUsername1658732116481,
  ],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
