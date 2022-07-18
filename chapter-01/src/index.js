const express = require("express");

const app = express();

app.get("/courses", (request, response) => {
  return response.json([
    'curso 01',
    'curso 02',
    'curso 03',
  ]);
});

app.post("/courses", (request, response) => {
  return response.json([
    'curso 01',
    'curso 02',
    'curso 03',
  ]);
});

app.put("/courses/:id", (request, response) => {
  return response.json([
    'curso 01',
    'curso 02',
    'curso 03',
  ]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json([
    'curso 01',
    'curso 02',
    'curso 03',
  ]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json([
    'curso 01',
    'curso 02',
    'curso 03',
  ]);
});

app.listen(3333, () => {
  console.log("🚀 ~ Server started on port 3333");
});
