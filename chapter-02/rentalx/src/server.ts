import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
app.use(express.json());

app.use("/categories", categoriesRoutes);

app.listen(3333, () => {
  console.log("🚀 ~ file: server.ts ~ line 6 ~ app.listen ~", 3333);
});
