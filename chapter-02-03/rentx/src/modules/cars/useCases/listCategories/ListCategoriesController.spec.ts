import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

const admin = {
  email: "admin@rentx.com",
  password: "admin",
};

describe("List Categories Controller", () => {
  beforeAll(async () => {
    connection = await createConnection("localhost");
    await connection.runMigrations();

    const id = randomUUID();
    const password = await hash(admin.password, 8);

    await connection
      .createQueryBuilder()
      .insert()
      .into("users")
      .values({
        id,
        name: "admin",
        password,
        email: admin.email,
        isAdmin: true,
        driver_license: "123456789",
      })
      .execute();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });
  it("should be able to list all categories", async () => {
    const {
      body: { refresh_token },
    } = await request(app).post("/sessions").send(admin);

    const category = {
      name: "New Category",
      description: "New Category Description",
    };

    await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${refresh_token}`,
      })
      .send(category);

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining(category)])
    );
  });
});
