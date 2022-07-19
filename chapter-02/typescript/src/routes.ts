import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(request: Request, response: Response) {
  CreateCourseService.execute({
    name: "Typescript",
    duration: 60,
    educator: "Diego",
  });

  return response.json({ message: "Criado com sucesso" });
}
