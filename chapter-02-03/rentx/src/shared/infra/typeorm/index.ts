import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { CreateCategories1658651590861 } from "./migrations/1658651590861-CreateCategories";
import { CreateSpecifications1658728220585 } from "./migrations/1658728220585-CreateSpecifications";
import { CreateUsers1658729807826 } from "./migrations/1658729807826-CreateUsers";
import { AlterUserDeleteUsername1658732116481 } from "./migrations/1658732116481-AlterUserDeleteUsername";
import { AlterUserAddAvatar1658805475673 } from "./migrations/1658805475673-AlterUserAddAvatar";
import { CreateCars1659473403181 } from "./migrations/1659473403181-CreateCars";
import { CreateSpecificationsCars1659527692158 } from "./migrations/1659527692158-CreateSpecificationsCars";
import { CreateCarImages1659540475527 } from "./migrations/1659540475527-CreateCarImages";
import { CreateRentals1659555012224 } from "./migrations/1659555012224-CreateRentals";
import { CreateUsersToken1671488252676 } from "./migrations/1671488252676-CreateUsersToken";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "postgres",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
  entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
  migrations: [
    CreateCategories1658651590861,
    CreateSpecifications1658728220585,
    CreateUsers1658729807826,
    AlterUserDeleteUsername1658732116481,
    AlterUserAddAvatar1658805475673,
    CreateCars1659473403181,
    CreateSpecificationsCars1659527692158,
    CreateCarImages1659540475527,
    CreateRentals1659555012224,
    CreateUsersToken1671488252676,
  ],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
