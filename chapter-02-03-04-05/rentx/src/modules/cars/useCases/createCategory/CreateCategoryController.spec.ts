import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

const admin = {
  email: "admin@rentx.com",
  password: "admin",
};

let connection: DataSource;
describe("Create Category Controller", () => {
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

  it("should be able to create a new category ", async () => {
    const responseToken = await request(app).post("/sessions").send(admin);

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with name exists", async () => {
    const responseToken = await request(app).post("/sessions").send(admin);

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
