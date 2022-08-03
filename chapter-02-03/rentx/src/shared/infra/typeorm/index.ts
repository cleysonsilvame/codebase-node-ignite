import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { CreateCategories1658651590861 } from "./migrations/1658651590861-CreateCategories";
import { CreateSpecifications1658728220585 } from "./migrations/1658728220585-CreateSpecifications";
import { CreateUsers1658729807826 } from "./migrations/1658729807826-CreateUsers";
import { AlterUserDeleteUsername1658732116481 } from "./migrations/1658732116481-AlterUserDeleteUsername";
import { AlterUserAddAvatar1658805475673 } from "./migrations/1658805475673-AlterUserAddAvatar";
import { CreateCars1659473403181 } from "./migrations/1659473403181-CreateCars";
import { CreateSpecificationsCars1659527692158 } from "./migrations/1659527692158-CreateSpecificationsCars";
import { CreateCarImages1659540475527 } from "./migrations/1659540475527-CreateCarImages";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "postgres",
  database: "rentx",
  entities: [Category, Specification, User, Car, CarImage],
  migrations: [
    CreateCategories1658651590861,
    CreateSpecifications1658728220585,
    CreateUsers1658729807826,
    AlterUserDeleteUsername1658732116481,
    AlterUserAddAvatar1658805475673,
    CreateCars1659473403181,
    CreateSpecificationsCars1659527692158,
    CreateCarImages1659540475527,
  ],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
