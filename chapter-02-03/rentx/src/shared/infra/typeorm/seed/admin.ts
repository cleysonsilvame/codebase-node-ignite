import { hash } from "bcrypt";

import { createConnection } from "..";

(async () => {
  const connection = await createConnection("localhost");

  const password = await hash("admin", 8);

  const query = connection.createQueryBuilder().insert().into("users").values({
    name: "admin",
    password,
    email: "admin@rentx.com",
    isAdmin: true,
    driver_license: "123456789",
  });

  await query.execute();

  await connection.destroy();
})().then(() => console.log("Admin created"));
